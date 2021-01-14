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

export default function ClientUserProfile() {
  const classes = useStyles();
  const [user, setUser] = React.useState({});
  const [gameRecords, setGameRecords] = React.useState([]);

  const getAllGameRecordsOfUser = useCallback(async () => {
    console.log("hello");
    const response = await axios.get(
      API.url + '/game-records/personal/'
    );
    const data = response.data;
    console.log(data);
    console.log("after get");
    setGameRecords(data.gameRecords);
  }, []);

  const getUserByUsername = useCallback(async () => {
    const response = await axios.get(API.url + '/api/auth/');
    const data = response.data.user;
    console.log(data);
    setUser(data);
  }, []);

  React.useEffect(() => {

    getAllGameRecordsOfUser();
    getUserByUsername();
    // return () => {
    //   cleanup
    // }
  }, []);

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
            <GameRecords username={user.username} data={gameRecords} />
          </Grid>

        </Grid>
      </div>
    </>
  );

  
}
