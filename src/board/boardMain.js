import React, { Component } from "react";
import "./boardMain.css";
import App from "./app1";
import BoardMete from "./boardMete";
import Boardwrite from "./boardwrite";
// import $ from "jquery";
// import jQuery from "jquery";
// window.$ = window.jQuery = jQuery;

class BoardMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1,
      title: "",
      writer: "hwije",
      time: "",
      visit: 12,
      content: "",
      boardon: "inline",
      writeon: "none",
      // clickmenu: this.props.clickmenu,
    };
  }

  componentDidMount = () => {};

  writeon = () => {
    if (localStorage.getItem("userid") === "") {
      alert("로그인 해주세요");
    } else {
      this.setState({
        boardon: "none",
        writeon: "inline",
      });
    }
  };

  boardon = () => {
    this.setState({
      boardon: "inline",
      writeon: "none",
    });
  };

  // componentDidUpdate = (prevProps, prevState) => {
  //   if (this.props.offBoardWrite !== prevProps.offBoardWrite) {
  //     this.setState(
  //       {
  //         ...this.state,
  //         selectTagNum: -1,
  //         // boardon: "none",
  //         // writeon: "none",
  //         // number: this.props.number,
  //       },
  //       () => {
  //         // console.log(this.state.number + "000");
  //       }
  //     );
  //   }
  // };

  render() {
    return (
      <div className="board_all">
        <div className="boardmain_titlebox">
          <div className="boardmain_title">{this.props.clickmenu} 게시판</div>
          <div>
            <button onClick={this.boardon} className="boardmain_boardBtn">
              게시판
            </button>
            <button onClick={this.writeon} className="boardmain_writeBtn">
              글쓰기
            </button>
          </div>
        </div>

        <div style={{ display: this.state.boardon }}>
          <BoardMete
            clickmenu={this.props.clickmenu}
            rows={this.props.rows}
            selectmenuFetch={this.props.selectmenuFetch}
          />
        </div>
        {/* <div className="board_main_blank"></div> */}
        {/* <App /> */}
        <div style={{ display: this.state.writeon }}>
          <Boardwrite
            clickmenu={this.props.clickmenu}
            selectmenuFetch={this.props.selectmenuFetch}
            boardon={this.boardon}
          />
        </div>
      </div>
    );
  }
}

export default BoardMain;
