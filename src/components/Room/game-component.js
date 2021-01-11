import React, { useCallback, useEffect, useState } from 'react';
import Board from './board-component.js';
import ServiceGame from '../../services/serviceGame';
import io from "socket.io-client";
import socket from '../../services/socket';
import { useGame } from '../../contexts/game.js';
import Axios from 'axios';
import API from '../../services/api.js';
import { Button, ButtonBase, Container } from '@material-ui/core';


function Game(props) {

  const { room, game, gameActions } = useGame();

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

  const createGameClickHandle = async () => {
    await gameActions.createGame();
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
          {game.winner === 0 ?
            <div></div> :
            <Button onClick={createGameClickHandle}>Create another game</Button>
          }
        </div>

        <div>{userTurnMessage}</div>
        <div>{"Time remaining: " + props.timer}</div>

        <div style={{display: 'flex'}}>
          <div className="game-board">
            <Board />
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <h3>History</h3>
            {game.history.map((element) => {
              let username ="";
              if (element.player === 1) {
                username = room.Player1.username;
              }
              else {
                username = room.Player2.username;
              }

              const message = `${username} made move on position of ${element.position}`;
              return(
              <ButtonBase>
                {message}
              </ButtonBase>);
            })}
          </div>
        </div>

      </Container>

    </div>
  );
}

export default Game;

