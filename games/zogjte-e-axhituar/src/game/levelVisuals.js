export function drawPyramidDetails(ctx, levelIdx, groundY, roundRect) {
  if (levelIdx !== 1) return;

  const baseY = groundY();
  [360, 435, 510, 585, 660].forEach(x => {
    const ice = ctx.createLinearGradient(x, baseY - 22, x, baseY);
    ice.addColorStop(0, '#dffcff');
    ice.addColorStop(1, '#31bce8');
    ctx.fillStyle = ice;
    roundRect(x, baseY - 22, 72, 22, 5);
    ctx.fill();
    ctx.strokeStyle = '#178dbd';
    ctx.lineWidth = 2;
    roundRect(x, baseY - 22, 72, 22, 5);
    ctx.stroke();
    ctx.fillStyle = '#ffffff99';
    ctx.fillRect(x + 8, baseY - 18, 20, 4);
  });

  [
    { x: 472, y: baseY - 214 },
    { x: 598, y: baseY - 214 },
    { x: 535, y: baseY - 322 }
  ].forEach(({ x, y }) => {
    ctx.fillStyle = '#d9e0df';
    ctx.strokeStyle = '#77888d';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - 18, y + 16);
    ctx.lineTo(x, y - 12);
    ctx.lineTo(x + 18, y + 16);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#1bc8f0';
    ctx.strokeStyle = '#087fae';
    ctx.beginPath();
    ctx.moveTo(x, y - 29);
    ctx.lineTo(x + 10, y - 19);
    ctx.lineTo(x + 6, y - 5);
    ctx.lineTo(x - 6, y - 5);
    ctx.lineTo(x - 10, y - 19);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#ffffff99';
    ctx.beginPath();
    ctx.ellipse(x - 3, y - 21, 2.5, 4, -0.5, 0, Math.PI * 2);
    ctx.fill();
  });
}

export function drawPyramidBackground(ctx, W, H, gy, helpers) {
  const { drawCloud, drawFlowers, drawSlingshot } = helpers;
  const sky = ctx.createLinearGradient(0, 0, 0, gy);
  sky.addColorStop(0, '#67c4ef');
  sky.addColorStop(0.64, '#b7e9fb');
  sky.addColorStop(1, '#effaff');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  drawCloud(500, 54, 1.15);
  drawCloud(674, 112, 0.7);
  drawCloud(255, 94, 0.52);

  ctx.fillStyle = '#a3cbd4';
  ctx.beginPath();
  ctx.moveTo(125, gy);
  ctx.lineTo(230, gy - 155);
  ctx.lineTo(330, gy);
  ctx.lineTo(390, gy - 88);
  ctx.lineTo(480, gy);
  ctx.lineTo(585, gy - 140);
  ctx.lineTo(710, gy);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#77b776';
  ctx.beginPath();
  ctx.moveTo(250, gy);
  ctx.quadraticCurveTo(330, gy - 56, 430, gy - 16);
  ctx.quadraticCurveTo(520, gy - 70, 640, gy - 14);
  ctx.lineTo(720, gy);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#6bbe3f';
  ctx.fillRect(0, gy, W, H - gy);
  ctx.fillStyle = '#51a93a';
  ctx.fillRect(0, gy, W, 8);

  [
    { side: -1, x: 34, height: 155 },
    { side: 1, x: W - 34, height: 128 }
  ].forEach(({ side, x, height }) => {
    ctx.fillStyle = '#84365f';
    ctx.beginPath();
    ctx.moveTo(x + side * 96, gy + 42);
    ctx.lineTo(x + side * 78, gy - height + 40);
    ctx.quadraticCurveTo(x + side * 28, gy - height, x, gy - height + 18);
    ctx.quadraticCurveTo(x - side * 36, gy - height + 52, x - side * 96, gy + 42);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#b4497b';
    ctx.beginPath();
    ctx.moveTo(x + side * 76, gy - height + 48);
    ctx.quadraticCurveTo(x, gy - height + 18, x - side * 44, gy - height + 58);
    ctx.lineTo(x - side * 58, gy - height + 70);
    ctx.quadraticCurveTo(x, gy - height + 45, x + side * 70, gy - height + 72);
    ctx.closePath();
    ctx.fill();
  });

  drawFlowers(gy);
  drawSlingshot(gy);
}

