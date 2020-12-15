import React from "react";
import Game from "../../components/game-component.js"

//import material-ui




import { Typography } from "@material-ui/core";

// import Link from '@material-ui/core/Link';


export default function Index() {
  return(
    <div>
      <Typography>Hello there</Typography>
      <Game maxRow="5" maxCol="5" winCondition="3"></Game>
    </div>
  );
}