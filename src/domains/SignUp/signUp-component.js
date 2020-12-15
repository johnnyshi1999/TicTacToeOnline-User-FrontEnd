import React, { useState } from 'react';
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
import API from '../../services/api';
import { useAuth } from '../../context/auth';
import { Redirect } from 'react-router-dom';

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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  signUpMessage: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(-2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const { setAuthTokens } = useAuth();

  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [firstNameValue, setFirstNameValueValue] = useState("");
  const [lastNameValue, setLastNameValueValue] = useState("");
  const [signUpMessage, setSignUpMessage] = useState("");

  const [doesSignedUp, setDoesSignedUp] = useState(false);

  const checkInput = () => {
    if (firstNameValue.length === 0 || lastNameValue.length === 0 || emailValue.length === 0) {
      return "Mssing Information, please fill out all of required fields";
    }
    if (passwordValue.length < 5) {
      return "Password too short, must be more than 5 characters";
    }
    return null;
  }

  const handleChange = (e, setValue) => {
    setValue(e.target.value);
  }

  const handleSignUp = async () => {
    const newUser = {
      username: usernameValue,
      firstName: firstNameValue,
      lastName: lastNameValue,
      password: passwordValue,
      email: emailValue,
    }
    console.log(newUser);
    const check = checkInput();
    if (check) {
      setSignUpMessage(check);
      return;
    }
    try {
      const result = await Axios.post(API.url + "/api/auth/register", newUser);
      console.log(result);
      const data = result.data;

      if (data.token) {
        setAuthTokens(data.token);
        setDoesSignedUp(true);
      }
      else {
        setSignUpMessage(data.message);
      }

    } catch (error) {
      setSignUpMessage("Something went wrong, please try again");
      console.log(error);
    }
  }

  if (doesSignedUp) {
    return (
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
          Sign up
        </Typography>
        <Typography variant="caption" className={classes.signUpMessage} color="error" gutterBottom>
          {signUpMessage}
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => handleChange(e, setUsernameValue)}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => handleChange(e, setEmailValue)}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => handleChange(e, setFirstNameValueValue)}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(e) => handleChange(e, setLastNameValueValue)}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                onChange={(e) => handleChange(e, setPasswordValue)}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            onClick={handleSignUp}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}