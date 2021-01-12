import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TablePaginationActions from "./TablePaginationActions";

const columns = [
  { id: "username", label: "User\u00a0name", minWidth: 170 },
  { id: "rank", label: "Rank", minWidth: 100 },
  {
    id: "trophies",
    label: "Trophies",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "totalGames",
    label: "Games",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "winRate",
    label: "Win\u00a0rate\u00a0(%)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(username, rank, trophies, totalGames) {
  const winRate = (trophies / totalGames) * 100;
  return { username, rank, trophies, totalGames, winRate };
}

const rows = [
  createData("user01", "Challenger", 1301, 1412),
  createData("user02", "Challenger", 1293, 1402),
  createData("user03", "Challenger", 1274, 1390),
  createData("user04", "Challenger", 1238, 1401),
  createData("user05", "Grand Master", 1105, 1366),
  createData("user06", "Grand Master", 1050, 1420),
  createData("user07", "Master", 764, 902),
  createData("user08", "Master", 723, 912),
  createData("user09", "Diamond", 622, 878),
  createData("user10", "Diamond", 601, 900),
  createData("user11", "Platinum", 402, 782),
  createData("user12", "Gold", 387, 503),
  createData("user13", "Silver", 265, 409),
  createData("user14", "Silver", 223, 365),
  createData("user15", "Bronze", 109, 223),
  createData("user16", "Iron", 19, 76),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function RankingTable({rankData}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.username}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[
          5,
          10,
          25,
          100,
          //   { label: "All", value: -1 }
        ]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Paper>
  );
}

// const rankInfo = [
//   {
//     name: "Challenger",
//     minTrophies: 1200,
//   },
//   {
//     name: "Grand master",
//     minTrophies: 1000,
//   },
//   {
//     name: "Master",
//     minTrophies: 800,
//   },
//   {
//     name: "Diamond",
//     minTrophies: 600,
//   },
//   {
//     name: "Platinum",
//     minTrophies: 400,
//   },
//   {
//     name: "Gold",
//     minTrophies: 300,
//   },
//   {
//     name: "Silver",
//     minTrophies: 200,
//   },
//   {
//     name: "Bronze",
//     minTrophies: 100,
//   },
//   {
//     name: "Iron",
//     minTrophies: 0,
//   },
// ];
