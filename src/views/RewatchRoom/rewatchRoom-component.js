import React, { useEffect, useState, useCallback } from 'react';
import API from "../../services/api";
import { Button, Typography, Dialog, Slide, Backdrop, Grid, CircularProgress, DialogActions, DialogTitle, DialogContent, DialogContentText, makeStyles } from '@material-ui/core';
import './index.css';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { GameContext } from '../../contexts/game';
import socket from '../../services/socket';
import RewatchGame from "../../components/RewatchRoom/rewatchGame-component";
import { useAuth } from '../../contexts/auth';

import CaroOnlineStore from '../../redux/store';
import Global_IsAwaitingServerResponse_ActionCreator from '../../redux/actionCreators/Global_IsAwaitingServerResponse_ActionCreator';
import RewatchRoomTab from '../../components/RewatchRoom/rewatchRoomTab-component';


const useStyles = makeStyles((theme) => ({
  roomTab: {
    marginTop: theme.spacing(3),
  },

}));


export default function RewatchRoom() {
  const classes = useStyles();
  const params = useParams();



  const [game, setGame] = useState();

  const [chat, setChat] = useState();

  const [isLoadingPrompt, setLoadingPrompt] = useState("Đang tải phòng chơi, vui lòng chờ");

  const fetchData = useCallback(async () => {
    console.log("heelo there");
    const result = await Axios.get(API.url + `/game-records/${params.id}`);

    const data = result.data;

    console.log(data);
    setGame(data.game);
    setChat(data.chat);
  }, [params.id]);

  useEffect(() => {
    fetchData();

    setLoadingPrompt(null);
  }, [fetchData]);

  const value = {
    game: game,
    chat: chat,
  }

  return (
    <GameContext.Provider value={value}>
      <div>
        {game ?
          <div style={{ display: 'flex' }}>
            <RewatchGame></RewatchGame>
            <div className={classes.roomTab}>
              <RewatchRoomTab>
              </RewatchRoomTab>
            </div>
          </div> :

          <></>

        }


        <Backdrop open={isLoadingPrompt !== null} style={{ color: "#fff", zIndex: 100, justifyContent: "center" }}>
          <Grid container item justify="center">
            <Grid container item xs={12} justify="center"><CircularProgress color="inherit" /></Grid>
            <Grid container item xs={12} justify="center">
              <Typography variant="body1" style={{ color: 'white' }}>
                {isLoadingPrompt}
              </Typography>
            </Grid>
          </Grid>
        </Backdrop>
      </div>
    </GameContext.Provider>




  );

}