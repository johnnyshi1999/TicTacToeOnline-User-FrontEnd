import React from "react";

import { Grid, TextField, Button, Paper} from "@material-ui/core";
import { makeStyles } from  "@material-ui/core";

import { useAuth } from '../../contexts/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: "space-around",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  typeInRoomIdControl: {
    flexWrap: 'wrap',
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  gridItem: {
    justifyContent: "center",
    alignItems: "center"
  },
  typeInRoomIdTextField: {
    width: "80%"
  },
  button: {
    borderRadius: 30,
  },
  paperAroundTypeInRoomIdControl: {
    width: "100%",
    padding: theme.spacing(1)
  }
}));

export default function RoomNavigator({onCreateRoomClick, onFastPlayClick, onJoinRoomClick}){
    const classes = useStyles();

    const {authTokens} = useAuth();

    return (
        <Grid container item xs={12} className={classes.root}>
            <Grid container item xs={12} sm={8} className={classes.gridItem}>
                <Paper elevation={3} className={classes.paperAroundTypeInRoomIdControl}>
                    <Grid container item className={classes.typeInRoomIdControl}>
                        <TextField placeholder="Nhập mã phòng vào đây"
                            multiline
                            variant="outlined"
                            className={classes.typeInRoomIdTextField}>
                        </TextField>
                        <Button variant="contained" color="primary" className={classes.button}>
                            GO
                        </Button>
                    </Grid>
                </Paper>
            </Grid>
            
            <Grid container item xs={12} sm={2} className={classes.gridItem}>
                <Button variant="contained" color="secondary" className={classes.button} disabled={authTokens ? false : true}
                onClick={onCreateRoomClick}>
                    Tạo phòng
                </Button>
            </Grid>
            
            <Grid container item xs={12} sm={2} className={classes.gridItem}>
                <Button variant="contained" color="secondary" className={classes.button} disabled={authTokens ? false : true}
                onClick={onFastPlayClick}>
                    Chơi nhanh
                </Button>
            </Grid>
        </Grid>
    );
}