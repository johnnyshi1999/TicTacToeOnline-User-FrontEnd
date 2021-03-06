import React, { useState, useEffect } from "react";

import { Grid, TextField, Button, Paper} from "@material-ui/core";
import { makeStyles } from  "@material-ui/core";

import { useAuth } from '../../contexts/auth';

import IndexPage_LoadingBackdrop_ActionCreator from '../../redux/actionCreators/Index/IndexPage_LoadingBackdrop_ActionCreator';
import IndexPage_ErrorPopUp_ActionCreator from '../../redux/actionCreators/Index/IndexPage_ErrorPopUp_ActionCreator';
import IndexPage_RoomPasswordPrompt_ActionCreator from '../../redux/actionCreators/Index/IndexPage_RoomPasswordPrompt_ActionCreator';
import Global_IsAwaitingServerResponse_ActionCreator from "../../redux/actionCreators/Global_IsAwaitingServerResponse_ActionCreator";

import CaroOnlineStore from '../../redux/store';

import Axios from 'axios';
import API from "../../services/api";
import socket from '../../services/socket';

import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: "space-around",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  typeInRoomIdControl: {
    flexWrap: 'wrap',
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  gridItem: {
    justifyContent: "center",
    alignItems: "center"
  },
  typeInRoomIdTextField: {
    width: "80%"
  },
  button: {
    borderRadius: 30,
  },
  paperAroundTypeInRoomIdControl: {
    width: "100%",
    padding: theme.spacing(1)
  }
}));

export default function RoomNavigator({onCreateRoomClick}){
    const classes = useStyles();
    const history = useHistory();

    const {authTokens} = useAuth();

    const [roomId, setRoomId] = useState(null);

    const handleJoinRoomClick = () => {
      if(!roomId || roomId.length <= 0) return;
      CaroOnlineStore.dispatch(IndexPage_LoadingBackdrop_ActionCreator(true));
      (async () => {
          try{
            const getIsInRoom = await Axios.post(API.url + '/api/room-management/room/check-is-in-room');
            const isInData = getIsInRoom.data;
            if(isInData.data){
              if(isInData.data.RoomType.NumberId !== 2){
                  const roomLink = `/room/${isInData.data._id.toString()}`;
                  history.push(roomLink);
              }else {
                  CaroOnlineStore.dispatch(IndexPage_LoadingBackdrop_ActionCreator(false));
                  CaroOnlineStore.dispatch(IndexPage_RoomPasswordPrompt_ActionCreator(isInData.data));
              }   
              return;            
            }

            const result = await Axios.get(API.url + `/api/room-management/room/${roomId}`);
            const {data} = result.data;
            if(data.RoomType.NumberId === 2) {
              CaroOnlineStore.dispatch(IndexPage_LoadingBackdrop_ActionCreator(false));
              CaroOnlineStore.dispatch(IndexPage_RoomPasswordPrompt_ActionCreator(data));
              return;
            }       
            
            const roomLink = `/room/${roomId._id}`;
            history.push(roomLink);
          } catch (e) {
            CaroOnlineStore.dispatch(IndexPage_ErrorPopUp_ActionCreator('Không thể tham gia phòng chơi, bạn có thể thử tải lại trang hoặc liên hệ phía hỗ trợ'));
            console.log(e);
          }
          CaroOnlineStore.dispatch(IndexPage_LoadingBackdrop_ActionCreator(false));
      })();
    }

    const handleMatchMakingClick = () => {
      CaroOnlineStore.dispatch(IndexPage_LoadingBackdrop_ActionCreator(true));
      (async () => {
          try{
            // Go inside current playing room recorded on the server
            const getIsInRoom = await Axios.post(API.url + '/api/room-management/room/check-is-in-room');
            const isInData = getIsInRoom.data;
            if(isInData.data){
              if(isInData.data.RoomType.NumberId !== 2){
                  const roomLink = `/room/${isInData.data._id.toString()}`;
                  history.push(roomLink);
              }else {
                  CaroOnlineStore.dispatch(IndexPage_LoadingBackdrop_ActionCreator(false));
                  CaroOnlineStore.dispatch(IndexPage_RoomPasswordPrompt_ActionCreator(isInData.data));
              }   
              return;            
            }

            // Else, matchmake since user is not in any room, turn on awaiting server respond
            CaroOnlineStore.dispatch(Global_IsAwaitingServerResponse_ActionCreator('Đang chờ đợi nối cặp từ phía server...'));
              // emit, on server will have an array ready
            socket.emit('enter matchmaking queue');
          } catch (e) {
            CaroOnlineStore.dispatch(IndexPage_ErrorPopUp_ActionCreator('Không thể tham gia phòng chơi, bạn có thể thử tải lại trang hoặc liên hệ phía hỗ trợ'));
            console.log(e);
          }
          CaroOnlineStore.dispatch(IndexPage_LoadingBackdrop_ActionCreator(false));
      })();
    }

    return (
        <Grid container item xs={12} className={classes.root}>
            <Grid container item xs={12} sm={8} className={classes.gridItem}>
                <Paper elevation={3} className={classes.paperAroundTypeInRoomIdControl}>
                    <Grid container item className={classes.typeInRoomIdControl}>
                        <TextField placeholder="Nhập mã phòng vào đây"
                            multiline
                            variant="outlined"
                            className={classes.typeInRoomIdTextField}
                            value={roomId ? roomId : ''}
                            onChange={(e) => {
                              e.target.value = e.target.value.slice(0,Math.min(100, e.target.value.length));
                              setRoomId(e.target.value);
                            }}>
                        </TextField>
                        <Button variant="contained" color="primary" className={classes.button} onClick={handleJoinRoomClick}>
                            GO
                        </Button>
                    </Grid>
                </Paper>
            </Grid>
            
            <Grid container item xs={12} sm={2} className={classes.gridItem}>
                <Button variant="contained" color="secondary" className={classes.button} disabled={authTokens ? false : true}
                onClick={async () => {
                  CaroOnlineStore.dispatch(IndexPage_LoadingBackdrop_ActionCreator(true));
                  try{
                    const getIsInRoom = await Axios.post(API.url + `/api/room-management/room/check-is-in-room`);
                    const isInData = getIsInRoom.data;
                    if(isInData.data){
                      if(isInData.data.RoomType.NumberId !== 2){
                          const roomLink = `/room/${isInData.data._id.toString()}`;
                          history.push(roomLink);
                      }else {
                          CaroOnlineStore.dispatch(IndexPage_LoadingBackdrop_ActionCreator(false));
                          CaroOnlineStore.dispatch(IndexPage_RoomPasswordPrompt_ActionCreator(isInData.data));
                      }   
                      return;            
                    }
                    onCreateRoomClick();
                  } catch (e) {
                    CaroOnlineStore.dispatch(IndexPage_ErrorPopUp_ActionCreator('Không thể tạo phòng chơi, tài khoản bạn đang trong phòng chơi, vui lòng liên hệ hỗ trợ.'));
                    console.log(e);
                  }
                  CaroOnlineStore.dispatch(IndexPage_LoadingBackdrop_ActionCreator(false));
                }}>
                    Tạo phòng
                </Button>
            </Grid>
            
            <Grid container item xs={12} sm={2} className={classes.gridItem}>
                <Button variant="contained" color="secondary" className={classes.button} disabled={authTokens ? false : true}
                onClick={handleMatchMakingClick}>
                    Chơi nhanh
                </Button>
            </Grid>
        </Grid>
    );
}