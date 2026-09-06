import React, { useEffect, useRef } from 'react';
import { BIRD_TYPES, POL_LOOKS } from './game/config.js';
import { drawBird } from './game/birdRenderer.js';
import { drawPolitician } from './game/politicians.js';
import './StartScreen.css';

const birds = [
  { type: 'pelican', className: 'pelican' },
  { type: 'flamingo', className: 'flamingo' },
  { type: 'heron', className: 'heron' }
];

function BirdPreview({ type }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const birdType = BIRD_TYPES[type];
    const radius = birdType.r * 2.2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBird(ctx, {
      x: canvas.width / 2 - radius * 0.08,
      y: canvas.height / 2 + radius * 0.08,
      r: radius,
      type,
      alive: true,
      boosted: false
    });
  }, [type]);

  return <canvas className="start-bird-canvas" ref={canvasRef} width="220" height="190" aria-hidden="true" />;
}

function PoliticianPreview({ look }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPolitician(ctx, { x: 8, y: 4, w: 104, h: 112, look, alive: true, expression: 'sad' });
  }, [look]);

  return <canvas className="opponent-canvas" ref={canvasRef} width="120" height="120" aria-hidden="true" />;
}

export default function StartScreen({ onPlay }) {
  return (
    <main className="start-screen">
      <div className="start-sky" />
      <div className="start-cloud cloud-one" />
      <div className="start-cloud cloud-two" />
      <div className="start-cloud cloud-three" />
      <div className="start-ruins ruin-left" />
      <div className="start-ruins ruin-right" />
      <section className="start-content" aria-label="Zogjtë e Axhituar">
        <h1><span>Zogjtë</span> <span>e Axhituar</span></h1>
        <div className="start-birds" aria-label="Zogjtë e lojës">
          {birds.map(({ type, className }) => (
            <div className={`start-bird ${className}`} key={type} title={BIRD_TYPES[type].name}>
              <BirdPreview type={type} />
            </div>
          ))}
        </div>
        <button className="play-button" onClick={onPlay} aria-label="Luaj">
          <span>L</span><span>U</span><span>A</span><span>J</span>
        </button>
      </section>
      <aside className="opponents" aria-label="Kundërshtarët">
        {POL_LOOKS.slice(0, 6).map((politician, index) => (
          <div className={`opponent opponent-${index}`} key={politician.type} title={politician.name}>
            <PoliticianPreview look={index} />
          </div>
        ))}
      </aside>
    </main>
  );
}