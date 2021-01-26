import React, { useEffect } from "react";
import { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import $ from "jquery";
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

const columns = [
  { id: "name", label: "번호", minWidth: 70 },
  { id: "code", label: "제목", minWidth: 100 },
  {
    id: "population",
    label: "글쓴이",
    minWidth: 70,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "등록일",
    minWidth: 70,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "조회수",
    minWidth: 70,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

let rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  //   createData("United States", "US", 327167434, 9833520),
  //   createData("Canada", "CA", 37602103, 9984670),
  //   createData("Australia", "AU", 25475400, 7692024),
  //   createData("Germany", "DE", 83019200, 357578),
  //   createData("Ireland", "IE", 4857000, 70273),
  // createData("Mexico", "MX", 126577691, 1972550),
  // createData("Japan", "JP", 126317000, 377973),
  // createData("France", "FR", 67022000, 640679),
  // createData("United Kingdom", "GB", 67545757, 242495),
  // createData("Russia", "RU", 146793744, 17098246),
  // createData("Nigeria", "NG", 200962417, 923768),
  // createData("Brazil", "BdddR", 210147125, 8515234223767),
  // createData("wq", "111BR", 21014723125, 8512345767),
  // createData("Brazqweil", "333BR", 2101347125, 8515732467),
  // createData("sd", "444BR", 210147323125, 851532767),
  // createData("sdsd", "555BR", 2101442437125, 8512345767),
];

const useStyles = makeStyles({
  root: {
    width: "98%",
  },
  container: {
    maxHeight: 800,
  },
});

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 12,
    };
  }

  //  const classes = useStyles();

  //   const [page, setPage] = React.useState(0);
  //   const [rowsPerPage, setRowsPerPage] = React.useState(12);

  componentWillMount = () => {
    let data = {
      id: "",
    };

    fetch("http://localhost:3001/download", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json === undefined) {
          alert("오류");
        } else {
          //   rows = rows.concat(createData("dd", "dd", 126577691, 1972550));
          //   rows = rows.concat(createData("dd", "dd", 126577691, 1972550));
          for (let i = 0; i < json.length; i++) {
            rows = rows.concat(
              createData(json[i].title, json[i].writer, 123123, 1972550)
            );
          }

          console.log(json);
        }
      });

    // setTimeout($("aa").load(window.location.href + "aa"), 1000);
    // $("aa").load(window.location.href + "aa");

    // aaa;
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

  handleChangeRowsPerPage = (event) => {
    // setRowsPerPage(+event.target.value);
    this.setState({
      page: 0,
      rowsPerPage: +event.target.value,
    });
  };

  render() {
    return (
      <div id="aa">
        <Paper>
          <TableContainer>
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
                  .slice(
                    this.state.page * this.state.rowsPerPage,
                    this.state.page * this.state.rowsPerPage +
                      this.state.rowsPerPage
                  )
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
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
            // rowsPerPageOptions={[5]}
            // rowsPerPageOptions={[5, 10, 100]}
            rowsPerPageOptions={[12]}
            component="div"
            count={rows.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }
}
