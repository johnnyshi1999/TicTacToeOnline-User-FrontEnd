import React, { useEffect } from "react";
import {useState} from "react";
import Axios from 'axios';

import RoomGridItem from "../../components/Room-GridItem-ForIndex/Room-GridItem";

import { Grid, Typography} from "@material-ui/core";
import { makeStyles } from  "@material-ui/core";
import { Pagination, Alert } from '@material-ui/lab';
import { CircularProgress } from '@material-ui/core';

import { useSocket} from '../../contexts/socket';

import API from "../../services/api";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start"
  },
  gridContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    padding: theme.spacing(1),
  },
  filterBoxTitle: {
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    fontWeight: 'bold'
  }
}));

const testData = [
    {Id: 1, Name: "Cùng chơi nào ~", IsPlaying: true},
    {Id: 2, Name: "Bạn bắt kịp được mình không ????", isPlaying: false},
    {Id: 3, Name: "Room những con người Emo...", isPlaying: false},
    {Id: 4, Name: "SĐT: 09774646555. Chịch xã giao", isPlaying: false}
];

export default function RoomsGrid({loadingCallback}){
    const classes = useStyles();

    const maxRoomPerPage = 9;
    const [numOfPages, setNumOfPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [rooms, setRooms] = useState([]);
    const [isRoomsLoading, setRoomsLoading] = useState(true);
    const [isPagesLoading, setPagesLoading] = useState(true);
    const [error, setError] = useState(null);

    const {socket} = useSocket();

    useEffect(() => {
        (async() => {
            try{
                const results = await Axios.get(API.url + "/api/room-management/rooms", {
                    page_number: currentPage,
                    item_per_page: maxRoomPerPage
                });
                const {message, data} = results.data;
                setRooms(data);
                setPagesLoading(false);
            }catch(e){
                setError('There has been a problem with loading the rooms, please try refreshing...')
            }
            setRoomsLoading(false);
        })();
    }, [currentPage]);

    useEffect(() => {
        if(socket){
            socket.on('new-room-created', ({rooms}) => {
                setPagesLoading(true);
                const pagesCount = parseInt(Math.ceil(rooms.length/maxRoomPerPage));
                setNumOfPages(pagesCount);
                if(currentPage >= pagesCount){
                    setRoomsLoading(true);
                    const newCurrentPage = currentPage > pagesCount ? currentPage : pagesCount;
                    const start = (currentPage - 1)*maxRoomPerPage;
                    setRooms(rooms.slice(start, Math.min(start + maxRoomPerPage, pagesCount)));
                    if(newCurrentPage !== currentPage){
                        setCurrentPage(newCurrentPage);
                    }
                    setRoomsLoading(false);
                }         
                setPagesLoading(false);
            });
        }
    }, [socket, currentPage]);

    const handleOnPaginationChange = async(event, pageNumber) => {
        setRoomsLoading(true);
        setCurrentPage(pageNumber);
        setRoomsLoading(false);
        console.log(pageNumber);
    }

    return (
        <Grid container item xs={12} sm={9} className={classes.root}>
            <Grid container item xs={12} className={classes.gridContainer}>
                <Typography variant="h5" className={classes.filterBoxTitle}>
                    Phòng chơi
                </Typography>
            </Grid>
               
            
            <Grid container item xs={12} className={classes.gridContainer} justify="flex-start">
                {
                    error ? 
                    <Grid container item xs={12} justify="center">
                        <Alert severity="error">{error}</Alert>
                    </Grid>    
                    :
                    isRoomsLoading ? 
                    <Grid container item xs={12} justify="center">
                        <CircularProgress color='primary' variant='indeterminate'>
                        </CircularProgress>
                    </Grid>
                    
                    :
                    rooms.length <= 0 ? 
                    <Grid container item xs={12} justify="center">
                        <Alert severity="info">Hiện chưa có phòng chơi nào đang được mở, hãy thử tạo phòng mới nào!!</Alert>
                    </Grid>
                    : rooms.map((item, idx) => 
                        <Grid key={"gridRoom"+idx} container item xs={6} md={4}>
                            <RoomGridItem roomItem={item}/>
                        </Grid>
                    )
                }
            </Grid>
            
            {
                error? 
                null
                :
                isPagesLoading ? 
                null : 
                <Grid container item xs={12} justify="center" className={classes.gridContainer}>
                    {/* Pagination */}
                    <Grid container item xs={9} justify="center">
                        <Pagination variant="outlined"
                        boundaryCount={2} 
                        color="primary"
                        count={numOfPages}
                        defaultPage={1}
                        page={currentPage}
                        onChange={(e, p) => handleOnPaginationChange(e, p)}/>
                    </Grid>
                </Grid>
            }
        </Grid>
    );
}