function drawFortressBackground(ctx, W, H, gy, helpers) {
  const { drawCloud, drawFlowers, drawSlingshot } = helpers;
  const sky = ctx.createLinearGradient(0, 0, 0, gy);
  sky.addColorStop(0, '#68c6ef');
  sky.addColorStop(0.58, '#bceafa');
  sky.addColorStop(1, '#e8f9fd');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  drawCloud(W * 0.78, 56, 1.1);
  drawCloud(W * 0.94, 118, 0.72);
  drawCloud(W * 0.29, 86, 0.45);

  ctx.fillStyle = '#a1c4d3';
  ctx.beginPath();
  ctx.moveTo(W * 0.24, gy);
  ctx.quadraticCurveTo(W * 0.36, gy - 190, W * 0.49, gy - 30);
  ctx.quadraticCurveTo(W * 0.57, gy - 125, W * 0.68, gy - 34);
  ctx.lineTo(W * 0.83, gy);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#71b56a';
  ctx.beginPath();
  ctx.moveTo(W * 0.31, gy);
  ctx.quadraticCurveTo(W * 0.43, gy - 45, W * 0.53, gy - 16);
  ctx.quadraticCurveTo(W * 0.67, gy - 58, W * 0.83, gy);
  ctx.closePath();
  ctx.fill();

  const water = ctx.createLinearGradient(0, gy - 54, 0, gy + 12);
  water.addColorStop(0, '#90d8ee');
  water.addColorStop(1, '#43add4');
  ctx.fillStyle = water;
  ctx.fillRect(0, gy - 50, W, 60);
  ctx.strokeStyle = '#eefeffaa';
  ctx.lineWidth = 2;
  [0.37, 0.57, 0.76].forEach(x => {
    ctx.beginPath();
    ctx.moveTo(W * x - 22, gy - 19);
    ctx.quadraticCurveTo(W * x, gy - 14, W * x + 22, gy - 19);
    ctx.stroke();
  });

  ctx.fillStyle = '#7b2f5c';
  ctx.beginPath();
  ctx.moveTo(0, gy + 55);
  ctx.lineTo(0, gy - 155);
  ctx.quadraticCurveTo(70, gy - 126, 130, gy - 22);
  ctx.lineTo(195, gy + 55);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#ae4b7c';
  ctx.beginPath();
  ctx.moveTo(0, gy - 150);
  ctx.quadraticCurveTo(68, gy - 118, 125, gy - 35);
  ctx.lineTo(95, gy - 27);
  ctx.quadraticCurveTo(45, gy - 91, 0, gy - 105);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#6bbe3f';
  ctx.fillRect(0, gy, W, H - gy);
  ctx.fillStyle = '#4da535';
  ctx.fillRect(0, gy, W, 8);
  drawFlowers(gy);
  drawSlingshot(gy);
}

