import React, { useEffect, useState } from "react";
import RankingTable from "../../components/RankingTable/RankingTable";
import Axios from 'axios';
import API from "../../services/api";

import { Button, Typography, Dialog, Slide, Backdrop, Grid, CircularProgress, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';

import { useHistory } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Ranking() {
  const [userList, setUserList] = useState(null);
  const [isLoadingPrompt, setLoadingPrompt] = useState("Đang tải bảng xếp hạng, vui lòng chờ...");
  const [errorDialogText, setErrorDialogText] = useState(null);

  const history = useHistory();

  useEffect(() => {
    //fetch ranking list
    (async () => {
      try {
        const users = await Axios.get(API.url + '/api/users');
        const consequence = users.data.sort((user1, user2) => user2.trophies - user1.trophies);
        setUserList(consequence);
        console.log(consequence);
      } catch (e) {
        console.log(e);
        setLoadingPrompt(null);
        setErrorDialogText('Đã xảy ra lỗi khi load BXH, bạn sẽ được điều hướng về trang chủ sau đây');
        return;
      }
      setLoadingPrompt(null);
    })();
  }, []);

  const handleErrorDialogClose = () => {
    setErrorDialogText(null);
    setLoadingPrompt('Đang điều hướng về trang chủ...');
    history.push('/');
  };

  return (<Grid container item xs={12}>
    {
      userList ? <RankingTable rankData={userList} /> : null
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
      <Grid container item justify="center" width="100%">
        <Grid container item xs={12} justify="center"><CircularProgress color="inherit" /></Grid>
        <Grid container item xs={12} justify="center">
          <Typography variant="body1" style={{ color: 'white' }}>
            {isLoadingPrompt}
          </Typography>
        </Grid>
      </Grid>
    </Backdrop>
  </Grid>);
}
