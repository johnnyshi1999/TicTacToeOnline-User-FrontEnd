import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/auth.js";
import CssBaseline from "@material-ui/core/CssBaseline";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute.js";
import CustomAppBar from "./components/CustomAppBar/CustomAppBar.js";
import ChatBox from "./components/ChatBox/ChatBox.js";

import Index from "./views/Index/Index";
import Login from "./views/Login/Login";
import SignUp from "./views/SignUp/SignUp";
import Ranking from "./views/Ranking/Ranking";
import GameRoom from "./views/GameRoom/gameRoom-component";

import PlayerCard from "./components/PlayerCard/playerCard-component";

import {
  Backdrop,
  Grid,
  Typography,
  CircularProgress,
} from "@material-ui/core";

import CaroOnlineStore from "./redux/store";
import History from "./components/Room/history-component.js";
import RoomTab from "./components/Room/RoomTab-component.js";
import OnlineList from "./components/OnlineList/onlineList-component.js";
import socket from "./services/socket";
import RewatchRoom from "./views/RewatchRoom/rewatchRoom-component.js";
import ClientUserProfile from "./views/UserProfile/ClientUserProfile.js";

import Global_IsAwaitingServerResponse_ActionCreator from "./redux/actionCreators/Global_IsAwaitingServerResponse_ActionCreator";
import ForgotPassword from "./views/ForgotPassword/ForgotPassword.js";
import ResetPassword from "./views/ForgotPassword/ResetPassword.js";
import ActivateAccount from "./views/Activate/ActivateAccount.js";
import { CustomBackdrop } from "./components/customBackdrop.js";
import OtherUserProfile from "./views/otherUserProfile/OtherUserProfile.js";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

function App() {
  const classes = useStyles();
  const [isLoadingPrompt, setLoadingPrompt] = useState(null);

  useEffect(() => {
    const unsubcribe = CaroOnlineStore.subscribe(() => {
      const appState = CaroOnlineStore.getState();
      setLoadingPrompt(appState.isAwaitingServerResponse);
    });

    socket.on("is-matchmaking", ({ state }) => {
      setLoadingPrompt(state ? "Đang chờ đợi nối cặp từ phía server..." : null);
    });

    socket.on("is-waiting-create-room", ({ state }) => {
      setLoadingPrompt(
        state ? "Tìm được người thích hợp, đang tạo phòng..." : null
      );
    });

    socket.on("matchmake-success", ({ yourUserId }) => {
      CaroOnlineStore.dispatch(
        Global_IsAwaitingServerResponse_ActionCreator(
          "Tìm được người thích hợp, đang tạo phòng..."
        )
      );
      socket.emit("accept matchmake", { myUserId: yourUserId });
    });

    socket.on("room-create-success", ({ yourRoom }) => {
      const roomId = yourRoom._id.toString();
      const roomLink = `/room/${roomId}`;
      window.location.href = roomLink;
      return;
    });

    return () => {
      unsubcribe();
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <React.Fragment>
          <CssBaseline />
          <CustomAppBar
            style={
              isLoadingPrompt !== null
                ? {
                    display: "none",
                  }
                : { display: "flex" }
            }
          ></CustomAppBar>
          <main>
            <Switch>
              <PrivateRoute exact path="/">
                <Index />
              </PrivateRoute>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/activate/:activationToken">
                <ActivateAccount />
              </Route>
              <Route exact path="/forgot-password">
                <ForgotPassword />
              </Route>
              <Route exact path="/reset-password/:resetPasswordToken">
                <ResetPassword />
              </Route>

              <PrivateRoute exact path="/ranking">
                <Ranking />
              </PrivateRoute>
              <PrivateRoute exact path="/room/:id">
                <GameRoom />
              </PrivateRoute>

              <PrivateRoute exact path="/profile">
                <ClientUserProfile></ClientUserProfile>
              </PrivateRoute>

              <PrivateRoute exact path="/users/:username">
                <OtherUserProfile></OtherUserProfile>
              </PrivateRoute>

              <Route exact path="/game-records/:id">
                <RewatchRoom></RewatchRoom>
              </Route>

              {/* Test area */}
              <Route exact path="/test/chatBox">
                <ChatBox />
              </Route>
              <Route exact path="/test/characterCard">
                <PlayerCard></PlayerCard>
              </Route>

              <Route exact path="/test/history">
                <History></History>
              </Route>

              <Route exact path="/test/RoomTab">
                <RoomTab></RoomTab>
              </Route>

              <Route exact path="/test/online">
                <OnlineList></OnlineList>
              </Route>

              <Route exact path="/test/record/:id">
                <RewatchRoom></RewatchRoom>
              </Route>
            </Switch>
          </main>
          {/* <Grid container>
            <OnlineList></OnlineList>
          </Grid> */}
        </React.Fragment>
        <Backdrop
          open={isLoadingPrompt !== null}
          style={{ color: "#fff", zIndex: 100 }}
        >
          <Grid container item justify="center">
            <Grid container item xs={12} justify="center">
              <CircularProgress color="inherit" />
            </Grid>
            <Grid container item xs={12} justify="center">
              <Typography variant="body1" style={{ color: "white" }}>
                {isLoadingPrompt}
              </Typography>
            </Grid>
          </Grid>
        </Backdrop>
      </Router>
    </AuthProvider>
  );
}

export default App;
