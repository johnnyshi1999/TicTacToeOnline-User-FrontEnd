import { Avatar } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MessageBubble from "./MessageBubble";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: theme.spacing(0.25, 1),
  },
  left: {
    justifyContent: "flex-start",
  },
  right: {
    justifyContent: "flex-end",
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  groupMsg: {
    display: "flex",
    flexDirection: "column",
  },
  groupMsgLeft: {
    alignItems: "flex-start",
    margin: theme.spacing(0, 8, 0, 0),
  },
  groupMsgRight: {
    alignItems: "flex-end",
    margin: theme.spacing(0, 0, 0, 8),
  },
}));

export default function MessageItem({ name, avatarUrl, msgList, direction }) {
  const classes = useStyles();

  return (
    <div
      className={`${classes.root} ${
        direction === "left" ? classes.left : classes.right
      }`}
    >
      {direction === "left" && (
        <Avatar
          alt={name}
          src={avatarUrl ? avatarUrl : `/dummy-image-to-fallback.jpg`}
          className={classes.avatar}
        />
      )}
      <div
        className={`${classes.groupMsg} ${
          direction === "left" ? classes.groupMsgLeft : classes.groupMsgRight
        }`}
      >
        {msgList.map((singleMsg, index) => (
          <MessageBubble
            isFirstMsg={index === 0 && msgList.length !== 1}
            isLastMsg={index === msgList.length - 1 && msgList.length !== 1}
            direction={direction}
          >
            {singleMsg}
          </MessageBubble>
        ))}
      </div>
    </div>
  );
}
