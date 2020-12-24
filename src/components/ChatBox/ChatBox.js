import {
  Button,
  IconButton,
  InputBase,
  List,
  ListItem,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import MessageItem from "./MessageItem";
import SendIcon from "@material-ui/icons/Send";

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
    gridRow: "1/5",
    marginBottom: theme.spacing(1),
    display: "flex",
    flexFlow: "column",
    overflow: "auto",
    maxHeight: 500,
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
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Paper elevation={0} className={classes.msgContainer}>
        {chatData.map((chatInfo) => (
          <MessageItem
            name={chatInfo.name}
            avatar={chatInfo.avatar}
            msgList={chatInfo.msgList}
            direction={chatInfo.direction}
          />
        ))}
      </Paper>

      <div className={classes.bottomBar}>
        <Paper elevation={0} className={classes.inputContainer}>
          <InputBase className={classes.inputBase} />
        </Paper>
        {/* <Button
          className={classes.buttonSend}
          variant="contained"
          color="primary"
        >
        </Button> */}
        <IconButton className={classes.buttonSend} variant="contained">
          <SendIcon />
        </IconButton>
      </div>
    </Paper>
  );
}
