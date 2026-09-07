import { BIRD_TYPES } from './config.js';

export function drawBird(ctx, bird) {
  if (!bird.alive) return;
  const type = BIRD_TYPES[bird.type];
  const radius = bird.r;
  ctx.save();
  ctx.translate(bird.x, bird.y);

  ctx.fillStyle = type.wing;
  ctx.beginPath();
  ctx.moveTo(-radius * 0.6, -radius * 0.15);
  ctx.lineTo(-radius * 1.5, -radius * 0.5);
  ctx.lineTo(-radius * 1.15, 0);
  ctx.lineTo(-radius * 1.5, radius * 0.5);
  ctx.lineTo(-radius * 0.6, radius * 0.15);
  ctx.closePath();
  ctx.fill();

  for (let index = -1; index <= 1; index++) {
    ctx.beginPath();
    ctx.moveTo(index * radius * 0.24 - radius * 0.06, -radius * 0.82);
    ctx.lineTo(index * radius * 0.24 + radius * 0.10, -radius * 1.32);
    ctx.lineTo(index * radius * 0.24 + radius * 0.20, -radius * 0.78);
    ctx.closePath();
    ctx.fill();
  }

  ctx.fillStyle = type.body;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = type.belly;
  ctx.beginPath();
  ctx.ellipse(radius * 0.3, radius * 0.36, radius * 0.55, radius * 0.5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.ellipse(radius * 0.16, -radius * 0.24, radius * 0.34, radius * 0.44, 0, 0, Math.PI * 2);
  ctx.ellipse(radius * 0.56, -radius * 0.24, radius * 0.28, radius * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#111';
  ctx.beginPath();
  ctx.arc(radius * 0.3, -radius * 0.2, radius * 0.12, 0, Math.PI * 2);
  ctx.arc(radius * 0.56, -radius * 0.2, radius * 0.12, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(radius * 0.34, -radius * 0.24, radius * 0.04, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = type.brow;
  ctx.lineWidth = Math.max(2, radius * 0.18);
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-radius * 0.08, -radius * 0.72);
  ctx.lineTo(radius * 0.4, -radius * 0.46);
  ctx.moveTo(radius * 0.78, -radius * 0.56);
  ctx.lineTo(radius * 0.44, -radius * 0.46);
  ctx.stroke();

  ctx.fillStyle = type.beak;
  ctx.beginPath();
  ctx.moveTo(radius * 0.78, -radius * 0.06);
  ctx.lineTo(radius * 1.5, radius * 0.08);
  ctx.lineTo(radius * 0.78, radius * 0.22);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = type.beakLo || '#cf7a12';
  ctx.beginPath();
  ctx.moveTo(radius * 0.78, radius * 0.16);
  ctx.lineTo(radius * 1.28, radius * 0.26);
  ctx.lineTo(radius * 0.78, radius * 0.4);
  ctx.closePath();
  ctx.fill();

  if (bird.boosted) {
    ctx.fillStyle = '#ffffffcc';
    ctx.beginPath();
    ctx.moveTo(-radius * 1.4, -4);
    ctx.lineTo(-radius * 0.9, 0);
    ctx.lineTo(-radius * 1.4, 4);
    ctx.fill();
  }
  ctx.restore();
}

export function drawSlingBand(ctx, currentBird, slingX, slingY) {
  if (!currentBird || currentBird.launched) return;
  ctx.strokeStyle = '#4a2c14';
  ctx.lineWidth = 7;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(slingX + 24, slingY - 14);
  ctx.lineTo(currentBird.x, currentBird.y);
  ctx.lineTo(slingX - 24, slingY - 14);
  ctx.stroke();
}

export function drawWaitingQueue(ctx, birdQueue, slingX, groundY) {
  birdQueue.forEach((typeName, index) => {
    const type = BIRD_TYPES[typeName];
    const scale = 0.6 - index * 0.09;
    const x = slingX - 55 - index * 30;
    if (scale <= 0.15 || x < 8) return;
    ctx.globalAlpha = 0.9;
    drawBird(ctx, { x, y: groundY - type.r * scale, r: type.r * scale, type: typeName, alive: true, boosted: false });
    ctx.globalAlpha = 1;
  });
}

export function drawTrajectory(ctx, dragging, trajectoryDots) {
  if (!dragging || trajectoryDots.length === 0) return;
  trajectoryDots.forEach((dot, index) => {
    ctx.globalAlpha = 0.9 - index * 0.07;
    ctx.fillStyle = '#ff9d1f';
    ctx.beginPath();
    ctx.ellipse(dot.x, dot.y, 8, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#e07d10';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });
  ctx.globalAlpha = 1;
}