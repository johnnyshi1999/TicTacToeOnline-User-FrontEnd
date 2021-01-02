import React, { useEffect, useState } from 'react';
import API from "../../services/api";
import { Button } from '@material-ui/core';
import './index.css';
import { useParams } from 'react-router';
import Axios from 'axios';
import { GameContext, useGame } from '../../contexts/game';
import socket from '../../services/socket';
import Game from "../../components/Room/game-component";

export default function GameRoom() {



  const params = useParams();

  const [game, setGame] = useState(null);
  const [playerNumber, setPlayerNumber] = useState(0);

  // const {game, setGame} = useGame();

  const fetchData = async () => {
    const result = await Axios.get(API.url + `/game/${params.id}`);
    setGame(result.data);
    setPlayerNumber(1);
  }

  useEffect(() => {
    fetchData();
    console.log(game);
  }, []);

  const gameActions = {};

  gameActions.makeMove = async (position) => {
    await socket.emit("make-move", { gameId: game._id, player: playerNumber, position: position });
  }

  const value = {
    game: game,
    playerNumber: playerNumber,
    gameActions: gameActions,
  }


  return (
    // <GameContext.Provider value = {value}>

    // </GameContext>

    <li>
      {game ? <Game game={game}></Game> : <div>Loading</div>}

    </li>


  );

  // if (game) {

  // }
  // else {
  //   return (
  //     <div>
  //       Loading
  //     </div>
  //   );
  // }

}