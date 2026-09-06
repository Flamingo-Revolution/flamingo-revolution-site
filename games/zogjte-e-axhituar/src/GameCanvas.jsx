import React, { useEffect, useRef, useState } from 'react';
import { createGame, BIRD_TYPES } from './game/engine.js';
import BirdGuide from './BirdGuide.jsx';
import Leaderboard from './Leaderboard.jsx';
import { fetchLeaderboard, saveScore } from './leaderboardService.js';
import './GameCanvas.css';

export default function GameCanvas({ playerName, onExit }) {
  const frameRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const scoreRef = useRef(0);
  const finalScoreSavedRef = useRef(false);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('zogjte-high-score')) || 0);
  const [level, setLevel] = useState({ current: 1, total: 1 });
  const [birdsLeft, setBirdsLeft] = useState(0);
  const [enemiesLeft, setEnemiesLeft] = useState(0);
  const [currentBirdType, setCurrentBirdType] = useState(null);
  const [showStartTips, setShowStartTips] = useState(true);
  const [queue, setQueue] = useState([]);
  const [message, setMessage] = useState({ visible: false, text: '', action: null });
  const [showBirdGuide, setShowBirdGuide] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  function showLeaderboard(finalScore = scoreRef.current) {
    if (finalScoreSavedRef.current) return;
    finalScoreSavedRef.current = true;
    const savedScores = JSON.parse(localStorage.getItem('zogjte-leaderboard') || '[]');
    const scores = [...savedScores, { name: playerName, score: finalScore }].sort((first, second) => second.score - first.score).slice(0, 10);
    localStorage.setItem('zogjte-leaderboard', JSON.stringify(scores));
    setLeaderboard(scores);

    void (async () => {
      try {
        const savedOnline = await saveScore(playerName, finalScore);
        if (!savedOnline) return;

        const onlineScores = await fetchLeaderboard();
        if (onlineScores) setLeaderboard(onlineScores);
      } catch (error) {
        console.error('Unable to save the online leaderboard score.', error);
      }
    })();
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = createGame(canvas, {
      onScore: (nextScore) => {
        scoreRef.current = nextScore;
        setScore(nextScore);
      },
      onLevel: (current, total) => setLevel({ current, total }),
      onBirds: setBirdsLeft,
      onEnemies: setEnemiesLeft,
      onCurrentBird: setCurrentBirdType,
      onHint: () => {},
      onQueue: setQueue,
      onMessage: (nextMessage) => {
        setMessage(nextMessage);
        if (nextMessage.visible && nextMessage.action === 'finish') showLeaderboard();
      },
    });
    engineRef.current = engine;
    return () => engine.destroy();
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    const updateScale = () => {
      const scale = frame.clientWidth / 800;
      if (!scale) return;

      frame.style.setProperty('--ui-scale', String(scale));
    };
    const observer = new ResizeObserver(updateScale);

    updateScale();
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (score <= highScore) return;
    setHighScore(score);
    localStorage.setItem('zogjte-high-score', String(score));
  }, [score, highScore]);

  return (
    <div className="game-frame" ref={frameRef}>
      <canvas ref={canvasRef} />
      <div className="game-ui">
      <div className="score-board" aria-label={`Rezultati ${score}, rekordi ${Math.max(highScore, score)}`}>
        <div className="score-row"><span>HIGHSCORE:</span><strong>{Math.max(highScore, score)}</strong></div>
        <div className="score-row"><span>SCORE:</span><strong>{score}</strong></div>
      </div>
      <div className="hud">
        <svg className="vine" viewBox="0 0 160 130" width="160" height="130">
          <path
            d="M -10,-10 C 30,-4 55,10 50,34 C 46,54 20,54 22,74 C 24,94 52,92 62,78"
            stroke="#5f9a45" strokeWidth="9" fill="none" strokeLinecap="round"
          />
          <path
            d="M 30,4 C 22,-4 8,-6 0,2" stroke="#5f9a45" strokeWidth="7" fill="none" strokeLinecap="round"
          />
          <ellipse cx="-2" cy="1" rx="9" ry="5" fill="#6fae52" transform="rotate(-25 -2 1)" />
        </svg>

        <div className="bird-avatar">
          <span className="avatar-icon">{currentBirdType ? BIRD_TYPES[currentBirdType].icon : ''}</span>
          <span className="bird-count">{birdsLeft}</span>
          {currentBirdType && (
            <div className="bird-tip">
              <strong>{BIRD_TYPES[currentBirdType].name}</strong>
              <span>{BIRD_TYPES[currentBirdType].info}</span>
            </div>
          )}
        </div>

        <div className="level-trail">
          {Array.from({ length: level.total }).map((_, i) => (
            <span
              key={i}
              className={
                'level-dot' +
                (i + 1 === level.current ? ' current' : i + 1 < level.current ? ' done' : '')
              }
            />
          ))}
        </div>

        <div className="bird-queue-mini">
          {queue.map((type, i) => (
            <div className="mini-bird" key={i}>
              {BIRD_TYPES[type].icon}
              <div className="bird-tip">
                <strong>{BIRD_TYPES[type].name}</strong>
                <span>{BIRD_TYPES[type].info}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="bird-guide-button" onClick={() => setShowBirdGuide(true)} aria-label="Shiko llojet e zogjve" title="Llojet e zogjve">🦩</button>
      <button className="restart" onClick={() => engineRef.current?.restart()} aria-label="Rifillo nivelin" title="Rifillo nivelin">↻</button>
      {showStartTips && (
        <div className="tip-backdrop" role="dialog" aria-modal="true" aria-label="Këshilla dhe udhëzime">
          <section className="tip-dialog">
            <button className="tip-close" onClick={() => setShowStartTips(false)} aria-label="Mbyll udhëzimet" title="Mbyll">×</button>
            <div className="tip-copy">
              <p className="tip-eyebrow">KËSHILLA & UDHËZIME</p>
              <h2>Si luhet</h2>
              <table className="tips-table">
                <tbody>
                  <tr><th>Hidhe zogun</th><td>Tërhiq zogun nga llastiqja dhe lëshoje.</td></tr>
                  <tr><th>Çafka e hirtë</th><td>Trokit në ajër për shpejtësi shtesë.</td></tr>
                  <tr><th>Synimi</th><td>Rrëzo strukturat dhe kundërshtarët.</td></tr>
                </tbody>
              </table>
            </div>
            <div className="tip-accent" aria-hidden="true">🦩</div>
          </section>
        </div>
      )}
      {message.visible && leaderboard.length === 0 && (
        <div className="result-backdrop" role="dialog" aria-modal="true" aria-label="Përmbledhja e nivelit">
          <section className="result-dialog">
            <div className="result-copy">
              <p className="result-eyebrow">PIKËT E NIVELIT</p>
              <strong className="result-score">{score}</strong>
              <div className="result-actions">
                <button className="result-restart" onClick={() => engineRef.current?.restart()}>Rifillo</button>
                <button className="result-continue" onClick={() => engineRef.current?.confirmMessage(message.action)}>
                  {message.action === 'retry' ? 'Riprovo' : message.action === 'finish' ? 'Fillo nga e para' : 'Vazhdo'}
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
      {leaderboard.length > 0 && <Leaderboard scores={leaderboard} onPlayAgain={onExit} />}
      {showBirdGuide && <BirdGuide onClose={() => setShowBirdGuide(false)} />}
      </div>
    </div>
  );
}
