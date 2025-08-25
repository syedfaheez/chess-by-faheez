import { Chess } from 'chess.js';
import { materialScore } from './chess';

export function bestMoveMinimax(fen: string, depth = 2): string | null {
  const root = new Chess(fen);
  const maximizing = root.turn() === 'w';
  let alpha = -Infinity, beta = Infinity;
  let best: { san: string; score: number } | null = null;

  const ab = (node: Chess, d: number, a: number, b: number, max: boolean): number => {
    if (d === 0 || node.isGameOver()) return materialScore(node);
    const moves = node.moves({ verbose: true });
    if (max) {
      let val = -Infinity;
      for (const m of moves) { node.move(m); val = Math.max(val, ab(node, d-1, a, b, false)); node.undo(); a = Math.max(a, val); if (a >= b) break; }
      return val;
    } else {
      let val = Infinity;
      for (const m of moves) { node.move(m); val = Math.min(val, ab(node, d-1, a, b, true)); node.undo(); b = Math.min(b, val); if (a >= b) break; }
      return val;
    }
  };

  for (const m of root.moves({ verbose: true })) {
    root.move(m);
    const s = ab(root, depth - 1, alpha, beta, !maximizing);
    root.undo();
    if (!best || (maximizing ? s > best.score : s < best.score)) best = { san: m.san, score: s };
    if (maximizing) alpha = Math.max(alpha, s); else beta = Math.min(beta, s);
  }
  return best?.san ?? null;
}
