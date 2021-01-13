import React, { useCallback, useEffect, useState } from 'react';
import RewatchBoard from './rewatchBoard-component.js';
import ServiceGame from '../../services/serviceGame';
import io from "socket.io-client";
import socket from '../../services/socket';
import { useGame } from '../../contexts/game.js';
import Axios from 'axios';
import API from '../../services/api.js';
import { Button, ButtonBase, Container } from '@material-ui/core';
import PlayerCard from '../PlayerCard/playerCard-component.js';


function RewatchGame() {

  const { game } = useGame();

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
      winnerMessage = `${game.player1.username} has won`;
      break;

    case 2:
      winnerMessage = `${game.player2.username} has won`;
      break;

    case 3:
      winnerMessage = "Tie, both have won";
      break;

    default:
      break;
  }

  let nextTurnUser = "";
  if (game.playerMoveNext === 1) {
    nextTurnUser = game.player1.username;
  }
  else {
    nextTurnUser = game.player2.username;
  }

  useEffect(() => {
    if (socket) {
    }
  }, [])


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
        <div>
          <h1>{winnerMessage}</h1>
        </div>

        <div style={{ display: 'flex' }}>
          <div className="game-board">
            <RewatchBoard />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <PlayerCard
              username={game.player1.username}
              trophies={game.player1.trophies}
              won={game.player1.gamesWon}
              lost={game.player1.gamesLost}></PlayerCard>
            <div style={{ flexGrow: 1 }} />
            <div style={{ flexGrow: 1 }} />
            <PlayerCard
              username={game.player2.username}
              trophies={game.player2.trophies}
              won={game.player2.gamesWon}
              lost={game.player2.gamesLost}></PlayerCard>
          </div>
        </div>

      </Container>

    </div>
  );
}

export default RewatchGame;

