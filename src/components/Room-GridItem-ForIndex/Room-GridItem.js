import React from "react";
import {useState} from 'react';

import { Grid, Typography, Button} from "@material-ui/core";
import { Paper} from "@material-ui/core";
import { makeStyles } from  "@material-ui/core";

import IndexPage_LoadingBackdrop_ActionCreator from '../../redux/actionCreators/Index/IndexPage_LoadingBackdrop_ActionCreator';
import IndexPage_ErrorPopUp_ActionCreator from '../../redux/actionCreators/Index/IndexPage_ErrorPopUp_ActionCreator';

import CaroOnlineStore from '../../redux/store';

import Axios from 'axios';
import API from "../../services/api";

const useStyles = makeStyles((theme) => ({
    parentPaper:{
        width: "100%",
        padding: theme.spacing(1),
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
        maxWidth: '100%',
    },
    roomId: {
        paddingBottom: theme.spacing(1),
        fontWeight: 'bold',
        overflowWrap: 'break-word',
        textAlign: 'left',
        color: 'white',
        maxWidth: '100%',
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

export default function RoomGridItem({roomItem}){
    const classes = useStyles();

    const [isRaised, setRaised] = useState(false);
    const [showRoomButtons, setShowRoomButtons] = useState(false);

    const handleJoinRoomClick = () => {
        if(!roomItem || !roomItem._id) return;
        CaroOnlineStore.dispatch(IndexPage_LoadingBackdrop_ActionCreator(true));
        (async () => {
            try{
                const result = await Axios.get(API.url + `/api/room-management/room/${roomItem._id}`);
                const {data} = result.data;
                const roomLink = `/room/${data._id}`;
                window.location.href=roomLink;
            } catch (e) {
                CaroOnlineStore.dispatch(IndexPage_ErrorPopUp_ActionCreator('Không thể tìm thấy phòng chơi này, bạn nên thử tải lại trang'));
                console.log(e);
            }
            CaroOnlineStore.dispatch(IndexPage_LoadingBackdrop_ActionCreator(false));
        })();
    }

    return (
        <Grid container item xs={12}>
            <Paper variant="elevation" elevation={3} className={classes.parentPaper}
            classes={{root: isRaised ? classes.cardHovered : ""}}
            onMouseOver={()=>setRaised(true)} 
            onMouseOut={()=>setRaised(false)}>
                <Grid container item xs={12} className={classes.root}>
                    <Grid container item xs={4}>
                        <Typography variant="subtitle2" className={classes.roomId}>
                            {(roomItem && roomItem._id)? "Mã : " + roomItem._id : "<Mã phòng>"}
                        </Typography>
                    </Grid>
                    <Grid container item xs={7}>
                        <Typography variant="subtitle2" className={classes.roomTitle}>
                            {(roomItem && roomItem.Name)? roomItem.Name : "<Tên phòng>"}
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} className={classes.roomImageAndOverlayArea}
                    classes={{root: showRoomButtons ? classes.imageHovered : ""}}
                    onMouseOver={(e)=>{setShowRoomButtons(true);}} 
                    onMouseOut={(e)=>{setShowRoomButtons(false);}}>
                        <Paper className={classes.gridItemImageBlock}>
                            <Grid container item xs={12}>
                                <img src={process.env.PUBLIC_URL + 'Index/TicTacToeBoardIcon.png'}
                                className={classes.roomIcon} alt="RoomImage"/>
                            </Grid>
                        </Paper>
                        <Paper className={!showRoomButtons ? classes.roomImageOverlayFadeIn : classes.roomImageOverlayFadeOut}>
                            <Grid container item xs={12} className={classes.roomActions}>
                                <Button variant="contained" color="primary" className={classes.goInRoomButton} onClick={handleJoinRoomClick}>
                                    Vào phòng
                                </Button>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid container item xs={12} className={classes.playingStatusArea}>
                        <Typography variant="body1" className={(roomItem && roomItem.isPlaying)? classes.isPlayingStatus : classes.isNotPlayingStatus}>
                            {roomItem && roomItem.IsPlaying? "Đang chơi" : "Phòng chờ"}
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} className={classes.roomRankArea}>
                        <Typography variant="body1" style={{fontStyle: 'italic'}}>
                            {roomItem && roomItem.Description? roomItem.Description : "Không có mô tả phòng"}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}