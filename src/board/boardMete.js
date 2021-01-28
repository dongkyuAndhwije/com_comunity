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
import "./boardMete.css";
import BoardMete2 from "./boardMete2";

const columns = [
  { id: "number", label: "번호", minWidth: 70 },
  { id: "title", label: "제목", minWidth: 100 },
  {
    id: "writer",
    label: "글쓴이",
    minWidth: 70,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "date",
    label: "등록일",
    minWidth: 70,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "recomend",
    label: "추천수",
    minWidth: 70,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(number, title, writer, date, recomend) {
  //   const density = population / size;
  return { number, title, writer, date, recomend };
}

let rows = [];

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
      content: "",
      id: "",
      number: 0,
      recomend: 0,
      time: "",
      title: "",
      writer: "",
      contentOn: "none",
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
              createData(
                json[i].number,
                json[i].title,
                json[i].writer,
                json[i].time,
                json[i].recomend
              )
            );
          }

          console.log(json);
        }
      });
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

  test = () => {
    console.log("test");
  };

  rowclick = (row) => {
    // console.log(row);
    window.scrollTo(0, 0);
    let data = {
      number: row.number,
      writer: row.writer,
    };

    fetch("http://localhost:3001/getContent", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json === undefined) {
          alert("오류");
        } else {
          this.setState({
            content: json[0].content,
            id: json[0].id,
            number: json[0].number,
            recomend: json[0].recomend,
            time: json[0].time,
            title: json[0].title,
            writer: json[0].writer,
            content: json[0].content,
            contentOn: "block",
          });
        }
      });
  };

  render() {
    let data = {
      //Mete2로 넘겨주는 데이터
      content: this.state.content,
      id: this.state.id,
      number: this.state.id,
      recomend: this.state.recomend,
      time: this.state.time,
      title: this.state.title,
      writer: this.state.writer,
    };

    return (
      <div id="aa">
        <div style={{ display: this.state.contentOn }}>
          <BoardMete2 data={data} />
        </div>

        {/* 본문 */}
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
                        onClick={() => {
                          this.rowclick(row);
                        }}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ cursor: "pointer" }}
                            >
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