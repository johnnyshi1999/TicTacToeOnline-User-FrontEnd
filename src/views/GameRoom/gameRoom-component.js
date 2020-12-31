import React, { useEffect, useState } from 'react';
import Game from '../../components/game-component';
import API from "../../services/api";
import { Button } from '@material-ui/core';
import './index.css';
import { useParams } from 'react-router';
import Axios from 'axios';

export default function GameRoom() {

  

  const params = useParams();

  const [game, setGame] = useState(null);


  const fetchData = async() => {
    const result = await Axios.get(API.url + `/game/${params.id}`);
    setGame(result.data);
  }

  useEffect(() => {
    fetchData();
    console.log(game);
  }, []);
  
  return(
    <li>
      {game ? <Game maxRow="20" maxCol="20" winCondition="5" game = {game}></Game> : <div>Loading</div>}
      
    </li>
    );
  
  // if (game) {
    
  // }
  // else {
  //   return (
  //     <div>
  //       Loading
  //     </div>
  //   );
  // }
  
}