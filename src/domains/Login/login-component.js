/*global FB*/

import React, { useEffect, useState, useCallback } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from 'axios';

import API from "../../services/api.js";
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../context/auth.js';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  loginMessage: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(-2),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login({onLogin}) {
  const classes = useStyles();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const {setAuthTokens} = useAuth();

  const handleChange = (e, setValue) => {
    setValue(e.target.value);
  }

  const handleSubmit = async () => {
    try {
      const data = {
        email: emailValue,
        password: passwordValue,
      }
      const result = await Axios.post(API.url + "/auth/login", data);
      const responseData = result.data;

      console.log(responseData);

      if (responseData.token) {
        const token = responseData.token;
        console.log(token);
        setAuthTokens(responseData.token);
        setIsLoggedIn(true);
      }
      else {
        setLoginMessage(responseData.message);
      }
      
    } catch(error) {
      console.log(error);
    }
  }

  // This is called with the results from from FB.getLoginStatus().
  const statusChangeCallback = useCallback(async (response) => {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {

      /*********** Send access token to backend here ***********/

      setAuthTokens(response.authResponse.accessToken);
      // Logged into your app and Facebook.
      setIsLoggedIn(true);
    } else {
      setLoginMessage("User is not authorized");
      setIsLoggedIn(false);
    }
  }, [setAuthTokens]);

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  const checkLoginState = useCallback(async () => {
    FB.login((response) => { 
      //Turn on loading dropback before calling this
      statusChangeCallback(response);
    });
  }, [statusChangeCallback]);

  // Init FB login for this component
  useEffect(() => {
    window.fbAsyncInit = () => {
        FB.init({
          appId      : process.env.REACT_APP_FACEBOOK_APP_ID,
          cookie     : true,  // enable cookies to allow the server to access
                            // the session
          xfbml      : true,  // parse social plugins on this page
          version    : 'v2.6' // use version 2.6
        });
    
        // Now that we've initialized the JavaScript SDK, we call
        // FB.getLoginStatus().  This function gets the state of the
        // person visiting this page and can return one of three states to
        // the callback you provide.  They can be:
        //
        // 1. Logged into your app ('connected')
        // 2. Logged into Facebook, but not your app ('not_authorized')
        // 3. Not logged into Facebook and can't tell if they are logged into
        //    your app or not.
        //
        // These three cases are handled in the callback function.

        FB.Event.subscribe('auth.statusChange', async (response) => {
          if (response.authResponse) {
            checkLoginState();
          } else {
            console.log('---->User cancelled login or did not fully authorize.');
          }
        });
      };
      // Load the SDK asynchronously
      ((d, s, id) => {
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        const js = d.createElement(s); 
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
  }, [checkLoginState]);

  if (isLoggedIn) {
    return(
      <Redirect to="/"></Redirect>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Typography variant="caption" className={classes.loginMessage} color="error" gutterBottom>
          {loginMessage}
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            onChange = {(e) => handleChange(e, setEmailValue)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
          />
          <TextField
            onChange = {(e) => handleChange(e, setPasswordValue)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            onClick={() => handleSubmit()}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>

          {/* Facebook login button */}
          <div className="fb-login-button" data-size="large" data-button-type="login_with" data-layout="rounded" data-auto-logout-link="false" data-use-continue-as="false" data-width=""></div>
          
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}