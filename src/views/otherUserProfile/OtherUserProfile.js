import { Grid } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ImgMediaCard from "../../components/CustomCard/ImgMediaCard";
import GameRecords from "../../components/GameRecords/GameRecords";
import API from "../../services/api";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

export default function OtherUserProfile() {
  const classes = useStyles();
  const { username } = useParams();
  const [user, setUser] = React.useState({});
  const [gameRecords, setGameRecords] = React.useState([]);

  React.useEffect(() => {
    const getAllGameRecordsOfUser = async (username) => {
      const response = await axios.get(
        `${API.url}/game-records?username=${username}`
      );
      const data = response.data;
      console.log(data);
      setGameRecords(data.gameRecords);
    };
    getAllGameRecordsOfUser(username);
    // return () => {
    //   cleanup
    // }
  }, [username]);

  React.useEffect(() => {
    const getUserByUsername = async (username) => {
      const response = await axios.get(
        `${API.url}/api/users?username=${username}`
      );
      const data = response.data;
      console.log(data);
      setUser(data);
    };
    getUserByUsername(username);
  }, [username]);

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item>
            <ImgMediaCard
              image={user.profileImage}
              user={{
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                createdAt: new Date(user.createdAt).toLocaleDateString(),
                gamesWon: user.gamesWon,
                gamesLost: user.gamesLost,
              }}
            />
          </Grid>
          <Grid item>
            <GameRecords username={username} data={gameRecords} />
          </Grid>
        </Grid>
      </div>
    </>
  );

  
}
