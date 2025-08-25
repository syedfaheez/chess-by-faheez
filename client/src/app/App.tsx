import Board from '../components/Board';
import { GameControls } from '../components/GameControls';
import { StatusBar } from '../components/StatusBar';
import { useGame } from '../hooks/useGame';
import '../styles/index.css';

export default function App() {
  const { mode, setMode, settings, setSettings, fen, onDrop, reset, status } = useGame('ai');
  return (
    <div className="container">
      <div className="topbar">
        <h1 style={{ margin: 0 }}>Chess by Faheez</h1>
        <a href="https://github.com/syedfaheez/chess-by-faheez" target="_blank">GitHub</a>
      </div>
      <div className="grid">
        <div className="card"><Board fen={fen} onDrop={onDrop} flip={settings.flipBoard} /></div>
        <div className="card" role="complementary">
          <GameControls mode={mode} setMode={setMode} settings={settings} setSettings={setSettings} onReset={reset} />
          <hr />
          <StatusBar text={status} />
          <p style={{ fontSize: '.9rem', opacity: .8 }}>Tip: Use AI depth 2–3 for instant moves, 4 for stronger play.</p>
        </div>
      </div>
    </div>
  );
}
