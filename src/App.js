import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/auth.js";
import CssBaseline from "@material-ui/core/CssBaseline";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute.js";
import CustomAppBar from './components/CustomAppBar/CustomAppBar.js';
import ChatBox from "./components/ChatBox/ChatBox.js";

import Index from "./views/Index/Index";
import Login from "./views/Login/Login";
import SignUp from "./views/SignUp/SignUp";
import Ranking from "./views/Ranking/Ranking";
import GameRoom from "./views/GameRoom/gameRoom-component";

import PlayerCard from "./components/PlayerCard/playerCard-component";

import {Backdrop, Grid, Typography, CircularProgress} from '@material-ui/core';

import CaroOnlineStore from './redux/store';
import History from "./components/Room/history-component.js";
import RoomTab from "./components/Room/RoomTab-component.js";
import OnlineList from "./components/OnlineList/onlineList-component.js";
import socket from './services/socket';
import RewatchRoom from "./views/RewatchRoom/rewatchRoom-component.js";
import ClientUserProfile from "./views/UserProfile/ClientUserProfile.js";

function App() {
  const [isLoadingPrompt, setLoadingPrompt] = useState(null);

  useEffect(() => {
    const unsubcribe = CaroOnlineStore.subscribe(() => {
      const appState = CaroOnlineStore.getState();
      setLoadingPrompt(appState.isAwaitingServerResponse);
    });

    return () => {
      unsubcribe();
    }
  }, []);

  return (
    <AuthProvider>
        <Router>
          <React.Fragment>
            <CssBaseline />
            <CustomAppBar></CustomAppBar>
            <main>
              <Switch>
                {/* <PrivateRoute exact path="/" component={Index} /> */}
                {/* <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} /> */}

                <PrivateRoute exact path="/">
                  <Index />
                </PrivateRoute>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/signup">
                  <SignUp />
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

                <Route exact path ='/game-records/:id'>
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

                <Route exact path ='/test/online'>
                  <OnlineList></OnlineList>
                </Route>

                <Route exact path ='/test/record/:id'>
                  <RewatchRoom></RewatchRoom>
                </Route>
              </Switch>
            </main>
          <OnlineList></OnlineList>
          </React.Fragment>
          <Backdrop open={isLoadingPrompt !== null} style={{color: "#fff" , zIndex: 100}}>
            <Grid container item justify="center">
              <Grid item xs={12}>
                <CircularProgress color="inherit" />
              </Grid>     
              <Grid item xs={12}>
                <Typography variant="body1" style={{color: 'white'}}>
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
