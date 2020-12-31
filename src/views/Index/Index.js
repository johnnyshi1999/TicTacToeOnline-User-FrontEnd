import React from "react";
import API from "../../services/api.js";

//import material-ui

import { Button, Typography } from "@material-ui/core";
import Axios from "axios";
import { useHistory } from "react-router";

// import Link from '@material-ui/core/Link';



//import material-ui
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  // cardGrid: {
  //   paddingTop: theme.spacing(8),
  //   paddingBottom: theme.spacing(8),
  // },
  boardGrid: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(8),
  },

  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },

  mainContainer: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },

  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "100%",
  },
}));

export default function Index() {
  // const history = useHistory();
  const handleCreateClick = async () => {
    const data = {
      maxCol: 20,
      maxRow: 20,
      winCondition: 5,
    }
    try {
      const result = await Axios.post(API.url + "/game/create", data);
      console.log(result);
      const gameLink = `/game/${result.data.game._id}`;
      // history.push(gameLink);
      window.location.href=gameLink;
    } catch(error) {
      console.log(error);
    }
  }

  
  return (
    <div>
      <Typography>Hello there</Typography>
      <Button onClick={handleCreateClick}>Create A Game</Button>
    </div>
  );
}
