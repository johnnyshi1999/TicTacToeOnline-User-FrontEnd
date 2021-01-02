import React, {useEffect, useState} from 'react';
import Board from './board-component.js';
import ServiceGame from '../services/serviceGame.js';
import io from "socket.io-client";
import API from "../services/api";
import socket from '../services/socket';


function Game(props) {

  const game = props.game;
  const maxRow = props.game.maxRow;
  const maxCol = props.game.maxCol;
  const length = maxRow * maxCol;
  console.log(length);
  const winCondition = props.game.winCondition;
  const [history, setHistory] = useState([{
      squares: Array(25).fill(null),
      rowNumber: 0,
      colNumber: 0,
      winner: null,
  }]);

  const [stepNumber, setStepNumber] = useState(0);

  const [xIsNext, setXIsNext] = useState(true);

  const [sortOrder, setSortOrder] = useState(0);

  // const [socket, setSocket] = useState();

  // useEffect(() => {
  //   setSocket(io.connect(API.url));
  //   console.log(props.game);
  // }, []);

  // useEffect(() => () => {
  //   // socket.disconnect();
  // },[])

  const handleClick = (i) => {
    const historySlice = history.slice(0, stepNumber + 1);
    const current = historySlice[historySlice.length - 1];
    const squares = current.squares.slice();
    

    if (squares[i] != null || current.winner != null) {
      return;
    }
    
    if (xIsNext === true) {
      squares[i] = 'X';
      socket.emit("make-move", {gameId: game._id, player: 1, position: i})
    }
    else {
      squares[i] = 'O';
      socket.emit("make-move", {gameId: game._id, player: 2, position: i})
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
            maxRow = {maxRow}
            maxCol = {maxCol}
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

