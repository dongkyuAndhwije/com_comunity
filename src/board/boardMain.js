import React, { Component } from "react";
import "./boardMain.css";
import App from "./app1";
import Board from "./boardMete";
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

  componentDidMount = () => {
    // if(this.state.clickmenu==='c')
  };

  writeon = () => {
    this.setState({
      boardon: "none",
      writeon: "inline",
    });
    // console.log(this.props.clickmenu);
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
        <p className="boardmain_title">C 게시판</p>

        <button onClick={this.boardon}>게시판</button>
        <button
          onClick={this.writeon}
          style={{ marginLeft: 10, marginBottom: 15 }}
        >
          글쓰기
        </button>
        <div style={{ display: this.state.boardon }}>
          <Board />
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
