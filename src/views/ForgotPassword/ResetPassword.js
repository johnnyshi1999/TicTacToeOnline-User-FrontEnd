import {
  Button,
  Container,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import API from "../../services/api";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "300",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  textField: {
    margin: theme.spacing(2, 0),
  },
  alert: {
    margin: theme.spacing(1, 0),
  },
}));

const timeCountDown = 5;

export default function ResetPassword() {
  const { resetPasswordToken } = useParams();
  const classes = useStyles();
  const newPasswordRef = React.useRef();
  const confirmPasswordRef = React.useRef();
  const [responseMsg, setResponseMsg] = React.useState();
  const [severity, setSeverity] = React.useState("error");
  const [resetSuccessfully, setResetSuccessfully] = React.useState(false);
  const [count, setCount] = React.useState(timeCountDown);
  const history = useHistory();

  const checkInput = () => {
    if (newPasswordRef.current.value !== confirmPasswordRef.current.value) {
      return false;
    }

    return true;
  };

  const handleClick = async () => {
    if (!checkInput()) {
      setSeverity("error");
      setResponseMsg("Passwords do not match!");
      return;
    }
    // send request
    const response = await axios.post(
      `${API.url}/api/auth/reset/${resetPasswordToken}`,
      {
        password: newPasswordRef.current.value,
        confirmPassword: confirmPasswordRef.current.value,
      }
    );

    console.log(response);

    if (response.status === 200) {
      setSeverity("success");
      setResetSuccessfully(true);
    }
    setResponseMsg(response.data.message);
  };

  React.useEffect(() => {
    if (resetSuccessfully) {
      const timeout = setTimeout(() => history.push("/"), timeCountDown * 1000);

      return () => clearTimeout(timeout);
    }
  }, [resetSuccessfully, history]);

  React.useEffect(() => {
    if (resetSuccessfully) {
      const interval = setInterval(() => setCount(count - 1), 1000);

      return () => clearInterval(interval);
    }
  }, [resetSuccessfully, count]);

  return (
    <Container maxWidth="sm">
      <div className={classes.root}>
        <Typography gutterBottom variant="h4" align="center">
          RESET YOUR PASSWORD
        </Typography>
        {responseMsg && (
          <Alert className={classes.alert} severity={severity}>
            {responseMsg}
          </Alert>
        )}
        {resetSuccessfully && (
          <Alert
            className={classes.alert}
            severity="info"
          >{`You will be redirect to login page in ${count}s.`}</Alert>
        )}
        <TextField
          className={classes.textField}
          id="new-password"
          label="New password"
          variant="outlined"
          inputRef={newPasswordRef}
          required
          autoFocus
          type="password"
        />
        <TextField
          className={classes.textField}
          id="confirm-new-password"
          label="Confirm new password"
          variant="outlined"
          inputRef={confirmPasswordRef}
          required
          type="password"
        />
        <Button onClick={handleClick} variant="contained">
          Reset
        </Button>
      </div>
    </Container>
  );
}
