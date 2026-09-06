import { POL_LOOKS } from './config.js';

export function drawPolitician(ctx, p) {
    if (!p.alive) return;

    const hw = p.w / 2;
    const hh = p.h / 2;

    const L =
      POL_LOOKS[
        (p.look || 0) %
          POL_LOOKS.length
      ];

    ctx.save();

    ctx.translate(
      p.x + p.w / 2,
      p.y + p.h / 2
    );

    ctx.rotate(p.rotation || 0);

    // ---------------------------------------------------------
    // SHOULDERS / SUIT
    // ---------------------------------------------------------

    ctx.fillStyle = L.suit || '#202b3c';

    ctx.beginPath();

    ctx.moveTo(
      -hw,
      hh
    );

    ctx.quadraticCurveTo(
      -hw * 0.95,
      hh * 0.2,
      -hw * 0.48,
      0
    );

    ctx.lineTo(
      hw * 0.48,
      0
    );

    ctx.quadraticCurveTo(
      hw * 0.95,
      hh * 0.2,
      hw,
      hh
    );

    ctx.closePath();
    ctx.fill();

    // Lapel left
    ctx.fillStyle = L.lapel || '#152031';

    ctx.beginPath();

    ctx.moveTo(
      -hw * 0.48,
      hh * 0.05
    );

    ctx.lineTo(
      -hw * 0.06,
      hh * 0.62
    );

    ctx.lineTo(
      -hw * 0.62,
      hh * 0.46
    );

    ctx.closePath();
    ctx.fill();

    // Lapel right
    ctx.beginPath();

    ctx.moveTo(
      hw * 0.48,
      hh * 0.05
    );

    ctx.lineTo(
      hw * 0.06,
      hh * 0.62
    );

    ctx.lineTo(
      hw * 0.62,
      hh * 0.46
    );

    ctx.closePath();
    ctx.fill();

    // ---------------------------------------------------------
    // SHIRT
    // ---------------------------------------------------------

    ctx.fillStyle = '#f3f3f2';

    ctx.beginPath();

    ctx.moveTo(
      -hw * 0.23,
      hh * 0.05
    );

    ctx.lineTo(
      0,
      hh * 0.64
    );

    ctx.lineTo(
      hw * 0.23,
      hh * 0.05
    );

    ctx.closePath();
    ctx.fill();

    // ---------------------------------------------------------
    // TIE
    // ---------------------------------------------------------

    ctx.fillStyle = L.tie;

    ctx.beginPath();

    ctx.moveTo(
      -3.5,
      hh * 0.13
    );

    ctx.lineTo(
      3.5,
      hh * 0.13
    );

    ctx.lineTo(
      5,
      hh * 0.67
    );

    ctx.lineTo(
      0,
      hh * 0.84
    );

    ctx.lineTo(
      -5,
      hh * 0.67
    );

    ctx.closePath();
    ctx.fill();

    // ---------------------------------------------------------
    // NECK
    // ---------------------------------------------------------

    ctx.fillStyle = L.skin;

    ctx.fillRect(
      -hw * 0.15,
      -hh * 0.03,
      hw * 0.30,
      hh * 0.29
    );

    // ---------------------------------------------------------
    // HEAD
    // ---------------------------------------------------------

    ctx.fillStyle = L.skin;

    ctx.beginPath();

    if (L.type === 'rama') {
      // Rama — longer/narrower head
      ctx.ellipse(
        0,
        -hh * 0.38,
        hw * 0.49,
        hh * 0.67,
        0,
        0,
        Math.PI * 2
      );

    } else if (
      L.type === 'basha' ||
      L.type === 'balla'
    ) {
      // Fuller / rounder
      ctx.ellipse(
        0,
        -hh * 0.32,
        hw * 0.54,
        hh * 0.57,
        0,
        0,
        Math.PI * 2
      );

    } else if (
      L.type === 'veliaj'
    ) {
      // Slimmer face
      ctx.ellipse(
        0,
        -hh * 0.34,
        hw * 0.46,
        hh * 0.61,
        0,
        0,
        Math.PI * 2
      );

    } else if (
      L.type === 'caushi'
    ) {
      ctx.ellipse(
        0,
        -hh * 0.34,
        hw * 0.43,
        hh * 0.60,
        0,
        0,
        Math.PI * 2
      );

    } else {
      ctx.ellipse(
        0,
        -hh * 0.34,
        hw * 0.50,
        hh * 0.62,
        0,
        0,
        Math.PI * 2
      );
    }

    ctx.fill();

    // ---------------------------------------------------------
    // HAIR
    // ---------------------------------------------------------

    if (L.type === 'rama') {
      ctx.strokeStyle = L.hair;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-hw * 0.46, -hh * 0.48);
      ctx.quadraticCurveTo(-hw * 0.34, -hh * 0.81, -hw * 0.08, -hh * 0.84);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(hw * 0.08, -hh * 0.84);
      ctx.quadraticCurveTo(hw * 0.34, -hh * 0.78, hw * 0.46, -hh * 0.47);
      ctx.stroke();

      ctx.strokeStyle = '#e8e5df';
      ctx.lineWidth = 1.3;
      [-0.19, -0.07, 0.06, 0.18].forEach(offset => {
        ctx.beginPath();
        ctx.moveTo(offset * hw, -hh * 0.80);
        ctx.lineTo((offset + 0.05) * hw, -hh * 0.67);
        ctx.stroke();
      });

    } else if (
      L.type === 'berisha'
    ) {
      // Large white/silver hair
      ctx.fillStyle = L.hair;

      ctx.beginPath();

      ctx.moveTo(
        -hw * 0.50,
        -hh * 0.52
      );

      ctx.quadraticCurveTo(
        -hw * 0.55,
        -hh * 1.02,
        -hw * 0.05,
        -hh * 0.93
      );

      ctx.quadraticCurveTo(
        hw * 0.46,
        -hh * 1.03,
        hw * 0.52,
        -hh * 0.50
      );

      ctx.quadraticCurveTo(
        hw * 0.14,
        -hh * 0.69,
        0,
        -hh * 0.66
      );

      ctx.quadraticCurveTo(
        -hw * 0.22,
        -hh * 0.68,
        -hw * 0.50,
        -hh * 0.52
      );

      ctx.fill();

    } else if (
      L.type === 'veliaj'
    ) {
      // Spiky/upward hair
      ctx.fillStyle = L.hair;

      ctx.beginPath();

      ctx.moveTo(
        -hw * 0.47,
        -hh * 0.54
      );

      ctx.lineTo(
        -hw * 0.33,
        -hh * 0.92
      );

      ctx.lineTo(
        -hw * 0.15,
        -hh * 0.82
      );

      ctx.lineTo(
        0,
        -hh * 1.02
      );

      ctx.lineTo(
        hw * 0.17,
        -hh * 0.83
      );

      ctx.lineTo(
        hw * 0.36,
        -hh * 0.94
      );

      ctx.lineTo(
        hw * 0.48,
        -hh * 0.54
      );

      ctx.quadraticCurveTo(
        0,
        -hh * 0.67,
        -hw * 0.47,
        -hh * 0.54
      );

      ctx.fill();

    } else if (
      L.type === 'caushi'
    ) {
      // Hair behind head
      ctx.fillStyle = L.hair;

      ctx.beginPath();

      ctx.ellipse(
        0,
        -hh * 0.32,
        hw * 0.61,
        hh * 0.72,
        0,
        0,
        Math.PI * 2
      );

      ctx.fill();

      // Redraw face over back hair
      ctx.fillStyle = L.skin;

      ctx.beginPath();

      ctx.ellipse(
        0,
        -hh * 0.34,
        hw * 0.43,
        hh * 0.60,
        0,
        0,
        Math.PI * 2
      );

      ctx.fill();

      // Front hair
      ctx.fillStyle = L.hair;

      ctx.beginPath();

      ctx.moveTo(
        -hw * 0.43,
        -hh * 0.53
      );

      ctx.quadraticCurveTo(
        -hw * 0.20,
        -hh * 0.94,
        hw * 0.10,
        -hh * 0.86
      );

      ctx.quadraticCurveTo(
        hw * 0.36,
        -hh * 0.82,
        hw * 0.42,
        -hh * 0.53
      );

      ctx.quadraticCurveTo(
        hw * 0.12,
        -hh * 0.68,
        -hw * 0.04,
        -hh * 0.58
      );

      ctx.quadraticCurveTo(
        -hw * 0.25,
        -hh * 0.40,
        -hw * 0.43,
        -hh * 0.53
      );

      ctx.fill();

    } else {
      // Generic dark hairstyle
      ctx.fillStyle = L.hair;

      ctx.beginPath();

      ctx.moveTo(
        -hw * 0.47,
        -hh * 0.53
      );

      ctx.quadraticCurveTo(
        -hw * 0.25,
        -hh * 0.92,
        hw * 0.05,
        -hh * 0.90
      );

      ctx.quadraticCurveTo(
        hw * 0.45,
        -hh * 0.90,
        hw * 0.48,
        -hh * 0.52
      );

      ctx.quadraticCurveTo(
        hw * 0.15,
        -hh * 0.65,
        -hw * 0.47,
        -hh * 0.53
      );

      ctx.fill();
    }

    // ---------------------------------------------------------
    // EYES
    // ---------------------------------------------------------

    const eyeY =
      -hh * 0.33;

    const eyeGap =
      L.type === 'caushi'
        ? hw * 0.17
        : hw * 0.20;

    const eyeW =
      L.type === 'caushi'
        ? hw * 0.135
        : hw * 0.14;

    const eyeH =
      hh * 0.10;

    ctx.fillStyle = '#fff';

    ctx.beginPath();

    ctx.ellipse(
      -eyeGap,
      eyeY,
      eyeW,
      eyeH,
      0,
      0,
      Math.PI * 2
    );

    ctx.fill();

    ctx.beginPath();

    ctx.ellipse(
      eyeGap,
      eyeY,
      eyeW,
      eyeH,
      0,
      0,
      Math.PI * 2
    );

    ctx.fill();

    let lookX = 0;

    if (
      L.type === 'rama' ||
      L.type === 'meta'
    ) {
      lookX = 2;
    }

    if (
      L.type === 'basha' ||
      L.type === 'balla'
    ) {
      lookX = -2;
    }

    ctx.fillStyle = '#221e1b';

    ctx.beginPath();

    ctx.arc(
      -eyeGap + lookX,
      eyeY,
      3.1,
      0,
      Math.PI * 2
    );

    ctx.fill();

    ctx.beginPath();

    ctx.arc(
      eyeGap + lookX,
      eyeY,
      3.1,
      0,
      Math.PI * 2
    );

    ctx.fill();

    // ---------------------------------------------------------
    // EYEBROWS
    // ---------------------------------------------------------

    ctx.strokeStyle =
      L.type === 'berisha'
        ? '#69615a'
        : L.hair;

    ctx.lineWidth =
      L.type === 'meta'
        ? 4.5
        : 3.5;

    ctx.lineCap = 'round';

    ctx.beginPath();

    ctx.moveTo(
      -hw * 0.37,
      -hh * 0.48
    );

    ctx.lineTo(
      -hw * 0.07,
      -hh * 0.43
    );

    ctx.moveTo(
      hw * 0.37,
      -hh * 0.48
    );

    ctx.lineTo(
      hw * 0.07,
      -hh * 0.43
    );

    ctx.stroke();

    // ---------------------------------------------------------
    // BERISHA GLASSES
    // ---------------------------------------------------------

    if (
      L.type === 'berisha'
    ) {
      ctx.strokeStyle = '#6b4f28';
      ctx.lineWidth = 1.7;

      ctx.beginPath();

      ctx.ellipse(
        -eyeGap,
        eyeY,
        hw * 0.19,
        hh * 0.14,
        0,
        0,
        Math.PI * 2
      );

      ctx.stroke();

      ctx.beginPath();

      ctx.ellipse(
        eyeGap,
        eyeY,
        hw * 0.19,
        hh * 0.14,
        0,
        0,
        Math.PI * 2
      );

      ctx.stroke();

      ctx.beginPath();

      ctx.moveTo(
        -hw * 0.02,
        eyeY
      );

      ctx.lineTo(
        hw * 0.02,
        eyeY
      );

      ctx.stroke();
    }

    // ---------------------------------------------------------
    // NOSE
    // ---------------------------------------------------------

    ctx.fillStyle = '#b87556';

    const noseW =
      L.type === 'rama'
        ? hw * 0.20
        : L.type === 'veliaj'
        ? hw * 0.18
        : hw * 0.16;

    const noseH =
      L.type === 'rama'
        ? hh * 0.31
        : hh * 0.25;

    ctx.beginPath();

    ctx.moveTo(
      0,
      -hh * 0.23
    );

    ctx.quadraticCurveTo(
      noseW * 0.65,
      -hh * 0.08,
      noseW * 0.25,
      -hh * 0.08 +
        noseH * 0.45
    );

    ctx.quadraticCurveTo(
      0,
      -hh * 0.08 +
        noseH * 0.65,
      -noseW * 0.25,
      -hh * 0.08 +
        noseH * 0.45
    );

    ctx.quadraticCurveTo(
      -noseW * 0.65,
      -hh * 0.08,
      0,
      -hh * 0.23
    );

    ctx.fill();

    // ---------------------------------------------------------
    // BEARDS
    // ---------------------------------------------------------

    if (L.type === 'rama') {
      ctx.fillStyle = L.beard;
      ctx.beginPath();
      ctx.moveTo(-hw * 0.44, -hh * 0.06);
      ctx.quadraticCurveTo(-hw * 0.38, hh * 0.42, 0, hh * 0.48);
      ctx.quadraticCurveTo(hw * 0.38, hh * 0.42, hw * 0.44, -hh * 0.06);
      ctx.quadraticCurveTo(hw * 0.23, hh * 0.06, 0, hh * 0.06);
      ctx.quadraticCurveTo(-hw * 0.23, hh * 0.06, -hw * 0.44, -hh * 0.06);
      ctx.fill();

    } else if (L.type === 'veliaj' || L.type === 'balla') {
      ctx.fillStyle = L.beard;
      ctx.globalAlpha = 0.72;
      ctx.beginPath();
      ctx.moveTo(-hw * 0.40, -hh * 0.04);
      ctx.quadraticCurveTo(-hw * 0.30, hh * 0.37, 0, hh * 0.40);
      ctx.quadraticCurveTo(hw * 0.30, hh * 0.37, hw * 0.40, -hh * 0.04);
      ctx.quadraticCurveTo(hw * 0.18, hh * 0.08, 0, hh * 0.07);
      ctx.quadraticCurveTo(-hw * 0.18, hh * 0.08, -hw * 0.40, -hh * 0.04);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // ---------------------------------------------------------
    // MOUTH
    // ---------------------------------------------------------

    ctx.strokeStyle =
      L.type === 'caushi'
        ? '#aa4b51'
        : '#713e35';

    ctx.lineWidth = 2.1;
    ctx.lineCap = 'round';

    ctx.beginPath();

    ctx.moveTo(
      -hw * 0.14,
      hh * 0.12
    );

    if (p.expression === 'sad') {
      ctx.quadraticCurveTo(
        0,
        hh * 0.01,
        hw * 0.14,
        hh * 0.12
      );

    } else if (
      L.type === 'veliaj'
    ) {
      ctx.quadraticCurveTo(
        0,
        hh * 0.25,
        hw * 0.18,
        hh * 0.10
      );

    } else if (
      L.type === 'meta' ||
      L.type === 'berisha'
    ) {
      ctx.quadraticCurveTo(
        0,
        hh * 0.08,
        hw * 0.14,
        hh * 0.12
      );

    } else {
      ctx.quadraticCurveTo(
        0,
        hh * 0.19,
        hw * 0.14,
        hh * 0.12
      );
    }

    ctx.stroke();

    // ---------------------------------------------------------
    // ÇAUSHI EYELASHES + EARRINGS
    // ---------------------------------------------------------

    if (
      L.type === 'caushi'
    ) {
      ctx.strokeStyle = '#34221d';
      ctx.lineWidth = 1.4;

      for (
        const side of [-1, 1]
      ) {
        for (
          let i = 0;
          i < 3;
          i++
        ) {
          const x =
            side *
            hw *
            (
              0.12 +
              i * 0.04
            );

          ctx.beginPath();

          ctx.moveTo(
            x,
            -hh * 0.43
          );

          ctx.lineTo(
            x + side * 2,
            -hh * 0.49
          );

          ctx.stroke();
        }
      }

      ctx.fillStyle = '#f1f1f1';

      ctx.beginPath();

      ctx.arc(
        -hw * 0.45,
        -hh * 0.02,
        2.7,
        0,
        Math.PI * 2
      );

      ctx.fill();

      ctx.beginPath();

      ctx.arc(
        hw * 0.45,
        -hh * 0.02,
        2.7,
        0,
        Math.PI * 2
      );

      ctx.fill();
    }

    ctx.restore();
  }
