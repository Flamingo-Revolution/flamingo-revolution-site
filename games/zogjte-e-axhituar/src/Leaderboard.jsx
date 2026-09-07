import React from 'react';

export default function Leaderboard({ scores, onPlayAgain }) {
  return (
    <div className="leaderboard-backdrop" role="dialog" aria-modal="true" aria-label="Leaderboard">
      <section className="leaderboard-dialog">
        <p className="result-eyebrow">LEADERBOARD</p>
        <h2>Top lojtarët</h2>
        <ol>
          {scores.map((entry, index) => <li key={`${entry.name}-${entry.score}-${index}`}><span>{index + 1}. {entry.name}</span><strong>{entry.score}</strong></li>)}
        </ol>
        <button className="result-continue leaderboard-play-again" onClick={onPlayAgain}>Luaj përsëri</button>
      </section>
    </div>
  );
}