function drawDesertBackground(ctx, W, H, gy, helpers) {
  const { drawSlingshot } = helpers;
  const sky = ctx.createLinearGradient(0, 0, 0, gy);
  sky.addColorStop(0, '#f7d55f');
  sky.addColorStop(0.68, '#ffe9a1');
  sky.addColorStop(1, '#f7bd87');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = '#fff7cc';
  ctx.lineWidth = 26;
  ctx.lineCap = 'round';
  [80, 210, 360, 520, 690].forEach((x, index) => {
    ctx.beginPath();
    ctx.arc(x, 172 + (index % 2) * 12, 80, Math.PI * 1.05, Math.PI * 1.9);
    ctx.stroke();
  });

  ctx.fillStyle = '#e5a475';
  ctx.beginPath();
  ctx.moveTo(0, gy);
  ctx.quadraticCurveTo(170, gy - 60, 330, gy - 22);
  ctx.quadraticCurveTo(510, gy - 66, W, gy - 14);
  ctx.lineTo(W, gy);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#9cb94d';
  [300, 595, 745].forEach(x => {
    ctx.fillRect(x - 5, gy - 42, 10, 42);
    ctx.beginPath();
    ctx.ellipse(x - 13, gy - 34, 12, 22, -0.45, 0, Math.PI * 2);
    ctx.ellipse(x + 13, gy - 24, 12, 22, 0.45, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = '#6c3428';
  ctx.fillRect(0, gy, W, H - gy);
  ctx.fillStyle = '#8f4a35';
  ctx.fillRect(0, gy, W, 10);
  ctx.fillStyle = '#43251f';
  for (let x = 0; x < W; x += 52) ctx.fillRect(x + 8, gy + 38, 34, 12);
  drawSlingshot(gy);
}

function drawFloatingBackground(ctx, W, H, gy, helpers) {
  const { drawCloud, drawSlingshot } = helpers;
  const sky = ctx.createLinearGradient(0, 0, 0, gy);
  sky.addColorStop(0, '#55cbea');
  sky.addColorStop(0.62, '#bceef0');
  sky.addColorStop(1, '#e6faf2');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);
  drawCloud(420, 56, 0.92);
  drawCloud(670, 106, 0.66);
  drawCloud(230, 148, 0.45);

  ctx.globalAlpha = 0.32;
  ctx.fillStyle = '#5f8da1';
  [280, 460, 670].forEach((x, index) => {
    ctx.beginPath();
    ctx.ellipse(x, 260 + index * 18, 66, 150, 0, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  // Forest silhouettes frame the floating islands.
  ctx.fillStyle = '#174d42';
  [30, 95, 720, 790].forEach((x, index) => {
    ctx.beginPath();
    ctx.arc(x, 78 + index * 10, 80, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = '#236b52';
  [30, 100, 710, 790].forEach((x, index) => {
    ctx.beginPath();
    ctx.arc(x, 116 + index * 8, 55, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = '#5abf55';
  [
    { x: 412, y: gy - 70, width: 150 },
    { x: 572, y: gy - 187, width: 170 },
    { x: 730, y: gy - 110, width: 126 }
  ].forEach(island => {
    ctx.beginPath();
    ctx.ellipse(island.x, island.y, island.width / 2, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#477557';
    ctx.beginPath();
    ctx.moveTo(island.x - island.width * 0.38, island.y + 9);
    ctx.lineTo(island.x + island.width * 0.28, island.y + 9);
    ctx.lineTo(island.x + island.width * 0.12, island.y + 48);
    ctx.lineTo(island.x - island.width * 0.18, island.y + 56);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#5abf55';
  });
  drawSlingshot(gy);
}

function drawCliffBackground(ctx, W, H, gy, helpers) {
  const { drawCloud, drawSlingshot } = helpers;
  const sky = ctx.createLinearGradient(0, 0, 0, gy);
  sky.addColorStop(0, '#69b6ec');
  sky.addColorStop(0.63, '#bee9fa');
  sky.addColorStop(1, '#f1fbff');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);
  drawCloud(410, 46, 1.25);
  drawCloud(710, 95, 0.7);

  ctx.fillStyle = '#a0c6df';
  ctx.beginPath();
  ctx.moveTo(180, gy);
  ctx.quadraticCurveTo(280, gy - 78, 375, gy - 24);
  ctx.quadraticCurveTo(470, gy - 94, 585, gy);
  ctx.closePath();
  ctx.fill();

  // The left launch ledge and larger right cliff leave a visible ravine between them.
  ctx.fillStyle = '#08752a';
  ctx.beginPath();
  ctx.moveTo(0, gy - 24);
  ctx.quadraticCurveTo(95, gy - 42, 190, gy - 18);
  ctx.lineTo(222, H);
  ctx.lineTo(0, H);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(442, gy - 22);
  ctx.quadraticCurveTo(625, gy - 50, W, gy - 18);
  ctx.lineTo(W, H);
  ctx.lineTo(438, H);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#42bd58';
  ctx.beginPath();
  ctx.moveTo(0, gy - 28);
  ctx.quadraticCurveTo(100, gy - 52, 205, gy - 24);
  ctx.lineTo(205, gy - 9);
  ctx.lineTo(0, gy - 9);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(442, gy - 26);
  ctx.quadraticCurveTo(630, gy - 54, W, gy - 22);
  ctx.lineTo(W, gy - 7);
  ctx.lineTo(442, gy - 7);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#07581f';
  [38, 94, 762].forEach((x, index) => {
    ctx.beginPath();
    ctx.arc(x, gy - 180 + index * 22, 48, 0, Math.PI * 2);
    ctx.fill();
  });
  drawSlingshot(gy);
}

function drawSchoolBackground(ctx, W, H, gy, helpers) {
  const { drawCloud, drawSlingshot } = helpers;
  const sky = ctx.createLinearGradient(0, 0, 0, gy);
  sky.addColorStop(0, '#42a8df');
  sky.addColorStop(0.68, '#aeeefa');
  sky.addColorStop(1, '#e6fcff');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);
  drawCloud(175, 96, 1.1);
  drawCloud(448, 58, 1.2);
  drawCloud(675, 120, 0.65);

  // Ropes remain while their apple-and-balloon targets are physical game objects.
  ctx.strokeStyle = '#7b4b27';
  ctx.lineWidth = 3;
  [362, 407, 450].forEach(x => {
    ctx.beginPath();
    ctx.moveTo(x, 36);
    ctx.lineTo(x, x === 407 ? 82 : 112);
    ctx.stroke();
  });
  ctx.fillStyle = '#e63a31';
  ctx.fillRect(492, 172, 24, 16);

  ctx.fillStyle = '#f5ce45';
  ctx.beginPath();
  ctx.arc(555, 128, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#9d682e';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('A+', 555, 134);

  ctx.fillStyle = '#d9b77b';
  [8, 118, 232].forEach((x, index) => {
    ctx.beginPath();
    ctx.moveTo(x, gy - 18);
    ctx.lineTo(x + 42, gy - 62 - index * 8);
    ctx.lineTo(x + 92, gy - 18);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#f2d59b';
    ctx.fillRect(x + 22, gy - 18, 52, 35);
    ctx.fillStyle = '#d9b77b';
  });

  // Background school facade appears behind the destructible block structure.
  ctx.fillStyle = '#d6ad67';
  ctx.fillRect(670, gy - 155, 130, 155);
  ctx.fillStyle = '#bd8046';
  ctx.beginPath();
  ctx.moveTo(650, gy - 155);
  ctx.lineTo(735, gy - 218);
  ctx.lineTo(800, gy - 155);
  ctx.closePath();
  ctx.fill();
  ctx.font = 'bold 20px sans-serif';
  ctx.textAlign = 'center';
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#f7e6b8';
  ctx.strokeText('FLAMINGO', 735, gy - 152);
  ctx.strokeText('REVOLUTION', 735, gy - 128);
  ctx.fillStyle = '#744326';
  ctx.fillText('FLAMINGO', 735, gy - 152);
  ctx.fillText('REVOLUTION', 735, gy - 128);
  ctx.fillStyle = '#8d5938';
  ctx.fillRect(747, gy - 64, 30, 64);
  ctx.fillStyle = '#f3e19b';
  [690, 716, 782].forEach(x => ctx.fillRect(x, gy - 124, 14, 20));
  ctx.fillStyle = '#42a8df';
  [682, 710, 738].forEach(x => {
    ctx.fillRect(x, gy - 92, 15, 24);
    ctx.fillRect(x, gy - 52, 15, 20);
  });

  ctx.fillStyle = '#5c3b22';
  ctx.fillRect(0, gy, W, H - gy);
  ctx.fillStyle = '#57be39';
  ctx.fillRect(0, gy - 10, W, 18);
  ctx.fillStyle = '#35a82e';
  for (let x = 0; x < W; x += 48) {
    ctx.beginPath();
    ctx.ellipse(x + 18, gy + 7, 22, 11, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  drawSlingshot(gy);
}

function drawVolcanoBackground(ctx, W, H, gy, helpers) {
  const { drawSlingshot } = helpers;
  const sky = ctx.createLinearGradient(0, 0, 0, gy);
  sky.addColorStop(0, '#38265f');
  sky.addColorStop(0.55, '#bc5360');
  sky.addColorStop(1, '#f0a259');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#49334b';
  ctx.beginPath();
  ctx.moveTo(300, gy);
  ctx.lineTo(430, gy - 290);
  ctx.lineTo(560, gy);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#251f32';
  ctx.beginPath();
  ctx.moveTo(390, gy - 202);
  ctx.lineTo(430, gy - 290);
  ctx.lineTo(470, gy - 202);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#ffcb55';
  ctx.lineWidth = 9;
  [[400, gy - 118, 420, gy - 44], [458, gy - 140, 482, gy - 50], [432, gy - 236, 446, gy - 198]].forEach(points => {
    ctx.beginPath();
    ctx.moveTo(points[0], points[1]);
    ctx.lineTo(points[2], points[3]);
    ctx.stroke();
  });

  ctx.fillStyle = '#3a2422';
  ctx.fillRect(0, gy, W, H - gy);
  ctx.fillStyle = '#e8642e';
  ctx.fillRect(0, gy, W, 9);
  drawSlingshot(gy);
}

function drawMoonlightBackground(ctx, W, H, gy, helpers) {
  const { drawSlingshot } = helpers;
  const sky = ctx.createLinearGradient(0, 0, 0, gy);
  sky.addColorStop(0, '#122545');
  sky.addColorStop(1, '#4d7597');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#fff2ba';
  ctx.beginPath();
  ctx.arc(W * 0.72, 92, 48, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#d9c982';
  [[W * 0.69, 78, 8], [W * 0.76, 108, 6], [W * 0.78, 65, 5]].forEach(([x, y, radius]) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = '#243f52';
  [80, 188, 670, 755].forEach((x, index) => {
    ctx.beginPath();
    ctx.moveTo(x - 72, gy);
    ctx.lineTo(x, gy - 90 - index % 2 * 35);
    ctx.lineTo(x + 72, gy);
    ctx.closePath();
    ctx.fill();
  });
  ctx.fillStyle = '#314e42';
  ctx.fillRect(0, gy, W, H - gy);
  ctx.fillStyle = '#6fa25a';
  ctx.fillRect(0, gy, W, 8);
  drawSlingshot(gy);
}

function drawMarshBackground(ctx, W, H, gy, helpers) {
  const { drawCloud, drawSlingshot } = helpers;
  const sky = ctx.createLinearGradient(0, 0, 0, gy);
  sky.addColorStop(0, '#5eabc0');
  sky.addColorStop(1, '#b6e4c6');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);
  drawCloud(130, 70, 0.65);
  drawCloud(610, 102, 0.8);
  ctx.fillStyle = '#4d8762';
  [95, 210, 650, 742].forEach((x, index) => {
    ctx.fillRect(x, gy - 106 - index % 2 * 26, 7, 112 + index % 2 * 26);
    ctx.beginPath();
    ctx.ellipse(x + 16, gy - 108 - index % 2 * 26, 23, 9, -0.4, 0, Math.PI * 2);
    ctx.fill();
  });
  const water = ctx.createLinearGradient(0, gy - 28, 0, H);
  water.addColorStop(0, '#4faeb6');
  water.addColorStop(1, '#21788b');
  ctx.fillStyle = water;
  ctx.fillRect(0, gy - 20, W, H - gy + 20);
  ctx.fillStyle = '#74ad4a';
  [285, 380, 505, 600].forEach(x => {
    ctx.beginPath();
    ctx.ellipse(x, gy + 18, 34, 10, 0, 0, Math.PI * 2);
    ctx.fill();
  });
  drawSlingshot(gy);
}

export function drawLevelBackground(ctx, levelIdx, W, H, gy, helpers) {
  const level = [
    'coast', 'pyramid', 'fortress', 'desert', 'floating', 'cliff', 'volcano', 'moonlight', 'marsh', 'school'
  ][levelIdx];

  if (level === 'volcano') {
    drawVolcanoBackground(ctx, W, H, gy, helpers);
    return;
  }

  if (level === 'moonlight') {
    drawMoonlightBackground(ctx, W, H, gy, helpers);
    return;
  }

  if (level === 'marsh') {
    drawMarshBackground(ctx, W, H, gy, helpers);
    return;
  }

  if (levelIdx === 1) {
    drawPyramidBackground(ctx, W, H, gy, helpers);
    return;
  }

  if (levelIdx === 2) {
    drawFortressBackground(ctx, W, H, gy, helpers);
    return;
  }

  if (levelIdx === 3) {
    drawDesertBackground(ctx, W, H, gy, helpers);
    return;
  }

  if (levelIdx === 4) {
    drawFloatingBackground(ctx, W, H, gy, helpers);
    return;
  }

  if (levelIdx === 5) {
    drawCliffBackground(ctx, W, H, gy, helpers);
    return;
  }

  if (levelIdx === 9) {
    drawSchoolBackground(ctx, W, H, gy, helpers);
    return;
  }

  const { drawCloud, drawRock, drawFlowers, drawSlingshot } = helpers;
  const sky = ctx.createLinearGradient(0, 0, 0, gy);
  sky.addColorStop(0, '#8fd3f2');
  sky.addColorStop(1, '#d3f0fb');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, gy + 90);

  drawCloud(W * 0.80, 66, 1.15);
  drawCloud(W * 0.94, 130, 0.8);
  drawCloud(W * 0.22, 54, 0.7);
  drawCloud(W * 0.5, 40, 0.6);

  const sea = ctx.createLinearGradient(0, gy - 48, 0, gy + 8);
  sea.addColorStop(0, '#6fc8e8');
  sea.addColorStop(1, '#3fa6d4');
  ctx.fillStyle = sea;
  ctx.fillRect(0, gy - 46, W, 56);

  drawRock(W * 0.48, gy - 52, 150, 96);
  drawRock(W * 0.30, gy - 34, 78, 56);
  ctx.fillStyle = '#6bbe3f';
  ctx.fillRect(0, gy, W, H - gy);
  ctx.fillStyle = '#5aa833';
  ctx.fillRect(0, gy, W, 10);
  drawFlowers(gy);
  drawSlingshot(gy);
}