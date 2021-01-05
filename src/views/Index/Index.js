import React, { useEffect, useState } from "react";
import RoomNavigator from "../../components/Room-Navigator-ForIndex/Room-Navigator";
import FilterSideMenu from "../../components/Filter-SideMenu-ForIndex/Filter-SideMenu";
import RoomsGrid from '../../components/Rooms-Grid-ForIndex/Rooms-Grid';

import { Grid, Container, Box, Dialog, Button, Slide, TextField, Select, MenuItem, FormControl, InputLabel, Typography} from "@material-ui/core";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Alert} from '@material-ui/lab';

import { makeStyles } from  "@material-ui/core";
import {Backdrop, CircularProgress} from '@material-ui/core';

import { useSocket} from '../../contexts/socket';
import Axios from "axios";

import API from '../../services/api';

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

  //State for create room dialog
  const [openCreateRoomDialog, setOpenCreateRoomDialog] = React.useState(false);
  const [disableForm, setDisableForm] = useState(false);
  const [roomName, setRoomName] = useState(null);
  const [roomDescription, setRoomDescription] = useState(null);
  const [roomType, setRoomType] = useState(1);
  const [roomPassword, setRoomPassword] = useState(null);
  const [createRoomError, setCreateRoomError] = useState(null);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const handleClickOpen = () => {
    setDisableForm(false);
    setOpenCreateRoomDialog(true);
  };

  const handleClose = () => {
    setOpenCreateRoomDialog(false);
    setRoomName(null);
    setRoomDescription(null);
    setRoomPassword(null);
    setRoomType(1);
    setDisableForm(false);
  };

  const {socket} = useSocket();

  useEffect(() => {
    if(socket){
      socket.emit('page-status', 'index-page');
    }
  }, [socket]);

  const handleCreateClick = async () => {
    const data = {
      maxCol: 20,
      maxRow: 20,
      winCondition: 5,
    }
    try {
      const result = await Axios.post(API.url + "/game/create", data);
      console.log(result);
      const gameLink = `/game/${result.data.game._id}`;
      // history.push(gameLink);
      window.location.href=gameLink;
    } catch(error) {
      console.log(error);
    }
  }

  const handleJoinClick = async () => {

  };

  return(
    <div className={classes.root}>
      <Container maxWidth="xl" className={classes.container}>
        <Grid container spacing={3} className={classes.pageContent}>
            <Grid container item xs={12} md={10} justify="center" className={classes.roomNavigationBarArea}>
              <RoomNavigator onCreateRoomClick={handleClickOpen} onJoinRoomClick={handleJoinClick}/>
            </Grid>  
            <Box component={Grid} container item md={2} display={{xs: "none", md:"flex"}}>
            </Box>
            <Grid container item xs={12} md={10} justify="center" className={classes.indexContentArea}>
              <FilterSideMenu/>
              <RoomsGrid/>
            </Grid>  
            <Box component={Grid} container item md={2} display={{xs: "none", md:"flex"}}>
            </Box>
            <Grid container item xs={12} md={10}>
              <Dialog fullScreen open={openCreateRoomDialog} onClose={handleClose} TransitionComponent={Transition}
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

                    const {message, data} = newRoom.data;

                  } catch (e) {
                    setOpenBackdrop(false);
                    setDisableForm(false);
                    setCreateRoomError('Có lỗi xảy ra trong lúc đang tạo phòng');
                    return;
                  }

                  setOpenBackdrop(false);
                  handleClose();
                }}>
                <DialogContent>
                  <DialogContentText>
                    Nhập các thông tin dưới đây để tạo phòng chơi
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
                                Riêng tư
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
                        placeholder="Nhập mật khẩu dài từ 6 ký tự trở lên"
                        value={roomPassword ? roomPassword : ''}
                        style={{
                          visibility: roomType === 1 ? 'collapse' : 'visible'
                        }}
                        type="password"
                        onChange={(e) => {
                          e.target.value = e.target.value.slice(0,Math.min(256, e.target.value.length));
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
                  <Button onClick={handleClose} color="secondary">
                    Đóng
                  </Button>
                  <Button type="submit" color="primary" disabled={disableForm || (roomType === 1 ?  false : (!roomPassword || roomPassword.length < 6) ? true : false)}>
                    Tạo
                  </Button>
                </DialogActions>
                </form>
                <Backdrop open={openBackdrop} style={{color: "#fff" , zIndex: 100}}>
                  <CircularProgress color="inherit" />
                </Backdrop>
              </Dialog>   
            </Grid>          
        </Grid>
      </Container>
    </div>
  );
}