import React, { useState } from 'react';
import './ProfileDialog.css';

export default function ProfileDialog({ onStart }) {
  const [name, setName] = useState(localStorage.getItem('zogjte-player-name') || '');

  function submit(event) {
    event.preventDefault();
    const playerName = name.trim();
    if (!playerName) return;
    localStorage.setItem('zogjte-player-name', playerName);
    onStart(playerName);
  }

  return (
    <main className="profile-screen">
      <section className="profile-dialog" aria-labelledby="profile-title">
        <div className="profile-badge" aria-hidden="true">🦩</div>
        <div className="profile-copy">
          <p>PROFILI I LOJTARIT</p>
          <h1 id="profile-title">Si quhesh?</h1>
          <form onSubmit={submit}>
            <input id="player-name" aria-label="Emri" value={name} onChange={(event) => setName(event.target.value)} maxLength="20" autoFocus />
            <button type="submit" disabled={!name.trim()}>Fillo lojën</button>
          </form>
        </div>
      </section>
    </main>
  );
}