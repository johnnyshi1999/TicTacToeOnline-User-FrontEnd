import React, { useEffect, useState } from "react";
import RoomNavigator from "../../components/Room-Navigator-ForIndex/Room-Navigator";
import RoomsGrid from '../../components/Rooms-Grid-ForIndex/Rooms-Grid';

import { Grid, Container, Box, Dialog, Button, Slide, TextField, Select, MenuItem, FormControl, InputLabel, Typography} from "@material-ui/core";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Alert} from '@material-ui/lab';

import { makeStyles } from  "@material-ui/core";
import {Backdrop, CircularProgress} from '@material-ui/core';

import socket from '../../services/socket';
import Axios from "axios";

import API from '../../services/api';

import CaroOnlineStore from '../../redux/store';
import IndexPage_ErrorPopUp_ActionCreator from '../../redux/actionCreators/Index/IndexPage_ErrorPopUp_ActionCreator';
import IndexPage_RoomPasswordPrompt_ActionCreator from '../../redux/actionCreators/Index/IndexPage_RoomPasswordPrompt_ActionCreator';
import IndexPage_LoadingBackdrop_ActionCreator from '../../redux/actionCreators/Index/IndexPage_LoadingBackdrop_ActionCreator'

import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },  
  pageContent: {
    justifyContent: "flex-start",
  },
  roomNavigationBarArea: {
    justifyContent: "center",
    justifyItems: "center"
  },
  indexContentArea: {
    justifyContent: "space-between",
  },

  boardGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(8),
  },

  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },

  mainContainer: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },

  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "100%",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Index() {
  const classes = useStyles();
  const history = useHistory();

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openRejoinRoomBackdrop, setOpenRejoinRoomBackdrop] = useState(null);

  //State for create room dialog
  const [openCreateRoomDialog, setOpenCreateRoomDialog] = React.useState(false);
  const [disableForm, setDisableForm] = useState(false);
  const [roomName, setRoomName] = useState(null);
  const [roomDescription, setRoomDescription] = useState(null);
  const [roomType, setRoomType] = useState(1);
  const [roomPassword, setRoomPassword] = useState(null);
  const [createRoomError, setCreateRoomError] = useState(null);

  // State for room password typein dialog
  const [roomToTypePassword, setRoomToTypePassword] = useState(null);
  const [verifyPassword, setVerifyPassword] = useState(null);
  const [verifyPasswordError, setVerifyPasswordError] = useState(null);

  //State for error dialog
  const [indexError, setIndexError] = useState(null);

  const handleClickOpen = () => {
    setDisableForm(false);
    setOpenCreateRoomDialog(true);
  };

  const handleCloseCreateRoom = () => {
    setOpenCreateRoomDialog(false);
    setRoomName(null);
    setRoomDescription(null);
    setRoomPassword(null);
    setRoomType(1);
    setDisableForm(false);
  };

  const handleCloseErrorDialog = () => {
    CaroOnlineStore.dispatch(IndexPage_LoadingBackdrop_ActionCreator(false));
    CaroOnlineStore.dispatch(IndexPage_ErrorPopUp_ActionCreator(null));
  }

  const handleClosePasswordPromptDialog = () => {
    CaroOnlineStore.dispatch(IndexPage_LoadingBackdrop_ActionCreator(false));
    CaroOnlineStore.dispatch(IndexPage_RoomPasswordPrompt_ActionCreator(null));
  }

  useEffect(() => {

    if(socket){
      socket.emit('page-status', 'index-page');
    }

    const unsubcribe = CaroOnlineStore.subscribe(() => {
      const appState = CaroOnlineStore.getState();
      setOpenBackdrop(appState.IndexPage.isLoading);
      setIndexError(appState.IndexPage.pageWideError);
      setRoomToTypePassword(appState.IndexPage.roomToTypePassword);
    });

    const roomID = localStorage.getItem("isPlayingInRoomId");
    if(roomID){
      setOpenRejoinRoomBackdrop(roomID);
    }

    return () => {
      if(socket){
        socket.emit('page-status', null);
      };
      unsubcribe();
    }
  }, []);

  return(
    <div className={classes.root}>
      <Container maxWidth="xl" className={classes.container}>
        <Grid container spacing={3} className={classes.pageContent}>
            <Grid container item xs={12} lg={10} justify="center" className={classes.roomNavigationBarArea}>
              <RoomNavigator onCreateRoomClick={handleClickOpen}/>
            </Grid>  
            <Box component={Grid} container item lg={2} display={{xs: "none", lg:"flex"}}>
            </Box>
            <Grid container item xs={12} lg={10} justify="center" className={classes.indexContentArea}>
              <RoomsGrid/>
            </Grid>  
            <Box component={Grid} container item lg={2} display={{xs: "none", lg:"flex"}}>
            </Box>
            {/* Create room dialog */}
            <Dialog fullScreen open={openCreateRoomDialog} TransitionComponent={Transition}
              disableBackdropClick={disableForm}>
                <DialogTitle id="form-dialog-title">Tạo phòng</DialogTitle>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  setDisableForm(true);
                  setOpenBackdrop(true);

                  try{
                    // api call here
                    const newRoom = await Axios.post(API.url + "/api/room-management/room", {
                      room_type: roomType, 
                      room_name: roomName, 
                      room_description: roomDescription, 
                      room_password: roomType === 2 ? roomPassword : undefined
                    });

                    const {data} = newRoom.data;

                    const roomLink = `/room/${data[0]._id}`;
                    window.location.href=roomLink;
                  } catch (e) {
                    setOpenBackdrop(false);
                    setDisableForm(false);
                    setCreateRoomError('Có lỗi xảy ra trong lúc đang tạo phòng, vui lòng kiểm tra lại thông tin đã nhập, kiểm tra xem phòng đã đầy hoặc thử lại');
                    return;
                  }
                }}>
                <DialogContent>
                  <DialogContentText>
                    Nhập các thông tin dưới đây để tạo phòng chơi. Có 2 loại phòng:<br/>
                    - PUBLIC: Mọi người đều có thể vào chơi và xem <br/>
                    - PRIVATE: Chỉ có thể vào chơi nếu nhập mật khẩu và không cho phép dự thính
                  </DialogContentText>
                  <Grid container item xs={12} style={{
                    display: "flex",
                    flexDirection: "row"
                  }}>
                    <Grid container item xs={12} md={8}>
                      <TextField
                        variant="outlined"
                        required
                        autoFocus
                        id="RoomName"
                        label="Tên phòng"
                        fullWidth
                        disabled={disableForm}
                        value={roomName ? roomName : ''}
                        onChange={(e) => {
                          e.target.value = e.target.value.slice(0,Math.min(100, e.target.value.length));
                          setRoomName(e.target.value);
                        }}
                        margin="normal"
                      />
                      <TextField
                        variant="outlined"
                        autoFocus
                        id="RoomDescription"
                        label="Mô tả phòng"
                        fullWidth
                        disabled={disableForm}
                        value={roomDescription ? roomDescription : ''}
                        onChange={(e) => {
                          e.target.value = e.target.value.slice(0,Math.min(200, e.target.value.length));
                          setRoomDescription(e.target.value);
                        }}
                        margin="normal"
                      />
                      <FormControl variant="outlined" margin="normal">
                        <InputLabel>Loại phòng</InputLabel>
                        <Select value={roomType}
                        onChange={(e) => {
                          setRoomPassword(null);
                          setRoomType(e.target.value);
                        }}
                        label="Loại phòng">
                            <MenuItem value={1}>
                              <Typography variant="body1" style={{overflowWrap: 'break-word'}}>
                                Public
                              </Typography>
                            </MenuItem>
                            <MenuItem value={2}>
                              <Typography variant="body1" style={{overflowWrap: 'break-word'}}>
                                Private
                              </Typography>
                            </MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        required={roomType === 1? undefined : true}
                        variant="outlined"
                        autoFocus
                        id="RoomPassword"
                        label="Mật khẩu"
                        fullWidth
                        disabled={disableForm}
                        placeholder="Nhập mật khẩu dài từ 6 ký tự trở lên, từ 36 ký tự trở xuống"
                        value={roomPassword ? roomPassword : ''}
                        style={{
                          visibility: roomType === 1 ? 'collapse' : 'visible'
                        }}
                        type="password"
                        onChange={(e) => {
                          e.target.value = e.target.value.slice(0,Math.min(36, e.target.value.length));
                          setRoomPassword(e.target.value);
                        }}
                        margin="normal"
                      />
                    </Grid>
                    <Box component={Grid} container item md={4} display={{xs: "none", md:"flex"}} justify="center" >
                      <Grid item xs={8}>
                        <img src={process.env.PUBLIC_URL + 'Index/TicTacToeBoardIcon.png'} alt="CaroImage" width="100%"/>
                      </Grid>
                    </Box>
                    {createRoomError ?
                      <Grid container item xs={12} justify="center">
                          <Alert severity="error">
                            {createRoomError}
                          </Alert>
                      </Grid> :  null
                    }
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseCreateRoom} color="secondary">
                    Đóng
                  </Button>
                  <Button type="submit" color="primary" disabled={disableForm || (roomType === 1 ?  false : (!roomPassword || roomPassword.length < 6) ? true : false)}>
                    Tạo
                  </Button>
                </DialogActions>
                </form>
                {/* Loading backdrop */}
                <Backdrop open={openBackdrop} style={{color: "#fff" , zIndex: 100}}>
                  <CircularProgress color="inherit" />
                </Backdrop>
              </Dialog>  

              {/* Password type in dialog */}
              <Dialog
                fullWidth
                maxWidth="sm"
                open={roomToTypePassword ? true : false}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClosePasswordPromptDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description">
                 <form onSubmit={async (e) => {
                  e.preventDefault();
                  setDisableForm(true);
                  setOpenBackdrop(true);

                  try{
                    // api call here
                    await Axios.post(API.url + `/api/room-management/room/check-can-join/${roomToTypePassword._id}`, {
                      room_password: verifyPassword
                    });

                    const roomLink = `/room/${roomToTypePassword._id}`;
                    window.location.href=roomLink;
                  } catch (e) {
                    setOpenBackdrop(false);
                    setDisableForm(false);
                    setVerifyPasswordError('Có lỗi xảy ra khi tham gia vào phòng chơi, vui lòng kiểm tra lại mật khẩu đã nhập hoặc refresh');
                    return;
                  }
                }}>
                   <DialogTitle>
                  <Typography color="primary">
                    {"Nhập mật khẩu"}
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Vui lòng nhập mật khẩu để tham gia vào phòng
                  </DialogContentText>
                  <TextField
                    variant="outlined"
                    required
                    autoFocus
                    id="passwordVerifyField"
                    label="Mật khẩu phòng"
                    fullWidth
                    type="password"
                    placeholder="Nhập mật khẩu dài từ 6 ký tự trở lên, từ 36 ký tự trở xuống"
                    disabled={disableForm}
                    value={verifyPassword ? verifyPassword : ''}
                    onChange={(e) => {
                      e.target.value = e.target.value.slice(0,Math.min(36, e.target.value.length));
                      setVerifyPassword(e.target.value);
                    }}
                    margin="normal"
                  />
                  {verifyPasswordError ?
                    <Grid container item xs={12} justify="center">
                        <Alert severity="error">
                          {verifyPasswordError}
                        </Alert>
                    </Grid> :  null
                  }
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClosePasswordPromptDialog} color="secondary">
                    Đóng
                  </Button>
                  <Button type="submit" color="primary" disabled={disableForm || !verifyPassword || verifyPassword.length < 6}>
                    Vào
                  </Button>
                </DialogActions>
                </form>
                {/* Loading backdrop */}
                <Backdrop open={openBackdrop} style={{color: "#fff" , zIndex: 100}}>
                  <CircularProgress color="inherit" />
                </Backdrop>
              </Dialog>   

              {/* Error dialog */}
              <Dialog
                fullWidth
                maxWidth="sm"
                open={indexError ? true : false}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseErrorDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description">
                <DialogTitle>
                  <Typography color="secondary">
                    {"Đã xảy ra lỗi..."}
                  </Typography>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    {indexError}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseErrorDialog} color="secondary">
                    Đóng
                  </Button>
                </DialogActions>
              </Dialog>   
        </Grid>
      </Container>

      {/* Loading backdrop */}
      <Backdrop open={openBackdrop} style={{color: "#fff" , zIndex: 100}}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Join room backdrop */}
      <Backdrop open={openRejoinRoomBackdrop ? true : false} style={{color: "#000000" , zIndex: 100}}>
        <Button color="primary" variant="contained" onClick={() => {
            history.push(`/room/${openRejoinRoomBackdrop.toString()}`);
        }}> 
        Vào phòng lại
        </Button>
      </Backdrop>
    </div>
  );
}