import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  // default is left
  root: {
    padding: theme.spacing(1, 2),
    margin: theme.spacing(0.5, 0),
    borderRadius: theme.spacing(2),
    backgroundColor: "#f0f2f5",
    color: "#000",
  },
  right: {
    backgroundColor: "#0099ff",
    color: "#fff",
  },

  // custom border-radius
  firstMsgInGroupLeft: {
    borderBottomLeftRadius: theme.spacing(0.7),
  },
  lastMsgInGroupLeft: {
    borderTopLeftRadius: theme.spacing(0.7),
  },
  firstMsgInGroupRight: {
    borderBottomRightRadius: theme.spacing(0.7),
  },
  lastMsgInGroupRight: {
    borderTopRightRadius: theme.spacing(0.7),
  },
}));
export default function MessageBubble({
  children,
  isFirstMsg,
  isLastMsg,
  direction,
}) {
  const classes = useStyles();

  if (isFirstMsg) {
    return (
      <div
        className={`${classes.root} ${
          direction === "left"
            ? classes.firstMsgInGroupLeft
            : `${classes.firstMsgInGroupRight} ${classes.right}`
        }`}
      >
        {children}
      </div>
    );
  }
  if (isLastMsg) {
    return (
      <div
        className={`${classes.root} ${
          direction === "left"
            ? classes.lastMsgInGroupLeft
            : `${classes.lastMsgInGroupRight}  ${classes.right}`
        }`}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={`${classes.root} ${direction === "left" ? "" : classes.right}`}
    >
      {children}
    </div>
  );
}
