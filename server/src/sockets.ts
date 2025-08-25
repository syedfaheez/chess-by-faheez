import { Server } from 'socket.io';
import type { ClientToServerEvents, ServerToClientEvents } from './types.js';
import { Chess } from 'chess.js';

export function attachSockets(io: Server<ClientToServerEvents, ServerToClientEvents>) {
  const games = new Map<string, Chess>();

  io.on('connection', socket => {
    socket.on('join_room', ({ roomId }) => {
      socket.join(roomId);
      if (!games.has(roomId)) games.set(roomId, new Chess());
      socket.emit('room_joined', { roomId });
      socket.emit('start_position', { fen: games.get(roomId)!.fen() });
    });

    socket.on('new_game', ({ roomId }) => {
      const g = new Chess();
      games.set(roomId, g);
      io.to(roomId).emit('start_position', { fen: g.fen() });
      io.to(roomId).emit('status', { message: 'New game started' });
    });

    socket.on('make_move', ({ roomId, san }) => {
      const g = games.get(roomId);
      if (!g) return;
      const move = g.move(san, { sloppy: true });
      if (move) {
        io.to(roomId).emit('move_made', { san: move.san, fen: g.fen() });
        if (g.isGameOver()) io.to(roomId).emit('status', { message: 'Game over' });
      } else {
        socket.emit('status', { message: 'Illegal move' });
      }
    });
  });
}
