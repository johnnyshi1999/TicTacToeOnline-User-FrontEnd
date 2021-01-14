import { IconButton, InputBase, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useRef, useState } from "react";
import SendIcon from "@material-ui/icons/Send";
import { useGame } from "../../contexts/game";
import socket from "../../services/socket";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    maxWidth: 400,
    display: "grid",
    gridTemplateRows: "1fr 45px",
    gridTemplateColumns: "1fr",
  },
  msgContainer: {
    marginBottom: theme.spacing(1),
    display: "flex",
    flexFlow: "column",
    overflow: "auto",
    maxHeight: 500,
  },

  message: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  bottomBar: {
    gridRow: "5/6",
    display: "flex",
  },
  inputContainer: {
    width: "100%",
  },
  inputBase: {
    width: "100%",
    padding: theme.spacing(1, 2),
    backgroundColor: "#f0f2f5",
    borderRadius: theme.spacing(16),
  },
  buttonSend: {
    marginLeft: theme.spacing(1),
    color: "#0099ff",
  },
}));

export default function ChatHistory() {
  const { chat } = useGame();

  console.log(chat);

  // const handleOnChangeMessage = (e) => {
  //   const trimedMessage = e.target.value.trim();
  //   setMessage(trimedMessage);
  // }

  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Paper elevation={0} className={classes.msgContainer}>
        {
          chat ?
            <div>
              {chat.messages.map((e) => {
                return (
                  <Typography className={classes.message}>
                    {`${e.username}: ${e.message}`}
                  </Typography>
                )
              })}
            </div>
            :

            <div></div>

        }

      </Paper>
    </Paper>
  );
}
