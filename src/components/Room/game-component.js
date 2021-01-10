import React, { useCallback, useEffect, useState } from 'react';
import Board from './board-component.js';
import ServiceGame from '../../services/serviceGame';
import io from "socket.io-client";
import socket from '../../services/socket';
import { useGame } from '../../contexts/game.js';
import Axios from 'axios';
import API from '../../services/api.js';
import { Container } from '@material-ui/core';


function Game() {

  const { room, game } = useGame();

  let winnerMessage;


  // const fetchData = useCallback(async () => {
  //   if (game.winner !== 0) {
  //     if (game)
  //   }

  //   const username = await Axios.get(API.url + `/api/game/`)
  // }, []);

  // // useEffect(() => {
  // //   fetchData();
  // // }, [fetchData])

  switch (game.winner) {
    case 1:
      winnerMessage = `${room.Player1.username} has won`;
      break;

    case 2:
      winnerMessage = `${room.Player2.username} has won`;
      break;
  
    case 3:
      winnerMessage = "Tie, both have won";
      break;
    
    default:
      break;
  }

  let nextTurnUser = "";
  if (game.playerMoveNext === 1) {
    nextTurnUser = room.Player1.username;
  }
  else {
    nextTurnUser = room.Player2.username;
  }
  let userTurnMessage = `It's turn of: ${nextTurnUser}`;


  // const [socket, setSocket] = useState();

  // useEffect(() => {
  //   setSocket(io.connect(API.url));
  //   console.log(props.game);
  // }, []);

  // useEffect(() => () => {
  //   // socket.disconnect();
  // },[])

  return (

    <div className="game">
      <Container>
        <h1>{winnerMessage}</h1>
        <div>{userTurnMessage}</div>
        <div className="game-board">
          <Board />
        </div>
      </Container>

    </div>
  );
}

export default Game;

