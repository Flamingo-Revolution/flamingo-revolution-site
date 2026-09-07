function buildTower(blocks, politicians, makeBlock, makePolitician, cx, baseY, style, tier, look) {
  const pillarWidth = 20;
  const pillarHeight = 84;
  const gap = 30;
  const lift = tier >= 1 ? 74 : 0;
  const floorY = baseY - lift;

  if (lift > 0) {
    blocks.push(makeBlock(cx - gap - pillarWidth, floorY, pillarWidth, lift, style));
    blocks.push(makeBlock(cx + gap, floorY, pillarWidth, lift, style));
  }

  blocks.push(makeBlock(cx - gap - pillarWidth, floorY - pillarHeight, pillarWidth, pillarHeight, style));
  blocks.push(makeBlock(cx + gap, floorY - pillarHeight, pillarWidth, pillarHeight, style));
  const beamY = floorY - pillarHeight - pillarWidth;
  const beamWidth = gap * 2 + pillarWidth * 2;
  blocks.push(makeBlock(cx - gap - pillarWidth, beamY, beamWidth, pillarWidth, style));
  blocks.push(makeBlock(cx - gap - pillarWidth, beamY - 18, beamWidth, 18, style === 'ice' ? 'iceroof' : 'roof'));
  const politicianLook = look == null ? politicians.length : look;

  if (politicianLook === 0) {
    const platformY = floorY - 12;
    const platform = makeBlock(cx - 36, platformY, 72, 12, 'ice');
    platform.anchored = true;
    blocks.push(platform);
    politicians.push(makePolitician(cx - 29, platformY - 58, 58, 58, politicianLook));
  } else {
    politicians.push(makePolitician(cx - 29, floorY - 58, 58, 58, politicianLook));
  }
}

function buildPyramid(blocks, politicians, makeBlock, makePolitician, baseY) {
  const cells = [
    { x: 410, y: baseY, style: 'ice', look: 2 },
    { x: 535, y: baseY, style: 'wood', look: 3 },
    { x: 660, y: baseY, style: 'ice', look: 4 },
    { x: 472, y: baseY - 108, style: 'wood', look: 5 },
    { x: 598, y: baseY - 108, style: 'ice', look: 6 },
    { x: 535, y: baseY - 216, style: 'wood', look: 0 }
  ];

  cells.forEach(({ x, y, style, look }) => {
    const pillarWidth = 18;
    const pillarHeight = 72;
    const halfGap = 32;
    const beamY = y - pillarHeight - pillarWidth;
    const beamWidth = halfGap * 2 + pillarWidth * 2;
    blocks.push(makeBlock(x - halfGap - pillarWidth, y - pillarHeight, pillarWidth, pillarHeight, style));
    blocks.push(makeBlock(x + halfGap, y - pillarHeight, pillarWidth, pillarHeight, style));
    blocks.push(makeBlock(x - halfGap - pillarWidth, beamY, beamWidth, pillarWidth, style));
    blocks.push(makeBlock(x - halfGap - pillarWidth, beamY - 16, beamWidth, 16, style === 'ice' ? 'iceroof' : 'roof'));
    politicians.push(makePolitician(x - 29, y - 58, 58, 58, look));
  });
}

function buildTntStack(blocks, makeBlock, cx, baseY) {
  const legHeight = 46;
  const legWidth = 16;
  const topWidth = 116;
  blocks.push(makeBlock(cx - topWidth / 2 + 8, baseY - legHeight, legWidth, legHeight, 'wood'));
  blocks.push(makeBlock(cx + topWidth / 2 - legWidth - 8, baseY - legHeight, legWidth, legHeight, 'wood'));
  blocks.push(makeBlock(cx - topWidth / 2, baseY - legHeight - 16, topWidth, 16, 'wood'));
  const y = baseY - legHeight - 42;
  blocks.push(makeBlock(cx - 39, y, 26, 26, 'stone'));
  blocks.push(makeBlock(cx - 13, y, 26, 26, 'tnt'));
  blocks.push(makeBlock(cx + 13, y, 26, 26, 'stone'));
  blocks.push(makeBlock(cx - 13, y - 26, 26, 26, 'tnt'));
}

