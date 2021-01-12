import { IconButton, InputBase, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useRef, useState } from "react";
import MessageItem from "./MessageItem";
import SendIcon from "@material-ui/icons/Send";
import { useGame } from "../../contexts/game";
import socket from "../../services/socket";

const chatData = [
  {
    name: "Billy",
    msgList: ["Hello"],
    direction: "left",
  },
  {
    name: "Josh",
    msgList: ["Hi", "Triple message right.", "Triple message right."],
    direction: "right",
  },
  {
    name: "Anna",
    msgList: ["Double message left", "Double message left"],
    direction: "left",
  },
  {
    name: "Billy",
    msgList: ["Single message left"],
    direction: "left",
  },
  {
    name: "Josh",
    msgList: [
      "Hi",
      "Long message left. Long message left. Long message left. Long message left. ",
    ],
    direction: "left",
  },
  {
    name: "Anna",
    msgList: [
      "Long message right. Long message right. Long message right. Long message right. Long message right. ",
    ],
    direction: "right",
  },
  {
    name: "Smith",
    msgList: [
      "Standalone long message right. Standalone long message right. Standalone long message right. Standalone long message right. ",
    ],
    direction: "right",
  },
];

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

export default function ChatBox() {
  // const { username } = useGame();

  // const username = "hellothere"

  const { username, room, chat } = useGame();

  const msgContentRef = useRef();

  const handleClickSend = () => {



    // if (message.length > 0) {
    //   socket.emit("send-chat-message", { message: message, username: username });
    // }

    const msg = msgContentRef.current.value;

    const trimmedMesaage = msg.trim();

    if (trimmedMesaage.length > 0) {
      socket.emit("send-chat-message", { roomId: room._id, message: trimmedMesaage, username: username });
      msgContentRef.current.value = "";
      return;
    }
  }

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

      <div className={classes.bottomBar}>
        <Paper elevation={0} className={classes.inputContainer}>
          <InputBase
            className={classes.inputBase}
            inputRef={msgContentRef}
          />
        </Paper>
        {/* <Button
          className={classes.buttonSend}
          variant="contained"
          color="primary"
        >
        </Button> */}
        <IconButton className={classes.buttonSend} variant="contained" onClick={handleClickSend}>
          <SendIcon />
        </IconButton>
      </div>
    </Paper>
  );
}
