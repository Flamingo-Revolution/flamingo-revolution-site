// Narta Protest — canvas game engine.
// Kept as plain JS (not React state) because a real-time physics loop needs to
// mutate positions every frame; React re-renders are used only for the UI
// overlay (score, hint, queue, message), driven through the `callbacks` object.

const GRAVITY = 0.45;
const CANVAS_W = 800;
const CANVAS_H = 500;
export { BIRD_TYPES } from './config.js';
import { BIRD_TYPES, LEVELS, POL_LOOKS } from './config.js';
import { drawPolitician } from './politicians.js';
import { drawLevelBackground, drawPyramidDetails } from './levelVisuals.js';
import { buildLevelStructures } from './levelBuilder.js';
import { circleRectOverlap, pushOutCircleFromRect } from './physics.js';
import {
  blockColor as getBlockColor,
  drawParticles as renderParticles,
  spawnBurst as createBurst
} from './effects.js';
import {
  drawBird as renderBird,
  drawSlingBand as renderSlingBand,
  drawTrajectory as renderTrajectory,
  drawWaitingQueue as renderWaitingQueue
} from './birdRenderer.js';

export function createGame(canvas, callbacks) {
  const ctx = canvas.getContext('2d');
  const backgroundCanvas = document.createElement('canvas');
  const backgroundCtx = backgroundCanvas.getContext('2d');

  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;

  const GROUND_Y = () => canvas.height - 90;
  const SLING_X = () => 160;
  const SLING_Y = () => GROUND_Y() - 90;

  let score = 0;
  let levelStartScore = 0;
  let levelIdx = 0;
  let birdsLeft = 0;
  let birdQueue = [];
  let blocks = [];
  let politicians = [];
  let currentBird = null;
  let dragging = false;
  let particles = [];
  let levelComplete = false;
  let gameState = 'aim';
  let trajectoryDots = [];
  let pendingAction = null;
  let rafId = null;
  let lastFrameTime = null;
  let physicsAccumulator = 0;
  const PHYSICS_STEP_MS = 1000 / 60;

  // ---------- UI bridge ----------

  function emitStats() {
    callbacks.onScore(score);
    callbacks.onLevel(levelIdx + 1, LEVELS.length);
    callbacks.onBirds(birdsLeft);
    callbacks.onEnemies(
      politicians.filter(p => p.alive).length
    );
  }

  function emitQueue() {
    callbacks.onQueue([...birdQueue]);
  }

  function emitCurrentBird() {
    callbacks.onCurrentBird(
      currentBird ? currentBird.type : null
    );
  }

  function emitHint() {
    if (!currentBird) return;

    const t = BIRD_TYPES[currentBird.type];

    let extra = '';

    if (t.special === 'boost') {
      extra =
        ' — Trokit gjatë fluturimit për shpejtësi shtesë!';
    } else if (currentBird.type === 'pelican') {
      extra =
        ' — I ngadaltë, por bën dëm të dyfishtë!';
    }

    callbacks.onHint(
      'Tërhiq ' +
        t.name.toLowerCase() +
        'n dhe lësho për ta hedhur' +
        extra
    );
  }

  function emitMessage(visible, text, action) {
    pendingAction = action;

    callbacks.onMessage({
      visible,
      text,
      action
    });
  }

  // ---------- Entities ----------

  function makeBird(x, y, type) {
    type = type || 'flamingo';

    const t = BIRD_TYPES[type];

    return {
      x,
      y,
      vx: 0,
      vy: 0,
      r: t.r,
      alive: true,
      launched: false,
      trail: [],
      type,
      boosted: false
    };
  }

  function makePolitician(x, y, w, h, look) {
    const lookIndex =
      (look || 0) % POL_LOOKS.length;

    return {
      x,
      y,
      w,
      h,
      vx: 0,
      vy: 0,
      alive: true,
      look: lookIndex,
      name: POL_LOOKS[lookIndex].name,
      hp: 1,
      falling: false,
      hitCooldown: 0,
      resting: false,
      rotation: 0,
      angularVelocity: 0,
      supportBlock: null,
      fallStartY: null
    };
  }

  function makeBlock(x, y, w, h, style) {
    style = style || 'wood';

    const HP = {
      ice: 1,
      iceroof: 1,
      wood: 1,
      roof: 1,
      stone: 2,
      tnt: 1,
      apple: 1,
      balloon: 1
    };

    const hp =
      HP[style] != null
        ? HP[style]
        : 2;

    return {
      x,
      y,
      w,
      h,
      static: true,
      style,
      hp,
      maxHp: hp,
      vx: 0,
      vy: 0,
      rotation: 0,
      angularVelocity: 0,
      broken: false,
      anchored: false
    };
  }

  function isStableSupport(block) {
    return !block.broken && Math.abs(block.rotation || 0) < 0.08;
  }

  function buildLevel(idx, isRestart = false) {
    if (!isRestart) levelStartScore = score;

    levelIdx = idx;

    const L = LEVELS[idx];

    ({ blocks, politicians } = buildLevelStructures(
      L,
      canvas.width,
      GROUND_Y(),
      makeBlock,
      makePolitician
    ));

    politicians.forEach(p => {
      const footY = p.y + p.h;
      p.supportBlock = blocks.find(b =>
        isStableSupport(b) &&
        Math.min(b.x + b.w, p.x + p.w) - Math.max(b.x, p.x) >= p.w / 2 &&
        Math.abs(b.y - footY) <= 1
      ) || null;
    });

    birdQueue = [...L.sequence];

    const firstType =
      birdQueue.shift();

    birdsLeft =
      birdQueue.length + 1;

    currentBird =
      makeBird(
        SLING_X(),
        SLING_Y(),
        firstType
      );

    gameState = 'aim';
    levelComplete = false;

    backgroundCanvas.width = canvas.width;
    backgroundCanvas.height = canvas.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLevelBackground(ctx, levelIdx, canvas.width, canvas.height, GROUND_Y(), {
      drawCloud,
      drawRock,
      drawFlowers,
      drawSlingshot
    });
    backgroundCtx.drawImage(canvas, 0, 0);

    emitStats();
    emitQueue();
    emitCurrentBird();
    emitHint();
    emitMessage(false, '', null);
  }

  // Build a framed tower (two pillars + top beam + roof) with a pig inside,
  // matching the Angry-Birds style structures in the reference art.

  function restart() {
    score = levelStartScore;
    buildLevel(levelIdx, true);
  }

  function confirmMessage(action) {
    emitMessage(false, '', null);

    if (action === 'next') {
      buildLevel(levelIdx + 1);

    } else if (action === 'retry') {
      score = levelStartScore;
      buildLevel(levelIdx, true);

    } else if (action === 'finish') {
      score = 0;
      buildLevel(0);
    }
  }

  function skipToFinish() {
    levelComplete = true;
    emitMessage(
      true,
      `URRA! I mposhte të gjithë!\nRevolucioni i Flamingove fitoi! Pikët finale: ${score}`,
      'finish'
    );
  }

  // ---------- Drawing helpers ----------

  function roundRect(x, y, w, h, r) {
    r = Math.min(
      r,
      w / 2,
      h / 2
    );

    ctx.beginPath();

    ctx.moveTo(
      x + r,
      y
    );

    ctx.arcTo(
      x + w,
      y,
      x + w,
      y + h,
      r
    );

    ctx.arcTo(
      x + w,
      y + h,
      x,
      y + h,
      r
    );

    ctx.arcTo(
      x,
      y + h,
      x,
      y,
      r
    );

    ctx.arcTo(
      x,
      y,
      x + w,
      y,
      r
    );

    ctx.closePath();
  }

  function drawCloud(x, y, s) {
    ctx.fillStyle = '#ffffff';

    ctx.beginPath();

    ctx.arc(
      x,
      y,
      26 * s,
      0,
      Math.PI * 2
    );

    ctx.arc(
      x + 30 * s,
      y + 6 * s,
      22 * s,
      0,
      Math.PI * 2
    );

    ctx.arc(
      x - 28 * s,
      y + 8 * s,
      20 * s,
      0,
      Math.PI * 2
    );

    ctx.arc(
      x + 4 * s,
      y + 16 * s,
      24 * s,
      0,
      Math.PI * 2
    );

    ctx.fill();
  }

  function drawRock(x, topY, w, h) {
    ctx.fillStyle = '#9aa6ad';

    ctx.beginPath();

    ctx.moveTo(
      x - w / 2,
      topY + h
    );

    ctx.quadraticCurveTo(
      x - w / 2,
      topY + 8,
      x - w * 0.2,
      topY + 4
    );

    ctx.quadraticCurveTo(
      x,
      topY - 6,
      x + w * 0.22,
      topY + 6
    );

    ctx.quadraticCurveTo(
      x + w / 2,
      topY + 12,
      x + w / 2,
      topY + h
    );

    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#7cc63f';

    ctx.beginPath();

    ctx.ellipse(
      x,
      topY + 6,
      w * 0.32,
      11,
      0,
      Math.PI,
      0
    );

    ctx.fill();
  }

  function drawFlowers(gy) {
    const spots = [
      [60, 32],
      [150, 58],
      [300, 42],
      [380, 62],
      [520, 36],
      [600, 60],
      [700, 44],
      [760, 62],
      [250, 66],
      [470, 66]
    ];

    spots.forEach(([fx, dy]) => {
      const y = gy + dy;

      ctx.fillStyle =
        fx % 3 === 0
          ? '#ffd6e7'
          : '#ffffff';

      for (let k = 0; k < 5; k++) {
        const a =
          (k / 5) *
          Math.PI *
          2;

        ctx.beginPath();

        ctx.arc(
          fx + Math.cos(a) * 4,
          y + Math.sin(a) * 4,
          2.4,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }

      ctx.fillStyle = '#ffd23f';

      ctx.beginPath();

      ctx.arc(
        fx,
        y,
        2.1,
        0,
        Math.PI * 2
      );

      ctx.fill();
    });
  }

  function drawSlingshot(gy) {
    const sx = SLING_X();

    ctx.fillStyle = '#b0326b';

    ctx.beginPath();

    ctx.moveTo(
      -4,
      gy + 4
    );

    ctx.lineTo(
      -4,
      gy + 46
    );

    ctx.lineTo(
      sx + 122,
      gy + 46
    );

    ctx.lineTo(
      sx + 122,
      gy + 4
    );

    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#6bbe3f';

    ctx.beginPath();

    ctx.moveTo(
      -4,
      gy + 8
    );

    ctx.lineTo(
      -4,
      gy - 26
    );

    ctx.quadraticCurveTo(
      sx - 40,
      gy - 46,
      sx + 30,
      gy - 30
    );

    ctx.quadraticCurveTo(
      sx + 110,
      gy - 16,
      sx + 122,
      gy + 8
    );

    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#5aa833';

    ctx.fillRect(
      -4,
      gy + 2,
      sx + 126,
      6
    );

    const cartY = gy - 2;

    [
      sx - 26,
      sx + 26
    ].forEach(wx => {
      ctx.fillStyle = '#7a4a16';

      ctx.beginPath();

      ctx.arc(
        wx,
        cartY + 6,
        12,
        0,
        Math.PI * 2
      );

      ctx.fill();

      ctx.fillStyle = '#c8842a';

      ctx.beginPath();

      ctx.arc(
        wx,
        cartY + 6,
        5,
        0,
        Math.PI * 2
      );

      ctx.fill();
    });

    ctx.fillStyle = '#c8842a';

    roundRect(
      sx - 44,
      cartY - 14,
      88,
      16,
      4
    );

    ctx.fill();

    ctx.fillStyle = '#a9691f';

    ctx.fillRect(
      sx - 44,
      cartY - 14,
      88,
      4
    );

    ctx.strokeStyle = '#c08535';
    ctx.lineWidth = 13;
    ctx.lineCap = 'round';

    ctx.beginPath();

    ctx.moveTo(
      sx,
      cartY - 12
    );

    ctx.lineTo(
      sx,
      SLING_Y() + 8
    );

    ctx.moveTo(
      sx,
      SLING_Y() + 8
    );

    ctx.lineTo(
      sx - 24,
      SLING_Y() - 14
    );

    ctx.moveTo(
      sx,
      SLING_Y() + 8
    );

    ctx.lineTo(
      sx + 24,
      SLING_Y() - 14
    );

    ctx.stroke();

    ctx.strokeStyle = '#9a6528';
    ctx.lineWidth = 4;

    ctx.beginPath();

    ctx.moveTo(
      sx,
      cartY - 12
    );

    ctx.lineTo(
      sx,
      SLING_Y() + 8
    );

    ctx.stroke();
  }

  function drawBlock(b) {
    ctx.save();
    const { x, y, w, h } = b;

    ctx.translate(x + w / 2, y + h / 2);
    ctx.rotate(b.rotation || 0);
    ctx.translate(-x - w / 2, -y - h / 2);

    if (b.style === 'apple') {
      ctx.fillStyle = '#d9302d';
      ctx.beginPath();
      ctx.arc(x + w * 0.34, y + h * 0.56, w * 0.32, 0, Math.PI * 2);
      ctx.arc(x + w * 0.66, y + h * 0.56, w * 0.32, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ff8875';
      ctx.beginPath();
      ctx.ellipse(x + w * 0.32, y + h * 0.38, w * 0.1, h * 0.18, -0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#593623';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + w * 0.5, y + h * 0.22);
      ctx.lineTo(x + w * 0.6, y - 4);
      ctx.stroke();
      ctx.fillStyle = '#47a540';
      ctx.beginPath();
      ctx.ellipse(x + w * 0.74, y + 2, w * 0.24, h * 0.1, -0.55, 0, Math.PI * 2);
      ctx.fill();

    } else if (b.style === 'balloon') {
      const balloon = ctx.createLinearGradient(x, y, x + w, y + h);
      balloon.addColorStop(0, '#ffe76a');
      balloon.addColorStop(1, '#f2b72d');
      ctx.fillStyle = balloon;
      ctx.beginPath();
      ctx.ellipse(x + w / 2, y + h * 0.45, w / 2, h * 0.45, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#b87b1d';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + w / 2, y + h * 0.9);
      ctx.lineTo(x + w / 2, y + h);
      ctx.stroke();

    } else if (b.style === 'ice') {
      const g = ctx.createLinearGradient(x, y, x, y + h);
      g.addColorStop(0, '#dff6fd');
      g.addColorStop(0.5, '#a6ddf2');
      g.addColorStop(1, '#78c6e6');
      ctx.fillStyle = g;
      roundRect(x, y, w, h, 6);
      ctx.fill();

      ctx.strokeStyle = '#5aa9cf';
      ctx.lineWidth = 3;
      roundRect(x, y, w, h, 6);
      ctx.stroke();

      ctx.fillStyle = '#ffffff88';
      ctx.fillRect(
        x + 5,
        y + 5,
        Math.max(4, w * 0.16),
        h - 12
      );

    } else if (b.style === 'stone') {
      const g = ctx.createLinearGradient(x, y, x, y + h);
      g.addColorStop(0, '#d9dde0');
      g.addColorStop(1, '#a7afb5');
      ctx.fillStyle = g;

      roundRect(x, y, w, h, 5);
      ctx.fill();

      ctx.strokeStyle = '#7d868c';
      ctx.lineWidth = 3;

      roundRect(x, y, w, h, 5);
      ctx.stroke();

      ctx.fillStyle = '#8b949a';

      [
        [0.3, 0.32],
        [0.7, 0.68]
      ].forEach(([fx, fy]) => {
        ctx.beginPath();
        ctx.arc(
          x + w * fx,
          y + h * fy,
          2,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

    } else if (b.style === 'tnt') {
      const g = ctx.createLinearGradient(x, y, x, y + h);

      g.addColorStop(0, '#e2493a');
      g.addColorStop(1, '#c22f22');

      ctx.fillStyle = g;

      roundRect(x, y, w, h, 5);
      ctx.fill();

      ctx.strokeStyle = '#8f1c12';
      ctx.lineWidth = 3;

      roundRect(x, y, w, h, 5);
      ctx.stroke();

      ctx.save();

      ctx.translate(
        x + w / 2,
        y + h / 2
      );

      ctx.rotate(-0.15);

      ctx.fillStyle = '#fff';

      ctx.fillRect(
        -w * 0.42,
        -6,
        w * 0.84,
        12
      );

      ctx.fillStyle = '#c22f22';

      ctx.font =
        `bold ${Math.round(h * 0.42)}px Arial`;

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.fillText(
        'TNT',
        0,
        1
      );

      ctx.restore();

    } else if (
      b.style === 'roof' ||
      b.style === 'iceroof'
    ) {
      const ice =
        b.style === 'iceroof';

      const n = 3;
      const tw = w / n;

      ctx.fillStyle =
        ice
          ? '#a6ddf2'
          : '#c8842a';

      ctx.strokeStyle =
        ice
          ? '#5aa9cf'
          : '#8a5316';

      ctx.lineWidth = 2;

      for (let k = 0; k < n; k++) {
        ctx.beginPath();

        ctx.moveTo(
          x + k * tw,
          y + h
        );

        ctx.lineTo(
          x + k * tw + tw / 2,
          y
        );

        ctx.lineTo(
          x + (k + 1) * tw,
          y + h
        );

        ctx.closePath();

        ctx.fill();
        ctx.stroke();
      }

    } else {
      const g = ctx.createLinearGradient(
        x,
        y,
        x,
        y + h
      );

      g.addColorStop(0, '#e0a24e');
      g.addColorStop(1, '#c07d2a');

      ctx.fillStyle = g;

      roundRect(x, y, w, h, 5);
      ctx.fill();

      ctx.strokeStyle = '#8a5316';
      ctx.lineWidth = 3;

      roundRect(x, y, w, h, 5);
      ctx.stroke();

      if (w > 16 && h > 16) {
        ctx.fillStyle = '#8a5316';

        [
          [6, 6],
          [w - 6, 6],
          [6, h - 6],
          [w - 6, h - 6]
        ].forEach(([bx, by]) => {
          ctx.beginPath();

          ctx.arc(
            x + bx,
            y + by,
            2.4,
            0,
            Math.PI * 2
          );

          ctx.fill();
        });
      }
    }

    if (
      b.hp < b.maxHp &&
      b.style !== 'roof' &&
      b.style !== 'iceroof'
    ) {
      ctx.strokeStyle = '#00000055';
      ctx.lineWidth = 1.5;

      ctx.beginPath();

      ctx.moveTo(
        x + w * 0.5,
        y
      );

      ctx.lineTo(
        x + w * 0.4,
        y + h * 0.5
      );

      ctx.lineTo(
        x + w * 0.58,
        y + h
      );

      ctx.stroke();
    }

    ctx.restore();
  }

  function damageBlock(
    b,
    dmg,
    hx,
    hy
  ) {
    if (b.broken) return;

    if (b.style === 'tnt') {
      explodeTnt(b);
      return;
    }

    b.hp -= dmg;

    createBurst(particles, 
      hx == null
        ? b.x + b.w / 2
        : hx,

      hy == null
        ? b.y + b.h / 2
        : hy,

      getBlockColor(b.style)
    );

    if (b.hp <= 0) {
      breakBlock(b);
    }
  }

  function breakBlock(b) {
    if (b.broken) return;

    b.broken = true;

    score += 100;

    createBurst(particles, 
      b.x + b.w / 2,
      b.y + b.h / 2,
      getBlockColor(b.style)
    );

    emitStats();
  }

  function eliminateFallenPolitician(p) {
    p.alive = false;
    score += 500;

    createBurst(
      particles,
      p.x + p.w / 2,
      p.y + p.h / 2,
      '#c0392b'
    );

    emitStats();
    checkLevelWin();
  }

  // TNT detonates on impact, damaging nearby blocks
  // and politicians.
  function explodeTnt(b) {
    if (b.broken) return;

    b.broken = true;

    score += 200;

    const cx =
      b.x + b.w / 2;

    const cy =
      b.y + b.h / 2;

    createBurst(particles, 
      cx,
      cy,
      '#ff8c1a'
    );

    createBurst(particles, 
      cx,
      cy,
      '#ffd23f'
    );

    const R = 92;

    blocks.forEach(o => {
      if (
        o.broken ||
        o === b
      ) {
        return;
      }

      const d =
        Math.hypot(
          o.x + o.w / 2 - cx,
          o.y + o.h / 2 - cy
        );

      if (d < R) {
        if (o.style === 'tnt') {
          explodeTnt(o);
        } else {
          damageBlock(
            o,
            3,
            o.x + o.w / 2,
            o.y + o.h / 2
          );
        }
      }
    });

    politicians.forEach(p => {
      if (!p.alive) return;

      const px =
        p.x + p.w / 2;

      const py =
        p.y + p.h / 2;

      if (
        Math.hypot(
          px - cx,
          py - cy
        ) < R
      ) {
        p.hp -= 3;

        p.falling = true;
        p.vy = -6;

        p.vx +=
          px < cx
            ? -3
            : 3;

        p.hitCooldown = 14;

        if (p.hp <= 0) {
          p.alive = false;

          score += 500;

          createBurst(particles, 
            px,
            py,
            '#7cc63f'
          );

          checkLevelWin();
        }
      }
    });

    emitStats();
  }

  // ---------- Physics ----------

  function updatePhysics() {
    if (
      currentBird &&
      currentBird.launched &&
      currentBird.alive
    ) {
      currentBird.vy += GRAVITY;

      currentBird.x +=
        currentBird.vx;

      currentBird.y +=
        currentBird.vy;

      currentBird.trail.push({
        x: currentBird.x,
        y: currentBird.y
      });

      if (
        currentBird.trail.length >
        15
      ) {
        currentBird.trail.shift();
      }

      if (
        currentBird.y +
        currentBird.r >
        GROUND_Y()
      ) {
        currentBird.y =
          GROUND_Y() -
          currentBird.r;

        currentBird.vy *= -0.35;
        currentBird.vx *= 0.7;

        if (
          Math.abs(
            currentBird.vy
          ) < 2 &&
          Math.abs(
            currentBird.vx
          ) < 1
        ) {
          endBirdTurn();
        }
      }

      if (
        currentBird.x >
          canvas.width + 50 ||
        currentBird.x <
          -50
      ) {
        endBirdTurn();
      }

      politicians.forEach(p => {
        if (
          !p.alive ||
          p.hitCooldown > 0
        ) {
          return;
        }

        if (
          circleRectOverlap(
            currentBird.x,
            currentBird.y,
            currentBird.r,
            p
          )
        ) {
          const bt =
            BIRD_TYPES[
              currentBird.type
            ];

          p.hp -= bt.damage;

          p.vx +=
            currentBird.vx * 0.3;

          p.vy = -6;
          p.falling = true;
          p.hitCooldown = 14;

          currentBird.vx *=
            bt.bounce;

          currentBird.vy *=
            bt.bounce;

          pushOutCircleFromRect(
            currentBird,
            p
          );

          createBurst(particles, 
            currentBird.x,
            currentBird.y,
            '#f1c40f'
          );

          if (p.hp <= 0) {
            p.alive = false;

            score += 500;

            createBurst(particles, 
              p.x + p.w / 2,
              p.y + p.h / 2,
              '#c0392b'
            );

            checkLevelWin();
          }

          emitStats();
        }
      });

      blocks.forEach(b => {
        if (b.broken) return;

        if (
          circleRectOverlap(
            currentBird.x,
            currentBird.y,
            currentBird.r,
            b
          )
        ) {
          const speed =
            Math.hypot(
              currentBird.vx,
              currentBird.vy
            );

          const bt =
            BIRD_TYPES[
              currentBird.type
            ];

          const dmg =
            bt.damage +
            (
              speed > 11
                ? 1
                : 0
            );

          const wasBroken =
            b.broken;

          damageBlock(
            b,
            dmg,
            currentBird.x,
            currentBird.y
          );

          if (
            b.broken &&
            !wasBroken
          ) {
            currentBird.vx *= 0.62;
            currentBird.vy *= 0.62;
          } else {
            currentBird.vx *= -0.35;
            currentBird.vy *= -0.35;

            pushOutCircleFromRect(
              currentBird,
              b
            );
          }
        }
      });
    }

    politicians.forEach(p => {
      if (p.hitCooldown > 0) {
        p.hitCooldown -= 1;
      }

      if (!p.alive) return;

      const footY = p.y + p.h;
      const supportChanged =
        p.supportBlock &&
        (
          p.supportBlock.broken ||
          !isStableSupport(p.supportBlock) ||
          Math.abs(p.supportBlock.y - footY) > 1
        );

      if (supportChanged) {
        p.falling = true;
        p.resting = false;
        if (p.fallStartY == null) p.fallStartY = p.y;
        if (!p.angularVelocity) p.angularVelocity = p.look % 2 ? 0.04 : -0.04;
      }

      if (!p.falling || p.resting) return;

      p.vy += GRAVITY;
      p.x += p.vx;
      p.y += p.vy;

      p.vx *= 0.92;
      p.rotation = Math.max(-0.65, Math.min(0.65, p.rotation + p.angularVelocity));
      p.angularVelocity *= 0.98;

      const bottom =
        p.y + p.h;

      const landingBlock = blocks
        .filter(b =>
          isStableSupport(b) &&
          Math.min(b.x + b.w, p.x + p.w) - Math.max(b.x, p.x) >= p.w / 2 &&
          b.y >= footY - 3 &&
          b.y <= bottom
        )
        .sort((first, second) => first.y - second.y)[0];

      if (landingBlock) {
        if (landingBlock.style === 'tnt') {
          explodeTnt(landingBlock);
          return;
        }

        const landingY = landingBlock.y - p.h;

        if (p.fallStartY != null && landingY - p.fallStartY >= 72) {
          p.y = landingY;
          eliminateFallenPolitician(p);
          return;
        }

        p.y = landingY;
        p.vy = 0;
        p.vx = 0;
        p.angularVelocity = 0;
        p.resting = true;
        p.supportBlock = landingBlock;
        p.fallStartY = null;

      } else if (bottom > GROUND_Y()) {
        const landingY = GROUND_Y() - p.h;

        if (p.fallStartY != null && landingY - p.fallStartY >= 72) {
          p.y = landingY;
          eliminateFallenPolitician(p);
          return;
        }

        p.y = landingY;

        p.vy *= -0.25;
        p.vx *= 0.8;

        if (
          Math.abs(p.vy) < 1.2 &&
          Math.abs(p.vx) < 0.5
        ) {
          p.vy = 0;
          p.vx = 0;
          p.angularVelocity = 0;
          p.resting = true;
          p.supportBlock = null;
          p.fallStartY = null;
        }
      }
    });

    // Blocks settle/collapse.
    blocks.forEach(b => {
      if (b.broken) return;
      if (b.anchored) return;

      const footY =
        b.y + b.h;

      if (
        footY >=
        GROUND_Y() - 0.5
      ) {
        b.y =
          GROUND_Y() -
          b.h;

        b.vy = 0;

        return;
      }

      const supported =
        blocks.some(o =>
          o !== b &&
          isStableSupport(o) &&
          o.y >= footY - 2 &&
          o.y <= footY + 3 &&
          o.x <
            b.x + b.w - 2 &&
          o.x + o.w >
            b.x + 2
        );

      if (supported) {
        b.vy = 0;
        return;
      }

      b.vy =
        (b.vy || 0) +
        GRAVITY;
      if (!b.vx) b.vx = b.x + b.w / 2 < canvas.width / 2 ? -0.35 : 0.35;
      if (!b.angularVelocity) b.angularVelocity = b.vx * 0.012;

      b.x += b.vx;
      b.vx *= 0.985;
      b.rotation = Math.max(-0.5, Math.min(0.5, b.rotation + b.angularVelocity));
      b.angularVelocity *= 0.99;

      const nFoot =
        b.y +
        b.h +
        b.vy;

      let landY = null;

      blocks.forEach(o => {
        if (
          o === b ||
          !isStableSupport(o)
        ) {
          return;
        }

        if (
          o.x <
            b.x + b.w - 2 &&
          o.x + o.w >
            b.x + 2 &&
          o.y >= footY - 2 &&
          o.y <= nFoot
        ) {
          landY =
            landY == null
              ? o.y
              : Math.min(
                  landY,
                  o.y
                );
        }
      });

      if (
        nFoot >=
        GROUND_Y()
      ) {
        b.y =
          GROUND_Y() -
          b.h;

        b.vy = 0;
        b.vx = 0;
        b.angularVelocity = 0;

      } else if (
        landY != null
      ) {
        b.y =
          landY -
          b.h;

        b.vy = 0;
        b.vx = 0;
        b.angularVelocity = 0;

      } else {
        b.y += b.vy;
      }
    });

    blocks =
      blocks.filter(
        b => !b.broken
      );

    particles.forEach(p => {
      p.vy += 0.3;
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 1;
    });

    particles =
      particles.filter(
        p => p.life > 0
      );
  }

  function endBirdTurn() {
    if (
      gameState !== 'flying'
    ) {
      return;
    }

    gameState = 'aim';

    birdsLeft -= 1;

    emitStats();

    if (levelComplete) {
      return;
    }

    if (
      birdsLeft <= 0 &&
      politicians.some(
        p => p.alive
      )
    ) {
      setTimeout(() => {
        if (!levelComplete) {
          emitMessage(
            true,
            'Të mbaruan zogjtë! Provo përsëri.',
            'retry'
          );
        }
      }, 400);

      return;
    }

    const nextType =
      birdQueue.shift();

    if (nextType) {
      currentBird =
        makeBird(
          SLING_X(),
          SLING_Y(),
          nextType
        );

      emitQueue();
      emitCurrentBird();
      emitHint();
    }
  }

  function checkLevelWin() {
    if (
      politicians.every(
        p => !p.alive
      ) &&
      !levelComplete
    ) {
      levelComplete = true;

      score +=
        birdsLeft * 100;

      setTimeout(() => {
        if (
          levelIdx <
          LEVELS.length - 1
        ) {
          emitMessage(
            true,
            `Bravo! Niveli ${levelIdx + 1} u përfundua!\nPikët: ${score}`,
            'next'
          );
        } else {
          emitMessage(
            true,
            `URRA! I mposhte të gjithë!\nRevolucioni i Flamingove fitoi! Pikët finale: ${score}`,
            'finish'
          );
        }
      }, 500);
    }
  }

  // ---------- Input ----------

  function getPos(e) {
    const rect =
      canvas.getBoundingClientRect();

    const t =
      e.touches
        ? e.touches[0]
        : e;

    const scaleX =
      canvas.width /
      rect.width;

    const scaleY =
      canvas.height /
      rect.height;

    return {
      x:
        (t.clientX - rect.left) *
        scaleX,

      y:
        (t.clientY - rect.top) *
        scaleY
    };
  }

  function startDrag(e) {
    if (
      gameState === 'flying' &&
      currentBird &&
      currentBird.type === 'heron' &&
      !currentBird.boosted
    ) {
      currentBird.vx *= 1.45;
      currentBird.vy *= 0.75;
      currentBird.boosted = true;

      createBurst(particles, 
        currentBird.x -
          currentBird.r,
        currentBird.y,
        '#ffffff'
      );

      return;
    }

    if (
      gameState !== 'aim' ||
      !currentBird
    ) {
      return;
    }

    const pos =
      getPos(e);

    const d =
      Math.hypot(
        pos.x -
          currentBird.x,
        pos.y -
          currentBird.y
      );

    if (d < 60) {
      dragging = true;
      trajectoryDots = [];
    }
  }

  function moveDrag(e) {
    if (!dragging) return;

    const pos =
      getPos(e);

    let dx =
      pos.x - SLING_X();

    let dy =
      pos.y - SLING_Y();

    const maxDist = 90;

    const dist =
      Math.hypot(
        dx,
        dy
      );

    if (
      dist >
      maxDist
    ) {
      dx =
        dx /
        dist *
        maxDist;

      dy =
        dy /
        dist *
        maxDist;
    }

    currentBird.x =
      SLING_X() + dx;

    currentBird.y =
      SLING_Y() + dy;

    trajectoryDots = [];

    const power =
      BIRD_TYPES[
        currentBird.type
      ].power;

    let px =
      currentBird.x;

    let py =
      currentBird.y;

    let pvx =
      -dx * power;

    let pvy =
      -dy * power;

    for (
      let step = 0;
      step < 9;
      step++
    ) {
      for (
        let sub = 0;
        sub < 4;
        sub++
      ) {
        pvy += GRAVITY;

        px += pvx;
        py += pvy;

        if (
          py >
          GROUND_Y()
        ) {
          break;
        }
      }

      if (
        py >
        GROUND_Y()
      ) {
        break;
      }

      trajectoryDots.push({
        x: px,
        y: py
      });
    }
  }

  function endDrag() {
    if (!dragging) return;

    dragging = false;
    trajectoryDots = [];

    const dx =
      SLING_X() -
      currentBird.x;

    const dy =
      SLING_Y() -
      currentBird.y;

    const power =
      BIRD_TYPES[
        currentBird.type
      ].power;

    if (
      Math.hypot(
        dx,
        dy
      ) < 10
    ) {
      return;
    }

    currentBird.vx =
      dx * power;

    currentBird.vy =
      dy * power;

    currentBird.launched = true;

    gameState = 'flying';
  }

  canvas.addEventListener(
    'mousedown',
    startDrag
  );

  canvas.addEventListener(
    'touchstart',
    startDrag,
    { passive: true }
  );

  canvas.addEventListener(
    'mousemove',
    moveDrag
  );

  canvas.addEventListener(
    'touchmove',
    moveDrag,
    { passive: true }
  );

  canvas.addEventListener(
    'mouseup',
    endDrag
  );

  canvas.addEventListener(
    'touchend',
    endDrag
  );

  // ---------- Main loop ----------

  function loop(frameTime) {
    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    ctx.drawImage(backgroundCanvas, 0, 0);

    if (
      currentBird &&
      currentBird.launched
    ) {
      const trailColor =
        BIRD_TYPES[
          currentBird.type
        ].body;

      currentBird.trail.forEach(
        (t, i) => {
          ctx.globalAlpha =
            (
              i /
              currentBird.trail.length
            ) *
            0.4;

          ctx.fillStyle =
            trailColor;

          ctx.beginPath();

          ctx.arc(
            t.x,
            t.y,
            6,
            0,
            Math.PI * 2
          );

          ctx.fill();
        }
      );

      ctx.globalAlpha = 1;
    }

    blocks.forEach(
      drawBlock
    );

    drawPyramidDetails(ctx, levelIdx, GROUND_Y, roundRect);

    politicians.forEach(p => drawPolitician(ctx, p));

    renderWaitingQueue(ctx, birdQueue, SLING_X(), GROUND_Y());

    renderTrajectory(ctx, dragging, trajectoryDots);

    renderSlingBand(ctx, currentBird, SLING_X(), SLING_Y());

    if (currentBird) {
      renderBird(ctx, currentBird);
    }

    renderParticles(ctx, particles);

    const elapsed = lastFrameTime == null
      ? PHYSICS_STEP_MS
      : Math.min(frameTime - lastFrameTime, PHYSICS_STEP_MS * 4);

    lastFrameTime = frameTime;
    physicsAccumulator += elapsed;

    while (physicsAccumulator >= PHYSICS_STEP_MS) {
      updatePhysics();
      physicsAccumulator -= PHYSICS_STEP_MS;
    }

    rafId =
      requestAnimationFrame(
        loop
      );
  }

  buildLevel(0);

  loop(performance.now());

  function destroy() {
    cancelAnimationFrame(
      rafId
    );

    canvas.removeEventListener(
      'mousedown',
      startDrag
    );

    canvas.removeEventListener(
      'touchstart',
      startDrag
    );

    canvas.removeEventListener(
      'mousemove',
      moveDrag
    );

    canvas.removeEventListener(
      'touchmove',
      moveDrag
    );

    canvas.removeEventListener(
      'mouseup',
      endDrag
    );

    canvas.removeEventListener(
      'touchend',
      endDrag
    );
  }

  return {
    destroy,
    restart,
    confirmMessage,
    skipToFinish
  };
}