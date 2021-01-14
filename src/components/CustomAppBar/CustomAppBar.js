import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../../contexts/auth";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { IconButton } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import socket from "../../services/socket";
import Axios from "axios";
import API from "../../services/api";

import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit",
  },
  loginButton: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  signUpButton: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

export default function DefaultAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { authTokens, setAuthTokens } = useAuth();
  const open = Boolean(anchorEl);

  const history = useHistory();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = async () => {
    const result = await Axios.get(API.url + "/api/auth/");

    const userId = result.data._id;

    socket.emit("logout");
    setAuthTokens(null);
    setAnchorEl(null);
    history.push("/");
  };

  const handleProfile = () => {
    console.log(authTokens);
    history.push("/profile");
  };

  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography
          className={classes.title}
          variant="h6"
          color="inherit"
          noWrap
          component={Link}
          to="/"
        >
          Caro Online
        </Typography>
        <div>
          {authTokens ? (
            <div>
              <IconButton
                aria-label="ranking"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={() => {
                  history.push("/ranking");
                }}
              >
                <FormatListNumberedIcon />
              </IconButton>
              <IconButton
                onClick={handleMenu}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Button
                className={classes.signUpButton}
                color="inherit"
                href="/signup"
              >
                Sign Up
              </Button>
              <Button
                className={classes.loginButton}
                color="inherit"
                href="/login"
              >
                Login
              </Button>
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
