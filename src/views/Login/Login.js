import React, { useEffect, useState, useCallback } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Axios from "axios";

import API from "../../services/api.js";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../contexts/auth.js";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login({ onLogin }) {
  const classes = useStyles();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const { setAuthTokens } = useAuth();

  const handleChange = (e, setValue) => {
    setValue(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const data = {
        email: emailValue,
        password: passwordValue,
      };
      const result = await Axios.post(API.url + "/api/auth/login", data);
      const responseData = result.data;

      console.log(responseData);

      if (responseData.token) {
        const token = responseData.token;
        console.log(token);
        setAuthTokens(responseData.token);
        setIsLoggedIn(true);
      } else {
        setLoginMessage(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/"></Redirect>;
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
        <Typography
          variant="caption"
          className={classes.loginMessage}
          color="error"
          gutterBottom
        >
          {loginMessage}
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            onChange={(e) => handleChange(e, setEmailValue)}
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
            onChange={(e) => handleChange(e, setPasswordValue)}
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

          <div id="facebookButtonNavigationDiv"></div>

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
