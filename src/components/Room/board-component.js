import React from 'react';
import { useGame } from '../../contexts/game.js';
import Square from './square-component.js'

function Board() {
  const { game, gameActions } = useGame();

  const maxRow = game.maxRow;
  const maxCol = game.maxCol;

  
  const board = [];
  const renderSquare = (i) => {
    let value = "";

    if (game.board[i] === 1) {
      value = "X";
    }
    if (game.board[i] === 2) {
      value = "O";
    }

    return <Square key={i} value={value} squareIndex = {i}/>;
  }

  for (let i = 0; i < maxRow; i++) {
    const cols = [];

    for (let j = 0; j < maxCol; j++) {
      cols.push(renderSquare(i * maxRow + j));
    }

    board.push(
      <div className="board-row">
        {cols}
      </div>);
  }

  console.log(board);

  return (
    <div>
      {board}
    </div>
  );
}

export default Board;