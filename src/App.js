import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Index from "./domains/Index/index-component.js";
import Login from "./domains/Login/login-component.js";
import SignUp from "./domains/SignUp/signUp-component.js";
import { AuthProvider } from "./context/auth.js";
import PrivateRoute from "./components/PrivateRoute.js";
import CustomAppBar from "./components/customAppBar-component.js";
import ChatBox from "./components/ChatBox.js";

function App() {
  return (
    <AuthProvider>
      <Router>
        <React.Fragment>
          <CssBaseline />
          <CustomAppBar></CustomAppBar>
          <main>
            <Switch>
              <PrivateRoute exact path="/" component={Index} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />

              {/* Test area */}
              <Route path="/test/chatBox">
                <ChatBox />
              </Route>
            </Switch>
          </main>
          {/* Footer */}
          {/* <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
              Footer
        </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
              Something here to give the footer a purpose!
        </Typography>
          </footer> */}
          {/* End footer */}
        </React.Fragment>
      </Router>
    </AuthProvider>
  );
}

export default App;
