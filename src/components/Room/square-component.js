import React from 'react';
import { useGame } from '../../contexts/game';

function Square(props) {
  const index = props.squareIndex;
  const {gameActions} = useGame();
    return (
      <button className="square"
        onClick = {()=> {gameActions.makeMove(index)}}>
        {props.value}
      </button>
    );
}

export default Square;