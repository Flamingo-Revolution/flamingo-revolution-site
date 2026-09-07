import React from 'react';
import ScoreShare from './ScoreShare.jsx';

export default function Leaderboard({ scores, finalScore, onPlayAgain }) {
  return (
    <div className="leaderboard-backdrop" role="dialog" aria-modal="true" aria-label="Leaderboard">
      <section className="leaderboard-dialog">
        <p className="result-eyebrow">LEADERBOARD</p>
        <h2>Top lojtarët</h2>
        {finalScore !== null && <ScoreShare score={finalScore} scores={scores} />}
        {finalScore !== null && !scores.some((entry) => entry.isCurrentPlayer) && (
          <p className="current-player-score"><span>Rezultati yt</span><strong>{finalScore}</strong></p>
        )}
        <ol>
          {scores.map((entry, index) => (
            <li
              key={`${entry.name}-${entry.score}-${index}`}
              className={entry.isCurrentPlayer ? 'is-current-player' : undefined}
              aria-current={entry.isCurrentPlayer ? 'true' : undefined}
            >
              <span>{index + 1}. {entry.name}{entry.isCurrentPlayer && <small>Ti</small>}</span>
              <strong>{entry.score}</strong>
            </li>
          ))}
        </ol>
        <button className="result-continue leaderboard-play-again" onClick={onPlayAgain}>Luaj përsëri</button>
      </section>
    </div>
  );
}
