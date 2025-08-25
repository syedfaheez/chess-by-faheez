import { Chess } from 'chess.js';

export function materialScore(game: Chess): number {
  const values: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
  let score = 0;
  for (const sq of game.board().flat()) {
    if (!sq) continue;
    const v = values[sq.type];
    score += sq.color === 'w' ? v : -v;
  }
  return score;
}
