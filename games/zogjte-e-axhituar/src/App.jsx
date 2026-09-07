import React, { useState } from 'react';
import GameCanvas from './GameCanvas.jsx';
import ProfileDialog from './ProfileDialog.jsx';
import StartScreen from './StartScreen.jsx';

export default function App() {
  const [playing, setPlaying] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [playerName, setPlayerName] = useState('');

  if (playing) return <GameCanvas playerName={playerName} onExit={() => setPlaying(false)} />;
  if (registering) return <ProfileDialog onStart={(name) => { setPlayerName(name); setPlaying(true); }} />;
  return <StartScreen onPlay={() => setRegistering(true)} />;
}
