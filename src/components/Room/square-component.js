import React from 'react';
import { useGame } from '../../contexts/game';

function Square(props) {
  const index = props.squareIndex;
  const {game, gameActions} = useGame();

  let highlight = false;
  if (game.winHighlight.includes(index)) {
    highlight = true;
  }
    return (
      <button className="square"
        onClick = {()=> {gameActions.makeMove(index)}}
        style={{'background': highlight ? 'MediumSeaGreen' : '#fff'}}>
        {props.value}
      </button>
    );
}

export default Square;