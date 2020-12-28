import React, {useState} from 'react';
import Board from './board-component.js';
import ServiceGame from '../../services/serviceGame.js';

function Game(props) {
  const maxRow = props.maxRow;
  const maxCol = props.maxCol;
  const length = maxRow * maxCol;
  const winCondition = props.winCondition;
  const [history, setHistory] = useState([{
      squares: Array(length).fill(null),
      rowNumber: 0,
      colNumber: 0,
      winner: null,
  }]);

  const [stepNumber, setStepNumber] = useState(0);

  const [xIsNext, setXIsNext] = useState(true);

  const [sortOrder, setSortOrder] = useState(0);

  const handleClick = (i) => {
    const historySlice = history.slice(0, stepNumber + 1);
    const current = historySlice[historySlice.length - 1];
    const squares = current.squares.slice();
    

    if (squares[i] != null || current.winner != null) {
      return;
    }
    
    if (xIsNext === true) {
      squares[i] = 'X';
    }
    else {
      squares[i] = 'O';
    }

    const winner = ServiceGame.calculateWinner(squares, winCondition, maxRow, maxCol, i);

    setHistory([...historySlice, {squares:squares, rowNumber: (i - (i % maxRow)) / maxRow, colNumber: i % maxCol, winner: winner }]);
    setStepNumber(historySlice.length);
    setXIsNext(!xIsNext);
  }

  const jumpTo = (move) => {
      setStepNumber(move);
      setXIsNext((move % 2)===0);
  }

  const sortMoves = () => {
    const order = 1 - sortOrder;
    setSortOrder(order);
  }

  const renderMoves = () => {
    const historySlice = history.slice();
    let moves;
    if (sortOrder === 0) {
      moves = historySlice.map((step, move) => {
        const desc = move ?
          'Move #' + move + ` (${step.rowNumber}, ${step.colNumber})` :
          'Game start';
        return (
            <li key={move}
            style={{'fontWeight': stepNumber === move ? 'bold' : 'normal'}}>
              <button onClick={() => jumpTo(move)}
               style={{'fontWeight': stepNumber === move ? 'bold' : 'normal'}}>{desc}</button>
            </li>
          );
        });
      }
      else {
        historySlice.reverse();
        moves = historySlice.map((step, move) => {
          const index = historySlice.length - move - 1;
          
          const desc = index ?
            'Move #' + index + ` (${step.rowNumber}, ${step.colNumber})` :
            'Game start';
          return (
            <li key={index}
            style={{'fontWeight': stepNumber === index ? 'bold' : 'normal'}}>
              <button onClick={() => jumpTo(index)}
               style={{'fontWeight': stepNumber === index ? 'bold' : 'normal'}}>{desc}</button>
            </li>
          );
        })
      }
      return moves;
    }
    
    const current = history[stepNumber];

    const winner = current.winner;

    const moves = renderMoves();

    let status;
      
    if (winner) {
      status = 'Winner: ' + winner.winner;
    } else {
      if (stepNumber < length - 1) {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
      }
      else {
        status = "Draw";
      }
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            maxRow = {props.maxRow}
            maxCol = {props.maxCol}
            winnerHighLight = {winner ? winner.highlight : []}
            onClick={(i) => handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button
           onClick = {() => sortMoves()}>
             Sort moves
          </button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
}

export default Game;

