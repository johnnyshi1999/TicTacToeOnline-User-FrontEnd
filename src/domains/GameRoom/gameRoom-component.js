import React from 'react';
import Game from '../../components/game-component';


export default function GameRoom() {
  return(<Game maxRow="5" maxCol="5" winCondition="3"></Game>);
}