import { drawBird } from './game/birdRenderer.js';
export const gameUrl = 'https://www.flamingorevolution.eu/lojerat/zogjte-e-axhituar/';
export function scoreCaption(score, scores, leaderboard) {
  return leaderboard
    ? `Zogjtë e Axhituar — Renditja\n${scores.slice(0, 10).map((p, i) => `${i + 1}. ${p.name}: ${p.score} pikë`).join('\n')}\nRezultati im: ${score} pikë`
    : `Mora ${score} pikë në Zogjtë e Axhituar! A e kalon dot rezultatin tim?`;
}
export async function createScoreCard(score, scores, leaderboard) {
  const c = document.createElement('canvas'); c.width = 1080; c.height = 1350;
  const x = c.getContext('2d');
  const gradient = x.createLinearGradient(0, 0, 1080, 1350);
  gradient.addColorStop(0, '#123f4a'); gradient.addColorStop(1, '#09242c');
  x.fillStyle = gradient; x.fillRect(0, 0, 1080, 1350);
  x.fillStyle = '#70d3d0'; x.beginPath(); x.arc(1010, 70, 300, 0, Math.PI * 2); x.fill();
  drawBird(x, { x: 875, y: 170, r: 92, type: 'flamingo', alive: true, boosted: false });
  x.textAlign = 'left'; x.fillStyle = '#ffda75'; x.font = 'bold 24px sans-serif';
  x.fillText('REVOLUCIONI FLAMINGO  /  KËNDI I LOJËRAVE', 64, 75);
  x.fillStyle = '#fff8eb'; x.font = 'bold 65px sans-serif';
  x.fillText('Zogjtë e', 64, 168); x.fillText('Axhituar', 64, 238);
  x.fillStyle = '#f38dae'; x.fillRect(64, 281, 88, 7);
  x.fillStyle = '#fff8eb'; x.font = 'bold 30px sans-serif';
  x.fillText(leaderboard ? 'RENDITJA • TOP 10' : 'REZULTATI IM', 64, 350);
  if (!leaderboard) {
    x.fillStyle = '#ffda75'; x.font = 'bold 175px sans-serif'; x.fillText(String(score), 64, 570, 940);
    x.fillStyle = '#fff8eb'; x.font = 'bold 36px sans-serif'; x.fillText('PIKË', 70, 635);
    x.font = 'bold 27px sans-serif'; x.fillText('NË KRYE TË RENDITJES', 64, 745);
  }
  scores.slice(0, leaderboard ? 10 : 3).forEach((entry, i) => {
    const y = (leaderboard ? 395 : 790) + i * 73;
    const isCurrentPlayer = Boolean(entry.isCurrentPlayer);
    x.fillStyle = isCurrentPlayer ? '#f38dae' : i === 0 ? '#ffda75' : '#204c56';
    x.fillRect(64, y, 952, 61);
    if (isCurrentPlayer) {
      x.strokeStyle = '#fff8eb'; x.lineWidth = 4; x.strokeRect(66, y + 2, 948, 57);
    }
    x.fillStyle = isCurrentPlayer || i === 0 ? '#12343c' : '#fff8eb'; x.font = 'bold 26px sans-serif';
    x.textAlign = 'left'; x.fillText(String(i + 1).padStart(2, '0'), 84, y + 40);
    x.fillText(`${String(entry.name).slice(0, 21)}${isCurrentPlayer ? '  • TI' : ''}`, 152, y + 40, 620);
    x.textAlign = 'right'; x.fillText(String(entry.score), 990, y + 40, 205);
  });
  x.textAlign = 'left'; x.fillStyle = '#fff8eb'; x.font = 'bold 30px sans-serif';
  x.fillText(leaderboard ? `Rezultati im: ${score} pikë` : 'A e kalon dot rezultatin tim?', 64, 1190, 950);
  x.fillStyle = '#70d3d0'; x.font = '22px sans-serif';
  x.fillText('flamingorevolution.eu/lojerat/zogjte-e-axhituar/', 64, 1260);
  return new Promise((resolve, reject) => c.toBlob(blob => blob ? resolve(blob) : reject(new Error('Image unavailable')), 'image/png'));
}
