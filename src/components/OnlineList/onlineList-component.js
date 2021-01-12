import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import DefaultAvatar from '../../assets/tic-tac-toe.png';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 300,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },

  listItem: {
    padding: theme.spacing(1),
  },
  RRLink: {
    textDecoration: 'none',
    color: 'inherit',

  }
}));

function OnlineListItem({ avatar, username }) {
  const classes = useStyles();
  return (
    <Link className={classes.RRLink} to='/user'>
    <ListItem className={classes.list}>
        <ListItemAvatar>
          <Avatar>
            <img style={{ width: 35, height: 35 }} src={DefaultAvatar} alt='avatar' />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Single-line item"
        />
      </ListItem>
    </Link>

  );
}

export default function OnlineList() {
  const classes = useStyles();

  const data = [1, 2, 3]
  return (
    <div className={classes.root}>
      <List dense={true} className={classes.demo}>
        {data.map((e) => {
          return (
            <OnlineListItem></OnlineListItem>
          );
        })}
      </List>
    </div>

  );
}