import React from 'react';

function Square(props) {
    return (
      <button className="square"
        style={{'background': props.highlight ? 'MediumSeaGreen' : '#fff'}}
        onClick = {()=>{props.onClick()}}>
        {props.value}
      </button>
    );
}

export default Square;
    