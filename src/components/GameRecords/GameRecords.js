import React from "react";
import { Link as RRDLink } from "react-router-dom";
import {
  Button,
  Chip,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
// icons
import FaceIcon from "@material-ui/icons/Face";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import ClearIcon from "@material-ui/icons/Clear";
//
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "900px",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },

  recordItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(1, 2),
    margin: theme.spacing(1, 0),
  },
  isWinner: {
    backgroundColor: "#a3cfec",
  },
  isLoser: {
    backgroundColor: "#e2b6b3",
  },

  gameInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "green",
  },
  singleInfo: {
    margin: theme.spacing(0, 1),
  },
  iconX: {
    color: "#f44336",
  },
  iconO: {
    color: "#2196f3",
  },
  createdAt: {
    // ...theme.typography.button,
  },
  buttonShowMore: {
    margin: theme.spacing(2, 0),
  },
  gridItemLeft: {
    backgroundColor: "blue",
  },
  RRDLinkNormalized: {
    textDecoration: "none",
    color: "inherit",
  },
}));

// function createData(player1, player2, winner, createdAt) {
//   return { player1, player2, winner, createdAt };
// }

// const data = [
//   {
//     // is player 1 and won
//     player1: "user001",
//     player2: "user0022222222",
//     winner: 1,
//     createdAt: new Date(Date.now()).toLocaleString(),
//   },
//   {
//     // is player 1 and lose
//     player1: "user001",
//     player2: "user003",
//     winner: 2,
//     createdAt: new Date(Date.now()).toLocaleString(),
//   },
//   {
//     // is player 2 and won
//     player1: "user0044444",
//     player2: "user001",
//     winner: 2,
//     createdAt: new Date(Date.now()).toLocaleString(),
//   },
//   {
//     // is player 2 and lose
//     player1: "user005",
//     player2: "user001",
//     winner: 1,
//     createdAt: new Date(Date.now()).toLocaleString(),
//   },
//   {
//     player1: "user001",
//     player2: "user005555",
//     winner: 1,
//     createdAt: new Date(Date.now()).toLocaleString(),
//   },
//   {
//     player1: "user001",
//     player2: "user00666666",
//     winner: 1,
//     createdAt: new Date(Date.now()).toLocaleString(),
//   },
//   {
//     player1: "user007",
//     player2: "user001",
//     winner: 1,
//     createdAt: new Date(Date.now()).toLocaleString(),
//   },
//   {
//     player1: "user008",
//     player2: "user001",
//     winner: 2,
//     createdAt: new Date(Date.now()).toLocaleString(),
//   },
//   //////////////////////////
//   {
//     player1: "user001",
//     player2: "user005555",
//     winner: 1,
//     createdAt: new Date(Date.now()).toLocaleString(),
//   },
//   {
//     player1: "user001",
//     player2: "user00666666",
//     winner: 1,
//     createdAt: new Date(Date.now()).toLocaleString(),
//   },
//   {
//     player1: "user007",
//     player2: "user001",
//     winner: 1,
//     createdAt: new Date(Date.now()).toLocaleString(),
//   },
//   {
//     player1: "user008",
//     player2: "user001",
//     winner: 2,
//     createdAt: new Date(Date.now()).toLocaleString(),
//   },
//   //////////////////////////
//   {
//     player1: "user001",
//     player2: "user005555",
//     winner: 1,
//     createdAt: new Date(Date.now()).toLocaleString(),
//   },
//   {
//     player1: "user001",
//     player2: "user00666666",
//     winner: 1,
//     createdAt: new Date(Date.now()).toLocaleString(),
//   },
//   {
//     player1: "user007",
//     player2: "user001",
//     winner: 1,
//     createdAt: new Date(Date.now()).toLocaleString(),
//   },
//   {
//     player1: "user008",
//     player2: "user001",
//     winner: 2,
//     createdAt: new Date(Date.now()).toLocaleString(),
//   },
//   //////////////////////////
// ];

export default function GameRecords({ username, data }) {
  const classes = useStyles();
  const [showQuantity, setShowQuantity] = React.useState(4);

  const handleClickOnUser = () => {};
  const handleClickDelete = () => {};
  const handleShowMore = () => {
    setShowQuantity(showQuantity + 5);
  };

  return (
    <Paper className={classes.root}>
      <Typography align="center" variant="h6">
        <strong>GAME RECORDS</strong>
      </Typography>
      {data.slice(0, showQuantity).map((record) => {
        return (
          <Paper
            key={record.gameId}
            elevation={3}
            className={clsx(classes.recordItem, {
              [classes.isWinner]:
                (record.winner === 1 &&
                  record.player1.username.toString() === username) ||
                (record.winner === 2 &&
                  record.player2.username.toString() === username),
              [classes.isLoser]:
                (record.winner === 1 &&
                  record.player1.username.toString() !== username) ||
                (record.winner === 2 &&
                  record.player2.username.toString() !== username),
            })}
          >
            <Grid container spacing={1} className={classes.gameInfo}>
              <Grid container xs={3} justify="flex-end" alignItems="center">
                <RRDLink
                  to={`/users/${record.player1.username}`}
                  className={classes.RRDLinkNormalized}
                >
                  <Chip
                    className={classes.singleInfo}
                    icon={<FaceIcon />}
                    label={record.player1.username}
                    onClick={handleClickOnUser}
                    onDelete={handleClickDelete}
                    deleteIcon={<ClearIcon className={classes.iconX} />}
                  />
                </RRDLink>
              </Grid>
              <Grid>
                <Chip label={<strong>VS</strong>} />
              </Grid>
              <Grid container xs={3} justify="flex-start" alignItems="center">
                <RRDLink
                  to={`/users/${record.player2.username}`}
                  className={classes.RRDLinkNormalized}
                >
                  <Chip
                    className={classes.singleInfo}
                    icon={<FaceIcon />}
                    label={record.player2.username}
                    onClick={handleClickOnUser}
                    onDelete={handleClickDelete}
                    deleteIcon={
                      <RadioButtonUncheckedIcon className={classes.iconO} />
                    }
                  />
                </RRDLink>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  className={clsx(classes.singleInfo, classes.createdAt)}
                  variant="button"
                >
                  {new Date(record.createdAt).toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
            <RRDLink
              to={`/game-records/${record.gameId}`}
              className={classes.RRDLinkNormalized}
            >
              <Button variant="contained">{"Xem"}</Button>
            </RRDLink>
          </Paper>
        );
      })}

      {/* Show more */}
      <Button
        className={classes.buttonShowMore}
        onClick={handleShowMore}
        variant="contained"
      >
        {"Tải thêm"}
      </Button>
    </Paper>
  );
}
