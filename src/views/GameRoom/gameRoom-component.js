import React, { useEffect, useState, useCallback } from 'react';
import API from "../../services/api";
import { Button } from '@material-ui/core';
import './index.css';
import { useParams } from 'react-router';
import Axios from 'axios';
import { GameContext, useGame } from '../../contexts/game';
import socket from '../../services/socket';
import Game from "../../components/Room/game-component";
import {useAuth} from '../../contexts/auth';

export default function GameRoom() {
  const params = useParams();

  const [roomInfo, setRoomInfo] = useState(null);
  const [game, setGame] = useState(null);
  const [playerNumber, setPlayerNumber] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const {authTokens} = useAuth();

  const fetchData = useCallback(async () => {
    const result = await Axios.get(API.url + `/api/room-management/room/${params.id}`);
    setRoomInfo(result.data.data);
    setPlayerNumber(1);
    setLoading(false);
  }, [params]);

  useEffect(() => {
    fetchData();
    console.log(game);
  }, [fetchData, game]);

  const gameActions = {};

  gameActions.makeMove = async (position) => {
    await socket.emit("make-move", { gameId: game._id, player: playerNumber, position: position });
  }

  const value = {
    game: game,
    playerNumber: playerNumber,
    gameActions: gameActions,
  }

  const handleCreateGameClick = async () => {
    if(!authTokens) return;
    const data = {
      maxCol: 20,
      maxRow: 20,
      winCondition: 5,
    }
    try {
      setLoading(true);
      const result = await Axios.post(API.url + "/game/create", data);
      
      setGame(result.data);
      setLoading(false);
    } catch(error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    // <GameContext.Provider value = {value}>

    // </GameContext>

    <li>

      {isLoading? 
      <div>Loading</div> 
      : 
      game ? 
      <Game game={game}></Game> : 
      <Button onClick={handleCreateGameClick}>Create Game</Button>
      }

    </li>


  );

}