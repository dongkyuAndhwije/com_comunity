import React, { Component } from "react";
import "./boardMain.css";
import App from "./app1";
import BoardMete from "./boardMete";
import Boardwrite from "./boardwrite";
import $ from "jquery";
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

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
      clickmenu: this.props.clickmenu,
    };
  }

  componentDidMount = () => {};

  writeon = () => {
    this.setState({
      boardon: "none",
      writeon: "inline",
    });
  };

  boardon = () => {
    this.setState({
      boardon: "inline",
      writeon: "none",
    });
  };

  render() {
    return (
      <div className="board_all" id="aaa">
        <div className="boardmain_titlebox">
          <div className="boardmain_title">C 게시판</div>
          <div>
            <button onClick={this.boardon} style={{ cursor: "pointer" }}>
              게시판
            </button>
            <button
              onClick={this.writeon}
              style={{ marginLeft: 10, marginBottom: 15, cursor: "pointer" }}
            >
              글쓰기
            </button>
          </div>
        </div>

        <div style={{ display: this.state.boardon }}>
          <BoardMete />
        </div>
        {/* <div className="board_main_blank"></div> */}
        {/* <App /> */}
        <div style={{ display: this.state.writeon }}>
          <Boardwrite />
        </div>
      </div>
    );
  }
}

export default BoardMain;
