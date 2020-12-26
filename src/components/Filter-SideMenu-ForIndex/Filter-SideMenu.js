import React from "react";
import {useState} from "react";

import { Grid, Select, FormControl, InputLabel, MenuItem, Typography} from "@material-ui/core";
import { makeStyles } from  "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    alignItems: "flex-start"
  },
  gridItem: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: theme.spacing(1),
  },
  filterBoxTitle: {
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    fontWeight: 'bold'
  }
}));

export default function FilterSideMenu(props){
    const classes = useStyles();

    const [rankFilter, setRankFilter] = useState(null);

    const handleRankFilterChange = (event) => {
        setRankFilter(event.target.value === -1 ? null : event.target.value);
    };

    return (
        <Grid container item xs={12} sm={3} className={classes.root}>
            <Grid container item xs={12} className={classes.gridItem}>
                <Typography variant="h6" className={classes.filterBoxTitle}>
                    Bộ lọc
                </Typography>
                <FormControl variant="outlined">
                    <InputLabel>Rank</InputLabel>
                    <Select value={rankFilter === null? -1 : rankFilter}
                    onChange={(e) => handleRankFilterChange(e)}
                    label="Rank">
                        <MenuItem value={-1}>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>Chicken</MenuItem>
                        <MenuItem value={2}>Soldier</MenuItem>
                        <MenuItem value={3}>Veteran</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
}