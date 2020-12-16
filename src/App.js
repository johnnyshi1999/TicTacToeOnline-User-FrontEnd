import React, {  } from "react";

import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Index from './domains/Index/index-component.js';
import Login from './domains/Login/login-component.js';
import SignUp from "./domains/SignUp/signUp-component.js";
import { AuthProvider } from "./context/auth.js";
import PrivateRoute from "./components/PrivateRoute.js";
import CustomAppBar from './components/customAppBar-component.js';
import GameRoom from "./domains/GameRoom/gameRoom-component.js";



function App() {
  // const existingTokens = localStorage.getItem("token");
  // const [authTokens, setAuthTokens] = useState(existingTokens);
  // const [isLoaded, setIsLoaded] = useState(true);

  // const setTokens = (data) => {
  //   if (data) {
  //     localStorage.setItem("token", data);
  //   }
  //   else {
  //     localStorage.removeItem("token");
  //   }

  //   setAuthTokens(data);
  // }

  // Axios.interceptors.request.use(
  //   config => {
  //     const token = localStorage.getItem('token');
  //     config.headers.authorization = `Bearer ${token}`;
  //     return config;
  //   },
  // )

  // Axios.interceptors.response.use(
  //   function (response) {
  //     return response;
  //   },
  //   function (error) {
  //     if (error.response) {
  //       //if unauthorized, will direct back to login
  //       if (error.response.status === 401) {
  //         console.log("axios intercept");
  //         setAuthTokens(null);
  //       }
  //     }
  //     throw error;
  //   }
  // )

  return (
    <AuthProvider>
      <Router>
      <React.Fragment>
          <CssBaseline />
          {/* <Backdrop className={classes.backdrop} open={!isLoaded}>
              <CircularProgress color="inherit" />
            </Backdrop> */}
          {/* <AppBar position="relative">
            <Toolbar>
              <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                Retro Board List
              </Typography>
              {authTokens ?
                (
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                ) :
                (
                  <div>
                    <Button className={classes.signUpButton} color="inherit" href="/signup">
                      Sign Up
                    </Button>
                    <Button className={classes.loginButton} color="inherit" href="/login">
                      Login
                    </Button>
                  </div>
                )}

            </Toolbar>
          </AppBar> */}
          <CustomAppBar></CustomAppBar>
          <main>
            
            <PrivateRoute exact path="/" component={Index} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <PrivateRoute exact path="/game/:id" component={GameRoom}/>

            {/* Hero unit */}

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
