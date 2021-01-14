import React, { useEffect, useState } from "react";

//import material-ui

import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AddIcon from '@material-ui/icons/Add';

import { Paper, Typography } from "@material-ui/core";
import Axios from "axios";

// import Link from '@material-ui/core/Link';

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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
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
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: '100%',
  },

  formControl: {
    marginTop: theme.spacing(5),
    mmarginBottom: theme.spacing(5),
  },
  dialogAction: {
    marginTop: theme.spacing(5),
    mmarginBottom: theme.spacing(100),
  },
}));

export default function Index() {
  const classes = useStyles();
  return(
    <Typography>Hello there</Typography>
  );
}