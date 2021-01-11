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
  const [timer, setTimer] = useState(3 * 60);
  const [isLoading, setLoading] = useState(true);
  const [isWaiting, setWaiting] = useState(true);

  const { authTokens } = useAuth();

  const startTimer = () => {

  }
  const fetchData = useCallback(async () => {
    
    //get join result
    const joinResult = await Axios.get(API.url + `/api/room-management/room/join/${params.id}`);
    console.log(joinResult.data.playerNumber);
    setRoomInfo(joinResult.data.room);
    setPlayerNumber(joinResult.data.playerNumber);

    if (joinResult.data.currentGame) {
      console.log(joinResult.data.currentGame);
      setGame(joinResult.data.currentGame);
    }

    socket.emit("join-room", {roomId: joinResult.data.room._id});

    // if (!joinResult.data.room.Player2 || !joinResult.data.room.Player1) {
    //   setWaiting(true);
    // }
    // else {
    //   setWaiting(false);
    // }
    setLoading(false);
  }, [params]);

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

    socket.on("update-new-game", (game) => {
      console.log("on update-new-game");
      setGame(game);
    })

    socket.on("countdown", (countdown) => {
      const timerString = `${Math.floor(countdown/ 60)} : ${countdown % 60}`;

      setTimer(timerString);
    })
  }, []);

  useEffect(()=> {
    console.log("room: " + roomInfo);
    console.log("game: " + game);
    console.log("player number: " + playerNumber);

    if (!roomInfo || !roomInfo.Player1 || !roomInfo.Player2) {
      setWaiting(true);
    }
    else {
      setWaiting(false);
    }
  }, [roomInfo, game, playerNumber]);

  // useEffect(() => {
  //   if (game.winner != 0) {

  //   }  
  // }, [game])



  const gameActions = {};

  gameActions.makeMove = async (position) => {

    //already marked
    if (game.board[position] !== 0) {
      return;
    }
    if (game.playerMoveNext === playerNumber && game.winner === 0) {
      console.log(playerNumber);
      await socket.emit("make-move", { gameId: game._id, player: playerNumber, position: position });
    }
  }

  gameActions.createGame = async() => {
    if (!authTokens) return;

    if (isWaiting) {
      return;
    }

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
      socket.emit("new-game", {gameId: result.data._id});
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const handleCreateGameClick = async () => {
    await gameActions.createGame();
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
            <Game timer = {timer}></Game> :
            <Button onClick={handleCreateGameClick}>{isWaiting? "Waiting for player" : "Create Game"}</Button>
        }

      </div>
    </GameContext.Provider>




  );

}