import React, { useEffect, useRef } from 'react';
import { BIRD_TYPES } from './game/config.js';
import { drawBird } from './game/birdRenderer.js';

const birds = [
  { type: 'pelican', ability: 'Goditje e rëndë', description: 'Thyen dru dhe rrëzon struktura të rënda.' },
  { type: 'flamingo', ability: 'Kërcim elastik', description: 'Rikthehet pas goditjes për të goditur përsëri.' },
  { type: 'heron', ability: 'Shpejtësi në ajër', description: 'Aktivoje gjatë fluturimit për një shtysë të fortë.' }
];

function BirdPreview({ type }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const bird = BIRD_TYPES[type];
    const radius = bird.r * 2.2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBird(ctx, { x: 102, y: 102, r: radius, type, alive: true, boosted: false });
  }, [type]);

  return <canvas className="guide-bird-canvas" ref={canvasRef} width="220" height="190" aria-hidden="true" />;
}

export default function BirdGuide({ onClose }) {
  return (
    <div className="bird-guide-backdrop" role="dialog" aria-modal="true" aria-label="Llojet e zogjve">
      <section className="bird-guide">
        <button className="guide-close" onClick={onClose} aria-label="Mbyll udhëzuesin" title="Mbyll">×</button>
        <header className="guide-header">
          <h2>Zogjtë e Axhituar</h2>
          <p>Aftësitë dhe faktet e zogjve</p>
        </header>
        <div className="guide-roster">
          {birds.map(({ type, ability, description }) => (
            <article className="guide-card" key={type}>
              <div className="guide-ribbon">{BIRD_TYPES[type].name}</div>
              <div className="guide-portrait"><BirdPreview type={type} /></div>
              <div className="guide-details">
                <h3>{BIRD_TYPES[type].name}</h3>
                <h4>{ability}</h4>
                <p>{description}</p>
                <p className="guide-fact">{BIRD_TYPES[type].info}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}