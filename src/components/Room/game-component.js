import React, { useCallback, useEffect, useRef, useState } from 'react';
import Board from './board-component.js';
import socket from '../../services/socket';
import { useGame } from '../../contexts/game.js';
import { Button, Container, Typography, Box, Paper } from '@material-ui/core';
import PlayerCard from '../PlayerCard/playerCard-component.js';

import { makeStyles } from '@material-ui/core/styles';

import defaultAvatar from "../../assets/tic-tac-toe.png";

const useStyles = makeStyles({
  root: {
    maxWidth: 150,
  },

  paper: {
    maxWidth: 150,
    marginTop: 10,
    marginBottom: 10
  },
  image: {
    height: 100,
    width: 100,
    alignContent: 'center',
    marginRight: 10,
    marginLeft: 10,
  },

  usernameText: {
    marginBottom: 10,
  },

  row: {
    display: 'flex',
    justifyContent: 'center',
  },
});

function Game(props) {
  const classes = useStyles();

  const { room, game, gameActions } = useGame();

  let winnerMessage;

  const [havePlayer1Info, setHavePlayer1Info] = useState(false);
  const player1Username = useRef(null);
  const player1Trophies = useRef(null);
  const player1GamesWon = useRef(null);
  const player1GamesLost = useRef(null);

  const [havePlayer2Info, setHavePlayer2Info] = useState(false);
  const player2Username = useRef(null);
  const player2Trophies = useRef(null);
  const player2GamesWon = useRef(null);
  const player2GamesLost = useRef(null);

  useEffect(() => {
    if(room.Player1){
      player1Username.current = room.Player1.username;
      player1Trophies.current = room.Player1.trophies;
      player1GamesWon.current = room.Player1.gamesWon;
      player1GamesLost.current = room.Player1.gamesLost;
      setHavePlayer1Info(true);
    }else{
      setHavePlayer1Info(false);
    }

    if(room.Player2){
      player2Username.current = room.Player2.username;
      player2Trophies.current = room.Player2.trophies;
      player2GamesWon.current = room.Player2.gamesWon;
      player2GamesLost.current = room.Player2.gamesLost;
      setHavePlayer2Info(true);
    }else{
      setHavePlayer2Info(false);
    }
  }, [room]);

  // const fetchData = useCallback(async () => {
  //   if (game.winner !== 0) {
  //     if (game)
  //   }

  //   const username = await Axios.get(API.url + `/api/game/`)
  // }, []);

  // // useEffect(() => {
  // //   fetchData();
  // // }, [fetchData])

  switch (game.winner) {
    case 1:
      winnerMessage = `${room.Player1.username} has won`;
      break;

    case 2:
      winnerMessage = `${room.Player2.username} has won`;
      break;

    case 3:
      winnerMessage = "Tie, both have won";
      break;

    default:
      break;
  }

  let nextTurnUser = "";
  if (game.playerMoveNext === 1) {
    nextTurnUser = player1Username.current;
  }
  else {
    nextTurnUser = player2Username.current;
  }
  let userTurnMessage = `It's turn of: ${nextTurnUser}`;

  const createGameClickHandle = async () => {
    await gameActions.createGame();
  }

  useEffect(() => {
    if (socket) {
    }
  }, [])


  // const [socket, setSocket] = useState();

  // useEffect(() => {
  //   setSocket(io.connect(API.url));
  //   console.log(props.game);
  // }, []);

  // useEffect(() => () => {
  //   // socket.disconnect();
  // },[])

  return (

    <div className="game">
      <Container>
        <div>
          <h1>{winnerMessage}</h1>
          {game.winner === 0 ?
            <div></div> :
            <Button onClick={createGameClickHandle}>Create another game</Button>
          }
        </div>

        <div>{userTurnMessage}</div>
        <div>{"Time remaining: " + props.timer}</div>

        <div style={{ display: 'flex' }}>
          <div className="game-board">
            <Board />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {havePlayer1Info?
              <PlayerCard
                username={player1Username.current}
                trophies={player1Trophies.current}
                won={player1GamesWon.current}
                lost={player1GamesLost.current}></PlayerCard>
            : 
              <Box border={2} className={classes.root} style={{ marginLeft: 10 }} borderRadius={10}>
                <Paper className={classes.paper} elevation={0}>
                  <div className={classes.row}>
                    <img src={defaultAvatar} className={classes.image} alt="player1 avatar"></img>
                  </div>
                  <Typography align='center' className={classes.usernameText}>
                    Người dùng đã thoát phòng
                  </Typography>
                </Paper>
              </Box>
            }
            <div style={{ flexGrow: 1 }} />
            {/* <div>{"Time remaining: " + props.timer}</div> */}
            <div style={{ flexGrow: 1 }} />
            {
              havePlayer2Info ? 
                <PlayerCard
                username={player2Username.current}
                trophies={player2Trophies.current}
                won={player2GamesWon.current}
                lost={player2GamesLost.current}></PlayerCard>
              :
              <Box border={2} className={classes.root} style={{ marginLeft: 10 }} borderRadius={10}>
                <Paper className={classes.paper} elevation={0}>
                  <div className={classes.row}>
                    <img src={defaultAvatar} className={classes.image} alt="player1 avatar"></img>
                  </div>
                  <Typography align='center' className={classes.usernameText}>
                    Người dùng đã thoát phòng
                  </Typography>
                </Paper>
              </Box>
            }
          </div>
        </div>

      </Container>

    </div>
  );
}

export default Game;