function buildDesertRuins(blocks, politicians, makeBlock, makePolitician, baseY) {
  const add = (x, y, width, height, style) => blocks.push(makeBlock(x, y, width, height, style));

  // Stone-topped wooden bunker on the left.
  add(385, baseY - 40, 24, 40, 'wood');
  add(465, baseY - 40, 24, 40, 'wood');
  add(375, baseY - 62, 124, 22, 'wood');
  add(390, baseY - 122, 24, 60, 'wood');
  add(460, baseY - 122, 24, 60, 'wood');
  add(382, baseY - 144, 110, 22, 'stone');
  add(418, baseY - 190, 24, 46, 'stone');
  add(412, baseY - 214, 36, 24, 'stone');
  politicians.push(makePolitician(412, baseY - 120, 58, 58, 1));
  politicians.push(makePolitician(330, baseY - 48, 52, 52, 2));
  add(322, baseY - 8, 58, 8, 'stone');

  // Central TNT cluster and rubble.
  add(545, baseY - 26, 26, 26, 'tnt');
  add(575, baseY - 26, 26, 26, 'tnt');
  add(560, baseY - 52, 26, 26, 'tnt');
  add(620, baseY - 25, 26, 25, 'stone');
  add(646, baseY - 42, 22, 22, 'stone');
  add(667, baseY - 25, 24, 25, 'stone');

  // Tall stone frame on the right, plus a separate TNT target.
  add(690, baseY - 126, 16, 126, 'stone');
  add(760, baseY - 126, 16, 126, 'stone');
  add(690, baseY - 142, 86, 16, 'stone');
  add(704, baseY - 210, 16, 68, 'stone');
  add(746, baseY - 210, 16, 68, 'stone');
  add(704, baseY - 156, 58, 14, 'stone');
  politicians.push(makePolitician(705, baseY - 58, 58, 58, 3));
  add(790, baseY - 26, 26, 26, 'tnt');
}

function buildFloatingIslands(blocks, politicians, makeBlock, makePolitician, baseY) {
  const add = (x, y, width, height, style, anchored = false) => {
    const block = makeBlock(x, y, width, height, style);
    block.anchored = anchored;
    blocks.push(block);
  };

  // Low left island with a compact wooden cell.
  add(355, baseY - 88, 115, 16, 'wood', true);
  add(372, baseY - 160, 16, 72, 'wood');
  add(435, baseY - 160, 16, 72, 'wood');
  add(365, baseY - 178, 92, 18, 'wood');
  politicians.push(makePolitician(385, baseY - 146, 58, 58, 4));

  // High center island with a tall mixed-material tower.
  add(505, baseY - 205, 135, 18, 'ice', true);
  add(530, baseY - 277, 18, 72, 'wood');
  add(600, baseY - 277, 18, 72, 'wood');
  add(522, baseY - 295, 105, 18, 'wood');
  add(548, baseY - 355, 18, 60, 'ice');
  add(590, baseY - 355, 18, 60, 'ice');
  add(540, baseY - 373, 78, 18, 'ice');
  politicians.push(makePolitician(548, baseY - 340, 58, 58, 0));
  politicians.push(makePolitician(548, baseY - 262, 58, 58, 5));

  // Right island with a narrow TNT-protected ice tower.
  add(680, baseY - 128, 100, 16, 'wood', true);
  add(700, baseY - 200, 16, 72, 'ice');
  add(750, baseY - 200, 16, 72, 'ice');
  add(692, baseY - 218, 82, 18, 'wood');
  add(724, baseY - 244, 26, 26, 'tnt');
  politicians.push(makePolitician(705, baseY - 186, 58, 58, 6));
}

function buildCliffFortress(blocks, politicians, makeBlock, makePolitician, baseY) {
  const add = (x, y, width, height, style) => blocks.push(makeBlock(x, y, width, height, style));

  // Low central platform: one exposed target and a TNT trigger.
  add(470, baseY - 18, 128, 18, 'ice');
  add(478, baseY - 78, 18, 60, 'ice');
  add(560, baseY - 78, 18, 60, 'ice');
  add(470, baseY - 96, 118, 18, 'wood');
  politicians.push(makePolitician(492, baseY - 76, 58, 58, 2));
  add(525, baseY - 122, 28, 26, 'tnt');

  // The main reinforced tower, built in three unstable but connected tiers.
  add(605, baseY - 18, 166, 18, 'wood');
  add(618, baseY - 98, 18, 80, 'ice');
  add(676, baseY - 98, 18, 80, 'stone');
  add(738, baseY - 98, 18, 80, 'ice');
  add(608, baseY - 116, 158, 18, 'wood');
  politicians.push(makePolitician(627, baseY - 76, 58, 58, 3));
  politicians.push(makePolitician(704, baseY - 76, 58, 58, 6));

  add(620, baseY - 196, 18, 80, 'ice');
  add(695, baseY - 196, 18, 80, 'stone');
  add(750, baseY - 196, 18, 80, 'ice');
  add(612, baseY - 214, 164, 18, 'wood');
  politicians.push(makePolitician(638, baseY - 194, 58, 58, 0));
  politicians.push(makePolitician(710, baseY - 194, 58, 58, 5));
  add(665, baseY - 142, 28, 26, 'tnt');

  add(642, baseY - 282, 18, 68, 'ice');
  add(724, baseY - 282, 18, 68, 'ice');
  add(634, baseY - 300, 116, 18, 'wood');
  add(675, baseY - 326, 34, 26, 'stone');
  politicians.push(makePolitician(662, baseY - 280, 58, 58, 1));
}

