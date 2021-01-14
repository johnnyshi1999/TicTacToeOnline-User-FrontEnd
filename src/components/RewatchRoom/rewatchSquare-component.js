import React from 'react';
import { useGame } from '../../contexts/game';

function RewatchSquare(props) {
  const index = props.squareIndex;
  const {game} = useGame();

  let highlight = false;
  if (game.winHighlight.includes(index)) {
    highlight = true;
  }
    return (
      <button className="square"
        style={{'background': highlight ? 'MediumSeaGreen' : '#fff'}}>
        {props.value}
      </button>
    );
}

export default RewatchSquare;