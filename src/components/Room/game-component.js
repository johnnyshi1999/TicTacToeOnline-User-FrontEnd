import React, {useEffect, useState} from 'react';
import Board from './board-component.js';
import ServiceGame from '../../services/serviceGame';
import io from "socket.io-client";
import socket from '../../services/socket';
import { useGame } from '../../contexts/game.js';


function Game() {

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
        <div className="game-board">
          <Board/>
        </div>
      </div>
    );
}

export default Game;

