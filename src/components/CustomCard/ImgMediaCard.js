import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
  },
  userInfoRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

export default function ImgMediaCard({ imageUrl, user }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          height="300"
          component="img"
          alt="Contemplative Reptile"
          image={
            imageUrl ||
            "https://res.cloudinary.com/dlet08oik/image/upload/v1607777793/sample.jpg"
          }
          title={`Avartar of ${user.username}`}
        />
        <CardContent className={classes.cardContent}>
          <Typography
            className={classes.rowCenter}
            align="center"
            gutterBottom
            variant="h6"
          >
            {`${user.username}`}
          </Typography>
          <Typography align="center" gutterBottom variant="h6">
            {`${user.firstName} ${user.lastName}`}
          </Typography>
          <Typography className={classes.userInfoRow} variant="subtitle2">
            <Box>{"JOINED AT"}</Box>
            <Box>
              <strong>{user.createdAt}</strong>
            </Box>
          </Typography>
          <Typography className={classes.userInfoRow} variant="subtitle2">
            <Box>{"GAMES WON"}</Box>
            <Box>
              <strong>{user.gamesWon}</strong>
            </Box>
          </Typography>
          <Typography className={classes.userInfoRow} variant="subtitle2">
            <Box>{"GAMES LOST"}</Box>
            <Box>
              <strong>{user.gamesLost}</strong>
            </Box>
          </Typography>
          <Typography className={classes.userInfoRow} variant="subtitle2">
            <Box>{"WIN RATE"}</Box>
            <Box>
              <strong>{`${(
                (100 * user.gamesWon) /
                (user.gamesWon + user.gamesLost)
              ).toFixed(2)}%`}</strong>
            </Box>
          </Typography>
          <Typography className={classes.userInfoRow} variant="subtitle2">
            <Box>{"RANK"}</Box>
            <Box>
              <strong>{user.rank || "UN-RANKED"}</strong>
            </Box>
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}
