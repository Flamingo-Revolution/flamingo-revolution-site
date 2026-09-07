export function drawParticles(ctx, particles) {
  particles.forEach(particle => {
    ctx.globalAlpha = Math.max(particle.life / 30, 0);
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

export function spawnBurst(particles, x, y, color) {
  for (let index = 0; index < 14; index++) {
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 1.2) * 8,
      r: 2 + Math.random() * 3,
      life: 25 + Math.random() * 10,
      color
    });
  }
}

export function blockColor(style) {
  if (style === 'ice' || style === 'iceroof') return '#a6ddf2';
  if (style === 'stone') return '#b6bdc2';
  if (style === 'tnt') return '#ff8c1a';
  if (style === 'apple') return '#d9302d';
  if (style === 'balloon') return '#f5ce45';
  return '#c8842a';
}