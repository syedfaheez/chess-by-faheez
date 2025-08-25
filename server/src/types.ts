export type RoomId = string;
export interface ServerToClientEvents {
  room_joined: { roomId: RoomId };
  start_position: { fen: string };
  move_made: { san: string; fen: string };
  status: { message: string };
}
export interface ClientToServerEvents {
  join_room: { roomId: RoomId };
  make_move: { roomId: RoomId; san: string };
  new_game: { roomId: RoomId };
}
