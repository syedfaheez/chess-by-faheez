import { Chessboard } from 'react-chessboard';
import { useMemo } from 'react';

export default function Board({ fen, onDrop, flip }:
  { fen: string; onDrop: (from: any, to: any) => boolean; flip: boolean; }) {
  const boardOrientation = flip ? 'black' : 'white';
  const customBoardStyle = useMemo(() => ({ borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,.15)' }), []);
  return (
    <Chessboard position={fen} onPieceDrop={onDrop} customBoardStyle={customBoardStyle}
      boardOrientation={boardOrientation as any} animationDuration={150} />
  );
}
