import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/auth.js";
import { SocketProvider } from "./contexts/socket.js";
import CssBaseline from "@material-ui/core/CssBaseline";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute.js";
import CustomAppBar from './components/CustomAppBar/CustomAppBar.js';
import ChatBox from "./components/ChatBox/ChatBox.js";

import Index from "./views/Index/Index";
import Login from "./views/Login/Login";
import SignUp from "./views/SignUp/SignUp";
import Ranking from "./views/Ranking/Ranking";
import GameRoom from "./views/GameRoom/gameRoom-component";
import socket from "./services/socket";


function App() {
  
  return (
    <SocketProvider>
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
                <Route exact path="/ranking">
                  <Ranking />
                </Route>
                <Route exact path="/game/:id">
                  <GameRoom />
                </Route>

                {/* Test area */}
                <Route exact path="/test/chatBox">
                  <ChatBox />
                </Route>
              </Switch>
            </main>
          </React.Fragment>
        </Router>
      </AuthProvider>
    </SocketProvider>
  );
}

export default App;
