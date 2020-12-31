import React, { useEffect, useState } from 'react';
import Game from '../../components/game-component';
import API from "../../services/api";
import { Button } from '@material-ui/core';
import io from "socket.io-client";
import './index.css';

export default function GameRoom() {
  
  const [socket, setSocket] = useState();
  useEffect(() => {
    setSocket(io.connect(API.url));
  }, [])
  
  
  return(
  <li>
    <Button onClick = {() => socket.emit("enter-game", "hello")}>
      test
    </Button>
    <Game maxRow="20" maxCol="20" winCondition="5"></Game>
  </li>
  );
}