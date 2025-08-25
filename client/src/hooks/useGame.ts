import { useMemo, useState } from 'react';
import { Chess, Square } from 'chess.js';
import { bestMoveMinimax } from '../domain/ai';
import type { Mode, Settings } from '../domain/types';

export function useGame(initialMode: Mode = 'ai') {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [settings, setSettings] = useState<Settings>({ aiDepth: 2, flipBoard: false });
  const [chess] = useState(() => new Chess());
  const [fen, setFen] = useState(chess.fen());
  const [status, setStatus] = useState('White to move');

  const updateStatus = () => {
    if (chess.isGameOver()) {
      if (chess.isCheckmate()) setStatus(chess.turn() === 'w' ? 'Black wins by checkmate' : 'White wins by checkmate');
      else if (chess.isDraw()) setStatus('Draw');
      else setStatus('Game over');
    } else setStatus(chess.turn() === 'w' ? 'White to move' : 'Black to move');
  };

  const onDrop = (from: Square, to: Square) => {
    const move = chess.move({ from, to, promotion: 'q' });
    if (!move) return false;
    setFen(chess.fen()); updateStatus();

    if (mode === 'ai' && !chess.isGameOver()) {
      setTimeout(() => {
        const san = bestMoveMinimax(chess.fen(), settings.aiDepth);
        if (san) { chess.move(san); setFen(chess.fen()); updateStatus(); }
      }, 120);
    }
    return true;
  };

  const reset = () => { chess.reset(); setFen(chess.fen()); updateStatus(); };

  return useMemo(() => ({ mode, setMode, settings, setSettings, fen, onDrop, reset, chess, status }),
    [mode, settings, fen, status]);
}
