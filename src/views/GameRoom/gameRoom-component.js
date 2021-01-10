import React, { useEffect, useState, useCallback } from 'react';
import API from "../../services/api";
import { Button } from '@material-ui/core';
import './index.css';
import { useParams } from 'react-router';
import Axios from 'axios';
import { GameContext } from '../../contexts/game';
import socket from '../../services/socket';
import Game from "../../components/Room/game-component";
import { useAuth } from '../../contexts/auth';

export default function GameRoom() {
  const params = useParams();

  const [roomInfo, setRoomInfo] = useState(null);
  const [game, setGame] = useState(null);
  const [playerNumber, setPlayerNumber] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const { authTokens } = useAuth();

  const fetchData = useCallback(async () => { 
    //get join result
    const joinResult = await Axios.get(API.url + `/api/room-management/room/join/${params.id}`);
    console.log(joinResult.data.playerNumber);
     // Redirect to index if not logged in user tries to enter a private room
     if(!authTokens && joinResult.data.room.RoomType.NumberId === 2){
      const roomLink = `/`;
      window.location.href=roomLink;
    }

    setRoomInfo(joinResult.data.room);
    setPlayerNumber(joinResult.data.playerNumber);

    if (joinResult.data.currentGame) {
      console.log(joinResult.data.currentGame);
      setGame(joinResult.data.currentGame);
    }

    socket.emit("join-room", {roomId: joinResult.data.room._id});
    setLoading(false);
  }, [params, authTokens]);

  useEffect(() => {
    fetchData();

    socket.on("update-board", (game) => {
      console.log("on update-board");
      setGame(game);
    });

    socket.on("winner-found", (game) => {
      setGame(game);
    });

    socket.on("update-room", (room) => {
      setRoomInfo(room);
    })
  }, [fetchData]);

  useEffect(()=> {
    console.log("room: " + roomInfo);
    console.log("game: " + game);
    console.log("player number: " + playerNumber);
  }, [roomInfo, game, playerNumber]);

  // useEffect(() => {
  //   if (game.winner != 0) {

  //   }  
  // }, [game])

  const gameActions = {};

  gameActions.makeMove = async (position) => {
    if (game.playerMoveNext === playerNumber && game.winner === 0) {
      await socket.emit("make-move", { gameId: game._id, player: playerNumber, position: position });
    }
  }

  const handleCreateGameClick = async () => {
    if (!authTokens) return;
    const data = {
      roomId: roomInfo._id,
      maxCol: 20,
      maxRow: 20,
      winCondition: 5,
    }
    try {
      setLoading(true);
      const result = await Axios.post(API.url + "/game/create", data);

      setGame(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const value = {
    room: roomInfo,
    game: game,
    playerNumber: playerNumber,
    gameActions: gameActions,
  }

  console.log(roomInfo);

  return (
    <GameContext.Provider value={value}>
      <div>
        {isLoading ?
          <div>Loading</div>
          :
          game ?
            <Game></Game> :
            <Button onClick={handleCreateGameClick}>Create Game</Button>
        }

      </div>
    </GameContext.Provider>




  );

}