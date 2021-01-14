import React, { useEffect, useState, useCallback, useRef } from 'react';
import API from "../../services/api";
import { Button, Typography, Dialog, Slide, Backdrop, Grid, CircularProgress, DialogActions, DialogTitle, DialogContent, DialogContentText, makeStyles } from '@material-ui/core';
import './index.css';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { GameContext } from '../../contexts/game';
import socket from '../../services/socket';
import Game from "../../components/Room/game-component";
import { useAuth } from '../../contexts/auth';
import PlayerCard from '../../components/PlayerCard/playerCard-component';

import CaroOnlineStore from '../../redux/store';
import Global_IsAwaitingServerResponse_ActionCreator from '../../redux/actionCreators/Global_IsAwaitingServerResponse_ActionCreator';
import IndexPage_ErrorPopUp_ActionCreator from '../../redux/actionCreators/Index/IndexPage_ErrorPopUp_ActionCreator';
import RoomTab from '../../components/Room/RoomTab-component';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  roomTab: {
    marginTop: theme.spacing(3),
  },

}));


export default function GameRoom() {
  const classes = useStyles();
  const params = useParams();

  const [roomInfo, setRoomInfo] = useState(null);
  const [chat, setChat] = useState(null);

  const [game, setGame] = useState(null);
  const playerNumber = useRef(0);
  const playerInfo = useRef(null);
  const [isLoadingPrompt, setLoadingPrompt] = useState("Đang tải phòng chơi, vui lòng chờ");

  const [errorDialogText, setErrorDialogText] = useState(null);
  const [timer, setTimer] = useState("");
  const [isWaiting, setWaiting] = useState(true);

  let isRepeatedTab = useRef(false);
  const [username, setUsername] = useState("");

  const { authTokens } = useAuth();
  const history = useHistory();

  const fetchData = useCallback(async () => {

    //get join result
    try {
      const joinResult = await Axios.get(API.url + `/api/room-management/room/join/${params.id}`);
      // Redirect to index if not logged in user tries to enter a private room
      if (!authTokens && joinResult.data.room.RoomType.NumberId === 2) {
        const roomLink = `/`;
        window.location.href = roomLink;
        return;
      }

      setRoomInfo(joinResult.data.room);
      playerNumber.current = joinResult.data.playerNumber;
      setUsername(joinResult.data.username);

      if (joinResult.data.currentGame) {
        setGame(joinResult.data.currentGame);
      }

      // Check user is logged in, if he is, check currentRoomId if not have and user is a player in this room
      // if he is player 1 or 2 in the room
      if (authTokens) {
        const currentRoom_Id = localStorage.getItem("isPlayingInRoomId");
        if (!currentRoom_Id && joinResult.data.playerNumber !== 0) {
          localStorage.setItem("isPlayingInRoomId", params.id);
        }
      }

      const joinRoomPayload = { roomId: joinResult.data.room._id };
      if (joinResult.data.playerNumber !== 0) {
        joinRoomPayload.playerNumber = joinResult.data.playerNumber;
        switch (parseInt(joinResult.data.playerNumber)) {
          case 1:
            joinRoomPayload.playerId = joinResult.data.room.Player1._id;
            playerInfo.current = joinResult.data.room.Player1;
            break;
          case 2:
            joinRoomPayload.playerId = joinResult.data.room.Player2._id;
            playerInfo.current = joinResult.data.room.Player2;
            break;
          default:
            break;
        }
      }
      socket.emit("join-room", joinRoomPayload);

      setLoadingPrompt(null);

    } catch (e) {
      console.log(e);
      localStorage.removeItem("isPlayingInRoomId");
      setLoadingPrompt(null);
      setErrorDialogText('Đã xảy ra lỗi khi load phòng chơi, bạn sẽ được điều hướng về trang chủ sau đây');
    }
  }, [authTokens, params.id]);

  useEffect(() => {
    fetchData();
    socket.on("update-board", (game) => {
      console.log("on update-board");
      setGame(game);
    });

    socket.on("winner-found", (game) => {
      setGame(game);
    });

    socket.on("update-room", (room) => {
      if (room.IsDeleted) {
        CaroOnlineStore.dispatch(Global_IsAwaitingServerResponse_ActionCreator("Phòng chơi đã bị giải tán, mọi người sẽ về trang chủ..."));
        CaroOnlineStore.dispatch(Global_IsAwaitingServerResponse_ActionCreator(null));

        history.push(`/`);
        return;
      }
      setRoomInfo(room);
    })

    socket.on("update-new-game", (game) => {
      console.log("on update-new-game");
      setGame(game);
    })

    socket.on("countdown", (countdown) => {
      const timerString = `${Math.floor(countdown / 60)} : ${countdown % 60}`;

      setTimer(timerString);
    })

    socket.on("timeout", (game) => {
      setGame(game);
      console.log(game);
    });

    socket.on("update-chat", (chat) => {
      setChat(chat);
    });

    socket.on('room-processing-error', (error) => {
      console.log(error);
    })
  }, [history]);

  useEffect(() => {
    CaroOnlineStore.dispatch(Global_IsAwaitingServerResponse_ActionCreator(null));

    isRepeatedTab.current = false;
  }, []);

  useEffect(() => {
    socket.on('disconnect-other-tabs', ({ player, roomId, socketIdNot }) => {
      if (playerNumber.current === player) {
        isRepeatedTab.current = true;
        CaroOnlineStore.dispatch(Global_IsAwaitingServerResponse_ActionCreator("Vui lòng kết nối lại nếu muốn chơi tiếp..."));
        CaroOnlineStore.dispatch(Global_IsAwaitingServerResponse_ActionCreator(null));
        history.push('/');
        return;
      }
    });
  }, [history]);

  useEffect(() => {
    // console.log("room: " + roomInfo);
    // console.log("game: " + game);
    // console.log("player number: " + playerNumber);

    if (!roomInfo || !roomInfo.Player1 || !roomInfo.Player2) {
      setWaiting(true);
    }
    else {
      setWaiting(false);
    }
  }, [roomInfo, game]);

  const callBackToServerOnQuit = () => {
    if (playerNumber.current === 0) return;
    console.log('aaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbb');
    const prompt = "Đang xử lý yêu cầu thoát game của bạn và đang điều hướng...";
    CaroOnlineStore.dispatch(Global_IsAwaitingServerResponse_ActionCreator(prompt));

    try {
      const payload = { roomId: params.id, playerNumber: playerNumber.current };
      payload.player = playerInfo.current;
      socket.emit('leave-room', payload);
      localStorage.removeItem("isPlayingInRoomId");
      CaroOnlineStore.dispatch(Global_IsAwaitingServerResponse_ActionCreator(null));
    } catch (e) {
      if (playerNumber.current !== 0) {
        CaroOnlineStore.dispatch(IndexPage_ErrorPopUp_ActionCreator("Bạn thoát game không thành công, có thể rejoin lại từ nút ngay dưới đây"));
      }
      CaroOnlineStore.dispatch(Global_IsAwaitingServerResponse_ActionCreator(null));
      history.push(`/`);
    }
  };

  useEffect(() => {
    window.onbeforeunload = () => {
      callBackToServerOnQuit();
      window.onbeforeunload = () => {

      }
    }

    return () => {
      if (!isRepeatedTab.current) {
        callBackToServerOnQuit();
      }
    }
  }, [history, playerInfo, params.id]);

  const handleErrorDialogClose = () => {
    setErrorDialogText(null);
    setLoadingPrompt('Đang điều hướng về trang chủ...');
    history.push('/');
  };

  const gameActions = {};

  gameActions.makeMove = async (position) => {

    //already marked
    if (game.board[position] !== 0) {
      return;
    }
    if (game.playerMoveNext === playerNumber.current && game.winner === 0) {
      console.log(playerNumber.current);
      await socket.emit("make-move", { gameId: game._id, player: playerNumber.current, position: position });
    }
  }

  gameActions.createGame = async () => {
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

      socket.emit("new-game", { gameId: result.data._id });
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
    chat: chat,
    username: username,
    playerNumber: playerNumber.current,
    gameActions: gameActions,
  }

  return (
    <GameContext.Provider value={value}>
      <div>
        {
          game ?
            <div style={{ display: 'flex' }}>
              <Game timer={timer}></Game>

              <div className={classes.roomTab}>
                <RoomTab>
                </RoomTab>
              </div>


            </div>
            :
            <Button onClick={handleCreateGameClick}>{isWaiting ? "Waiting for player" : "Create Game"}</Button>
        }



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
        <Backdrop open={isLoadingPrompt !== null} style={{ color: "#fff", zIndex: 100, justifyContent: "center" }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress color="inherit" />
            <Typography variant="body1" style={{ color: 'white', marginTop: 5 }}>
              {isLoadingPrompt}
            </Typography>
          </div>
        </Backdrop>
      </div>
    </GameContext.Provider>




  );

}