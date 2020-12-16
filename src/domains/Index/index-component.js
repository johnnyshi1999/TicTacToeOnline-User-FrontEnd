import React from "react";
import API from "../../services/api.js";

//import material-ui

import { Button, Typography } from "@material-ui/core";
import Axios from "axios";
import { useHistory } from "react-router";

// import Link from '@material-ui/core/Link';




export default function Index() {
  const history = useHistory();
  const handleCreateClick = async () => {
    const data = {
      maxCol: 5,
      maxRow: 5,
      winCondition: 3,
    }
    try {
      const result = await Axios.post(API.url + "/game/create", data);
      console.log(result);
      const gameLink = `/game/${result.data.game._id}`;
      history.push(gameLink);
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