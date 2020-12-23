import React from "react";
import RoomNavigation from "./components/Room-Navigation";
import FilterSideMenu from "./components/Filter-Bar";
import RoomsGrid from './components/Rooms-Grid';

import { Grid, Container } from "@material-ui/core";
import { makeStyles } from  "@material-ui/core";

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
  }
}));

export default function Index() {
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <Container maxWidth="xl" className={classes.container}>
        <Grid container spacing={3} className={classes.pageContent}>
            <Grid container item xs={12} md={10} justify="center" className={classes.roomNavigationBarArea}>
              <RoomNavigation/>
            </Grid>  
            <Grid container item xs={0} md={2}>
            </Grid>   
            <Grid container item xs={12} md={10} justify="center" className={classes.indexContentArea}>
              <FilterSideMenu/>
              <RoomsGrid/>
            </Grid>  
            <Grid container item xs={0} md={2}>
            </Grid>             
        </Grid>
      </Container>
    </div>
  );
}