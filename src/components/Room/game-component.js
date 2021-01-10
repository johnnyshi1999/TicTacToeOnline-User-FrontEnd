import React, { useCallback, useEffect, useState } from 'react';
import Board from './board-component.js';
import ServiceGame from '../../services/serviceGame';
import io from "socket.io-client";
import socket from '../../services/socket';
import { useGame } from '../../contexts/game.js';
import Axios from 'axios';
import API from '../../services/api.js';


function Game() {

  const { game } = useGame();

  const [winnerMessage, setWinnerMessage] = useState("");

  const [playerNameTurn, setPlayerNameTurn] = useState("");

  // const fetchData = useCallback(async () => {
  //   if (game.winner !== 0) {
  //     const result = await Axios.get(API.url + `/api/game/${game._id}/getWinner`);

  //     if (result.data.announcement) {
  //       setWinnerMessage(result.data.announcement);
  //     }
  //   }

  //   const username = await Axios.get(API.url + `/api/game/`)
  // }, []);

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData])

  const userTurnMessage = `It's turn of: ${playerNameTurn}`;


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
      <h1>{winnerMessage}</h1>
      <div>{userTurnMessage}</div>
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

export default Game;

