import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/auth.js";
import CssBaseline from "@material-ui/core/CssBaseline";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import CustomAppBar from "./components/CustomAppBar/CustomAppBar.js";
import ChatBox from "./components/ChatBox/ChatBox.js";

import Index from "./views/Index/Index";
import Login from "./views/Login/Login";
import SignUp from "./views/SignUp/SignUp";
import Ranking from "./views/Ranking/Ranking";

function App() {
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
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/ranking">
                <Ranking />
              </Route>

              {/* Test area */}
              <Route path="/test/chatBox">
                <ChatBox />
              </Route>
            </Switch>
          </main>
        </React.Fragment>
      </Router>
    </AuthProvider>
  );
}

export default App;
