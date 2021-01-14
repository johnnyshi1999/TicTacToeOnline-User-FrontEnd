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
import { useParams } from "react-router-dom";
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
}));

export default function ForgotPassword() {
  const classes = useStyles();
  const emailRef = React.useRef();
  const [msg, setMsg] = React.useState("");
  const [severity, setSeverity] = React.useState("error");
  const [sentReqSuccessfully, setSentReqSuccessfully] = React.useState(false);

  const checkInput = () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(emailRef.current.value)) {
      return false;
    }
    return true;
  };

  const handleClick = async () => {
    if (!checkInput()) {
      setMsg("Email format wrong!");
      return;
    }
    // send request
    const response = await axios.post(`${API.url}/api/auth/recover`, {
      email: emailRef.current.value,
    });

    console.log(response);

    if (response.status === 200) {
      setSeverity("success");
      setSentReqSuccessfully(true);
    }
    setMsg(response.data.message);
  };

  return (
    <Container maxWidth="sm">
      <div className={classes.root}>
        <Typography gutterBottom variant="h4" align="center">
          ENTER YOUR EMAIL
        </Typography>

        {msg && <Alert severity={severity}>{msg}</Alert>}

        <TextField
          className={classes.textField}
          id="email"
          label="Your email"
          variant="outlined"
          inputRef={emailRef}
          required
          autoFocus
        />
        <Button
          onClick={handleClick}
          variant="contained"
          disabled={sentReqSuccessfully}
        >
          Send
        </Button>
      </div>
    </Container>
  );
}
