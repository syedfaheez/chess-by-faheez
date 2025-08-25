import type { Mode, Settings } from '../domain/types';
export function GameControls({ mode, setMode, settings, setSettings, onReset }:
  { mode: Mode; setMode: (m: Mode) => void; settings: Settings; setSettings: (s: Settings) => void; onReset: () => void; }) {
  return (
    <div style={{ display: 'grid', gap: '.75rem' }}>
      <div>
        <label>Mode:&nbsp;</label>
        <select value={mode} onChange={e => setMode(e.target.value as Mode)}>
          <option value="local">Local: Friend</option>
          <option value="ai">vs AI (minimax)</option>
          <option value="online" disabled>Online (coming soon)</option>
        </select>
      </div>
      <div>
        <label>AI Depth:&nbsp;</label>
        <input type="number" min={1} max={4} value={settings.aiDepth}
          onChange={e => setSettings({ ...settings, aiDepth: Number(e.target.value) })} />
      </div>
      <div>
        <label><input type="checkbox" checked={settings.flipBoard}
          onChange={e => setSettings({ ...settings, flipBoard: e.target.checked })} />&nbsp;Flip Board</label>
      </div>
      <div style={{ display: 'flex', gap: '.5rem' }}>
        <button onClick={onReset}>New Game</button>
      </div>
    </div>
  );
}
