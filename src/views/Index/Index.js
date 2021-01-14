import React from "react";
import API from "../../services/api.js";

//import material-ui

import { Button, Typography } from "@material-ui/core";
import Axios from "axios";
import { useHistory } from "react-router";

// import Link from '@material-ui/core/Link';



//import material-ui
import { makeStyles } from "@material-ui/core/styles";
import RoomNavigator from "../../components/Room-Navigator-ForIndex/Room-Navigator";
import FilterSideMenu from "../../components/Filter-SideMenu-ForIndex/Filter-SideMenu";
import RoomsGrid from '../../components/Rooms-Grid-ForIndex/Rooms-Grid';

import { Grid, Container, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },  
  pageContent: {
    justifyContent: "flex-start",
  },
  roomNavigationBarArea: {
    justifyContent: "center",
    justifyItems: "center"
  },
  indexContentArea: {
    justifyContent: "space-between",
  },

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
  const classes = useStyles();

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

  const handleJoinClick = async () => {

  };

  return(
    <div className={classes.root}>
      <Container maxWidth="xl" className={classes.container}>
        <Grid container spacing={3} className={classes.pageContent}>
            <Grid container item xs={12} md={10} justify="center" className={classes.roomNavigationBarArea}>
              <RoomNavigator/>
            </Grid>  
            <Box component={Grid} container item md={2} display={{xs: "none", md:"flex"}}>
            </Box>
            <Grid container item xs={12} md={10} justify="center" className={classes.indexContentArea}>
              <FilterSideMenu/>
              <RoomsGrid/>
            </Grid>  
            <Box component={Grid} container item md={2} display={{xs: "none", md:"flex"}}>
            </Box>             
        </Grid>
      </Container>
      <Typography>Hello there</Typography>
      <Button onClick={handleCreateClick}>Create A Game</Button>
      <Button onClick={handleJoinClick}>Create A Game</Button>
    </div>
  );
}