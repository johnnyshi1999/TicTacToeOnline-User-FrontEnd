import React from 'react';
import Square from './square-component.js'

function Board(props) {
    const maxRow = props.maxRow;
    const maxCol = props.maxCol;
    const board = [];
    const renderSquare = (i) => {
        return <Square 
              key = {i}
              value = {props.squares[i]}
              highlight = {props.winnerHighLight.includes(i)} 
              onClick = {() => props.onClick(i)}/>;
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

      return (
        <div>
          {board}
        </div>
      );
}

export default Board;