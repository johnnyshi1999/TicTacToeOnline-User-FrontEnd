import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import API from '../services/api';
import socket from "../services/socket";

export const GameContext = createContext();

export function useGame() {
  return useContext(GameContext);
}

export function GameProvider(props) {
  
  // const [authTokens, setAuthTokens] = useState(existingTokens);

  // const setTokens = (data) => {
  //   if (data) {
  //     localStorage.setItem("token", data);
  //   }
  //   else {
  //     localStorage.removeItem("token");
  //   }

  //   setAuthTokens(data);
  // }

  // const value = { authTokens: authTokens, setAuthTokens: setTokens};


  const [game, setGame]=useState(props.game);
  
  const [playerNumber, setPlayerNumber] = useState(0);

  const gameActions = {};

  gameActions.setInitialGameState = (fetchedGame, fetchedPlayerNumber) => {
    setGame(fetchedGame);
    setPlayerNumber(fetchedPlayerNumber);
  }

  gameActions.makeMove = async (position) => {
    await socket.emit("make-move", {gameId: game._id, player: playerNumber, position: position});
  }

  const value = {
    game: game,
    playerNumber: playerNumber,
    gameActions: gameActions,
  }

  return (
    <GameContext.Provider value={value}>
    </GameContext.Provider>
  );

}