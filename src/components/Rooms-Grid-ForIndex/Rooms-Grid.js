import React from "react";
import {useState} from "react";

import RoomGridItem from "../../components/Room-GridItem-ForIndex/Room-GridItem";

import { Grid, Select, FormControl, InputLabel, MenuItem, Typography} from "@material-ui/core";
import { makeStyles } from  "@material-ui/core";
import { Pagination } from '@material-ui/lab';

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
    {Id: 1, Name: "Cùng chơi nào ~", isPlaying: true},
    {Id: 2, Name: "Bạn bắt kịp được mình không ????", isPlaying: false},
    {Id: 3, Name: "Room những con người Emo...", isPlaying: false},
    {Id: 4, Name: "SĐT: 09774646555. Chịch xã giao", isPlaying: false}
];

export default function RoomsGrid({loadingCallback}){
    const classes = useStyles();

    const maxRoomPerPage = 9;
    const [numOfPages, setNumOfPages] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const handleOnPaginationChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <Grid container item xs={12} sm={9} className={classes.root}>
            <Grid container item xs={12} className={classes.gridContainer}>
                <Typography variant="h5" className={classes.filterBoxTitle}>
                    Phòng chơi
                </Typography>
            </Grid>
            <Grid container item xs={12} className={classes.gridContainer}>
                {/* Grid items */}
                {
                    testData.map(item => 
                        <Grid container item xs={6} md={4}>
                            <RoomGridItem roomItem={item}/>
                        </Grid>
                    )
                }
            </Grid>
            
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
        </Grid>
    );
}