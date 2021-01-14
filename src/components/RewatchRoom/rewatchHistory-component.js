import { makeStyles, Paper, Typography } from "@material-ui/core";
import { useGame } from "../../contexts/game";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    maxWidth: 400,
  }, 
  message: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },

  historyContainer: {
    display: "flex",
    flexFlow: "column",
    overflow: "auto",
    maxHeight: 670,
    paddingBottom: theme.spacing(1)
  },
}));

export default function RewatchHistory() {

  const classes = useStyles();

  // const { game, room } = useGame();

  const {game} = useGame();

  return (
    <Paper className={classes.root}>
      <div className={classes.historyContainer}>
        {game.history.map((element) => {
          let username = "";
          if (element.player === 1) {
            username = game.player1.username;
          }
          else {
            username = game.player2.username;
          }

          const positionX = Math.floor(element.position / game.maxRow);
          const positionY = element.position % game.maxCol;

          const message = `${username} made move on (${positionX} , ${positionY})`;
          return (
            <Typography className={classes.message}>
              {message}
            </Typography>);

        })}
      </div>

    </Paper>)

}