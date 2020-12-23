import React from "react";
import {useState} from 'react';

import { Grid, Typography, Button} from "@material-ui/core";
import { Paper} from "@material-ui/core";
import { makeStyles } from  "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    parentPaper:{
        padding: theme.spacing(1),
        margin: 5,
        background: 'linear-gradient(180deg, #3F51B5 10%, #FFFFFF 30%)',
        transition: "transform 0.15s ease-in-out" 
    },
    root: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-start",  
        flexWrap: "wrap"
    },
    gridContainer: {
        display: "flex",
        flexDirection: "row",
    },
    roomTitle: {
        paddingBottom: theme.spacing(1),
        fontStyle: 'italic',
        overflowWrap: 'break-word',
        textAlign: 'justify',
        color: 'white',
    },
    roomId: {
        paddingBottom: theme.spacing(1),
        fontWeight: 'bold',
        overflowWrap: 'break-word',
        textAlign: 'left',
        color: 'white'
    },
    gridItemImageBlock: {
        padding: theme.spacing(1),
        transition: "transform 0.15s ease-in-out" 
    },
    roomIcon: {
        maxWidth: '100%',
    },
    cardHovered: {
        transform: "scale3d(1.05, 1.05, 1)"
    },
    roomRankArea: {
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    roomImageOverlayFadeIn: {
        position: 'absolute',
        zIndex: 1,
        opacity: 0,
        backgroundColor: "#00000080",
        transition: 'opacity 0.15s',
        width: '100%',
        height: '100%',
    },
    roomImageOverlayFadeOut: {
        position: 'absolute',
        zIndex: 1,
        opacity: 1,
        backgroundColor: "#00000080",
        transition: 'opacity 0.15s 0.15s',
        width: '100%',
        height: '100%',
    },
    roomActions: {
        position: 'absolute',
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    roomImageAndOverlayArea: {
        position: 'relative',
    },
    goInRoomButton: {
        borderRadius: 30,
    },
    playingStatusArea: {
        justifyContent: "space-around",
        alignItems: "center",
        margin: theme.spacing(1),
    },
    isPlayingStatus: {
        color: 'red',
        fontStyle: 'italic',
    },
    isNotPlayingStatus: {
        color: 'green',
        fontStyle: 'italic',
    }
}));

export default function RoomGridItem({isPlaying}){
    const classes = useStyles();

    const [isRaised, setRaised] = useState(false);
    const [showRoomButtons, setShowRoomButtons] = useState(false);

    return (
        <Grid container item xs={12}>
            <Paper variant="elevation" elevation={3} className={classes.parentPaper}
            classes={{root: isRaised ? classes.cardHovered : ""}}
            onMouseOver={()=>setRaised(true)} 
            onMouseOut={()=>setRaised(false)}>
                <Grid container item xs={12} className={classes.root}>
                    <Grid container item xs={3}>
                        <Typography variant="subtitle2" className={classes.roomId}>
                            Mã phòng
                        </Typography>
                    </Grid>
                    <Grid container item xs={8}>
                        <Typography variant="subtitle2" className={classes.roomTitle}>
                            Đây là một tên phòng rất dài để thể hiện rằng phần này xuống dòng được
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} className={classes.roomImageAndOverlayArea}
                    classes={{root: showRoomButtons ? classes.imageHovered : ""}}
                    onMouseOver={(e)=>{setShowRoomButtons(true);}} 
                    onMouseOut={(e)=>{setShowRoomButtons(false);}}>
                        <Paper className={classes.gridItemImageBlock}>
                            <Grid container item xs={12}>
                                <img src={process.env.PUBLIC_URL + 'IndexDomain/TicTacToeBoardIcon.png'}
                                className={classes.roomIcon}/>
                            </Grid>
                        </Paper>
                        <div className={!showRoomButtons ? classes.roomImageOverlayFadeIn : classes.roomImageOverlayFadeOut}>
                            <Grid container item xs={12} className={classes.roomActions}>
                                <Button variant="contained" color="primary" className={classes.goInRoomButton}>
                                    Vào phòng
                                </Button>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid container item xs={12} className={classes.playingStatusArea}>
                        <Typography variant="body1" className={isPlaying? classes.isPlayingStatus : classes.isNotPlayingStatus}>
                            {isPlaying? "Đang chơi" : "Phòng chờ"}
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} className={classes.roomRankArea}>
                        <Grid item xs={3}>
                            <img src={process.env.PUBLIC_URL + 'IndexDomain/RankIcon.png'}
                                className={classes.roomIcon}/>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="subtitle2" align="center">
                                Rank Veteran
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}