function buildSchoolyard(blocks, politicians, makeBlock, makePolitician, baseY) {
  const add = (x, y, width, height, style, anchored = false) => {
    const block = makeBlock(x, y, width, height, style);
    block.anchored = anchored;
    blocks.push(block);
  };

  // A low, easy-to-hit ice wall opens the schoolyard layout.
  [288, 322, 356, 390, 424].forEach(x => add(x, baseY - 20, 30, 20, 'ice'));
  add(304, baseY - 82, 18, 62, 'ice');
  add(400, baseY - 82, 18, 62, 'ice');
  add(296, baseY - 100, 130, 18, 'wood');
  politicians.push(makePolitician(334, baseY - 80, 58, 58, 4));
  add(352, baseY - 126, 28, 26, 'tnt');

  // Central classroom with a wide roof and two exposed targets.
  add(450, baseY - 18, 172, 18, 'ice');
  add(462, baseY - 88, 18, 70, 'wood');
  add(530, baseY - 88, 18, 70, 'wood');
  add(596, baseY - 88, 18, 70, 'wood');
  add(452, baseY - 106, 170, 18, 'wood');
  politicians.push(makePolitician(470, baseY - 86, 58, 58, 0));
  politicians.push(makePolitician(548, baseY - 86, 58, 58, 5));
  add(478, baseY - 166, 18, 60, 'ice');
  add(578, baseY - 166, 18, 60, 'ice');
  add(468, baseY - 184, 138, 18, 'wood');
  add(514, baseY - 210, 46, 26, 'stone');
  politicians.push(makePolitician(510, baseY - 164, 58, 58, 2));

  // Tall classroom tower on the right, matching the stacked reference silhouette.
  add(640, baseY - 18, 132, 18, 'wood');
  add(650, baseY - 94, 18, 76, 'ice');
  add(704, baseY - 94, 18, 76, 'stone');
  add(752, baseY - 94, 18, 76, 'ice');
  add(642, baseY - 112, 132, 18, 'wood');
  politicians.push(makePolitician(657, baseY - 92, 58, 58, 6));
  politicians.push(makePolitician(714, baseY - 92, 52, 52, 3));
  add(662, baseY - 188, 18, 76, 'ice');
  add(735, baseY - 188, 18, 76, 'ice');
  add(654, baseY - 206, 108, 18, 'wood');
  politicians.push(makePolitician(678, baseY - 186, 58, 58, 1));
  add(690, baseY - 232, 28, 26, 'tnt');

  // Suspended apple-and-balloon targets are breakable bonus objects.
  [
    { x: 362, y: 118 },
    { x: 407, y: 82 },
    { x: 450, y: 112 }
  ].forEach(({ x, y }) => {
    add(x - 9, y - 8, 18, 18, 'apple', true);
    add(x - 7, y + 16, 14, 20, 'balloon', true);
  });
}

export function buildLevelStructures(level, canvasWidth, baseY, makeBlock, makePolitician) {
  const blocks = [];
  const politicians = [];

  if (level.floating) {
    buildFloatingIslands(blocks, politicians, makeBlock, makePolitician, baseY);
  } else if (level.school) {
    buildSchoolyard(blocks, politicians, makeBlock, makePolitician, baseY);
  } else if (level.cliff) {
    buildCliffFortress(blocks, politicians, makeBlock, makePolitician, baseY);
  } else if (level.desert) {
    buildDesertRuins(blocks, politicians, makeBlock, makePolitician, baseY);
  } else if (level.pyramid) {
    buildPyramid(blocks, politicians, makeBlock, makePolitician, baseY);
  } else {
    level.towers.forEach(tower => {
      buildTower(blocks, politicians, makeBlock, makePolitician, tower.x * canvasWidth, baseY, tower.style, tower.tier || 0, tower.look);
    });
  }

  (level.tnt || []).forEach(x => buildTntStack(blocks, makeBlock, x * canvasWidth, baseY));

  politicians.forEach(politician => {
    const footY = politician.y + politician.h;
    const hasPlatform = blocks.some(block =>
      Math.min(block.x + block.w, politician.x + politician.w) - Math.max(block.x, politician.x) >= politician.w / 2 &&
      Math.abs(block.y - footY) <= 1
    );

    if (footY < baseY - 1 && !hasPlatform) {
      const platform = makeBlock(politician.x - 4, footY, politician.w + 8, 12, 'ice');
      platform.anchored = true;
      blocks.push(platform);
    }
  });

  return { blocks, politicians };
}