import React, { useEffect, useState, useCallback } from 'react';
import API from "../../services/api";
import { Button, Typography, Dialog, Slide, Backdrop, Grid, CircularProgress, DialogActions, DialogTitle, DialogContent, DialogContentText} from '@material-ui/core';
import './index.css';
import { useParams } from 'react-router';
import {useHistory} from 'react-router-dom';
import Axios from 'axios';
import { GameContext } from '../../contexts/game';
import socket from '../../services/socket';
import Game from "../../components/Room/game-component";
import { useAuth } from '../../contexts/auth';

import CaroOnlineStore from '../../redux/store';
import Global_IsAwaitingServerResponse_ActionCreator from '../../redux/actionCreators/Global_IsAwaitingServerResponse_ActionCreator';
import IndexPage_ErrorPopUp_ActionCreator from '../../redux/actionCreators/Index/IndexPage_ErrorPopUp_ActionCreator';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function GameRoom() {
  const params = useParams();

  const [roomInfo, setRoomInfo] = useState(null);
  const [game, setGame] = useState(null);
  const [playerNumber, setPlayerNumber] = useState(0);
  const [isLoadingPrompt, setLoadingPrompt] = useState("Đang tải phòng chơi, vui lòng chờ");

  const [errorDialogText, setErrorDialogText] = useState(null);
  const [timer, setTimer] = useState(3 * 60);
  const [isWaiting, setWaiting] = useState(true);

  const { authTokens } = useAuth();
  const history = useHistory();

  const startTimer = () => {

  }

  const fetchData = useCallback(async () => {
    
    //get join result
    try{
      const joinResult = await Axios.get(API.url + `/api/room-management/room/join/${params.id}`);
      // Redirect to index if not logged in user tries to enter a private room
      if(!authTokens && joinResult.data.room.RoomType.NumberId === 2){
        const roomLink = `/`;
        window.location.href=roomLink;
        return;
      }

      setRoomInfo(joinResult.data.room);
      setPlayerNumber(joinResult.data.playerNumber);
      console.log(joinResult.data.playerNumber);

      if (joinResult.data.currentGame) {
        setGame(joinResult.data.currentGame);
      }

      // Check user is logged in, if he is, check currentRoomId if not have and user is a player in this room
      // if he is player 1 or 2 in the room
      if(authTokens){
        const currentRoom_Id = localStorage.getItem("isPlayingInRoomId");
        if(!currentRoom_Id && joinResult.data.playerNumber !== 0){
          localStorage.setItem("isPlayingInRoomId", params.id);
        }
      }

      socket.emit("join-room", {roomId: joinResult.data.room._id});

      setLoadingPrompt(null);
      
    } catch(e) {
      console.log(e);
      localStorage.removeItem("isPlayingInRoomId");
      setLoadingPrompt(null);
      setErrorDialogText('Đã xảy ra lỗi khi load phòng chơi, bạn sẽ được điều hướng về trang chủ sau đây');
    }
  }, [params, authTokens]);

  useEffect(() => {
    CaroOnlineStore.dispatch(Global_IsAwaitingServerResponse_ActionCreator(null));

    // const currentRoomId = params.id;
    // const roomIdInStorage = localStorage.getItem("isPlayingInRoomId");
    // if(roomIdInStorage && roomIdInStorage === currentRoomId){
    //   // const roomLink = `/`;
    //   // window.location.href=roomLink;
    //   // return;
    //   history.push('/');
    // }

    fetchData();

    socket.on("update-board", (game) => {
      console.log("on update-board");
      setGame(game);
    });

    socket.on("winner-found", (game) => {
      setGame(game);
    });

    socket.on("update-room", (room) => {
      // if(room.IsDeleted){
      //   CaroOnlineStore.dispatch(Global_IsAwaitingServerResponse_ActionCreator("Phòng chơi đã bị giải tán, bạn sẽ được điều hướng về trang chủ..."));
      //   if(playerNumber === 2){
      //     // remove from localStorage the room player is in temporarily
      //     localStorage.removeItem("isPlayingInRoomId");
      //   }     
      //   // Set loading
      //   CaroOnlineStore.dispatch(Global_IsAwaitingServerResponse_ActionCreator(null));
      //   window.location.href = '/';    
      //   return;
      // }
      // if(playerNumber === 2 && room.Player2 === null){
      //   CaroOnlineStore.dispatch(Global_IsAwaitingServerResponse_ActionCreator("Một tab khác của bạn đã thoát phòng, bạn sẽ được điều hướng về trang chủ..."));
      //   localStorage.removeItem("isPlayingInRoomId");
      //   CaroOnlineStore.dispatch(Global_IsAwaitingServerResponse_ActionCreator(null));
      //   window.location.href = '/';    
      //   return;
      // }
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

    socket.on("timeout", (game) => {
      setGame(game);
      console.log(game);
    });

    socket.on("disconnect", () => {
      
    });
  }, [fetchData]);

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

  useEffect(() => {
    return () => {
      // if is player, 
      if(playerNumber !== 0){
        // remove from localStorage the room player is in temporarily
        const temp = localStorage.getItem("isPlayingInRoomId");
        localStorage.removeItem("isPlayingInRoomId");
        // Block the transition by removing the value
        const prompt = "Đang xử lý yêu cầu thoát game của bạn và đang điều hướng về trang chủ...";
        CaroOnlineStore.dispatch(Global_IsAwaitingServerResponse_ActionCreator(prompt));
        // Set loading
        (async() => {
          try{
            if(playerNumber === 2) {
              await Axios.put(API.url + `/api/room-management/room/${params.id}`, {
                Player2: null,
              });
            }else if(playerNumber === 1) {
              await Axios.delete(API.url + `/api/room-management/room/${params.id}`);
            } 
            CaroOnlineStore.dispatch(Global_IsAwaitingServerResponse_ActionCreator(null));
          } catch (e) {
            localStorage.setItem("isPlayingInRoomId", temp);
            CaroOnlineStore.dispatch(Global_IsAwaitingServerResponse_ActionCreator(null));
            CaroOnlineStore.dispatch(IndexPage_ErrorPopUp_ActionCreator('Đã xảy ra lỗi khi thực hiện thoát phòng, lần sau vào trang chủ bạn sẽ luôn được điều hướng tới phòng chưa thoát'));
            return;         
          }
        })();
       }           
    };
  }, [params.id, playerNumber]);
  // useEffect(() => {
  //   if (game.winner != 0) {

  //   }  
  // }, [game])

  const handleErrorDialogClose = () => {
    setErrorDialogText(null);
    setLoadingPrompt('Đang điều hướng về trang chủ...');
    window.location.href = '/';
  };

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
      setLoadingPrompt("Đang tạo một ván chơi mới, vui lòng chờ...");
      const result = await Axios.post(API.url + "/game/create", data);

      setGame(result.data);
      
      socket.emit("new-game", {gameId: result.data._id});
      setLoadingPrompt(null);
    } catch (error) {
      console.log(error);
      setLoadingPrompt(null);
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

  return (
    <GameContext.Provider value={value}>
      <div>
        {   
        game ?
            <Game timer = {timer}></Game> :
            <Button onClick={handleCreateGameClick}>{isWaiting? "Waiting for player" : "Create Game"}</Button>
        }
        {/* Error dialog */}
        <Dialog
        fullWidth
        maxWidth="sm"
        open={errorDialogText ? true : false}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleErrorDialogClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>
          <Typography color="secondary">
            {"Đã xảy ra lỗi..."}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {errorDialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorDialogClose} color="secondary">
            Đóng
          </Button>
        </DialogActions>
        </Dialog>
        <Backdrop open={isLoadingPrompt !== null} style={{color: "#fff" , zIndex: 100, justifyContent: "center"}}>
          <Grid container item justify="center">
            <Grid item xs={12}><CircularProgress color="inherit" /></Grid>     
            <Grid item xs={12}>
              <Typography variant="body1" style={{color: 'white'}}>
                {isLoadingPrompt}
              </Typography>
            </Grid>
          </Grid>
        </Backdrop>
      </div>
    </GameContext.Provider>




  );

}