import React, { Component, img, webview } from "react";
import "./main.css";
import BoardMain from "../board/boardMain";
// import { nodeName } from "jquery";
import counseling from "./counseling.png";

import Login from "../login/login";
import Sign from "../sign/sign";
import Iframe from "../ifram/ifram";
// import Allmessage from "../chatt/chatt";
import Message from "../message/message";

function createData(number, title, writer, date, recomend) {
  //   const density = population / size;
  return { number, title, writer, date, recomend };
}

// let rows = [];
// const WebView = require("react-electron-web-view");
let clickmenu;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Ldisplay: "flex",
      Sdisplay: "none",
      Idisplay: "none",
      Cdisplay: "none",
      Lcolor: "#a868df",
      Scolor: "#6f00cc",
      Icolor: "#6f00cc",
      ccolor: "#6f00cc",
      clickmenu: "",
      clickifram: "",
      // offBoardWrite: "",
      // boardon: "none",
      iframOn: "none",
      rows: [],
    };
  }

  componentDidUpdate = () => {
    // if (this.webview) {
    //   this.webview.loadUrl(url, {
    //     extraHeaders: "",
    //   });
    // }
  };

  componentDidMount = () => {
    localStorage.setItem("userid", "");
    localStorage.setItem("usernick", "");
  };

  menuOnmouse0 = (e) => {
    this.setState({
      menuSelect: 0,
      Ldisplay: "flex",
      Sdisplay: "none",
      Idisplay: "none",
      Cdisplay: "none",
      Lcolor: "#a868df",
      Scolor: "#6f00cc",
      Icolor: "#6f00cc",
      ccolor: "#6f00cc",
    });
  };

  menuOnmouse1 = (e) => {
    this.setState({
      menuSelect: 1,
      Ldisplay: "none",
      Sdisplay: "flex",
      Idisplay: "none",
      Cdisplay: "none",
      Lcolor: "#6f00cc",
      Scolor: "#a868df",
      Icolor: "#6f00cc",
      ccolor: "#6f00cc",
    });
  };

  menuOnmouse2 = (e) => {
    this.setState({
      menuSelect: 2,
      Ldisplay: "none",
      Sdisplay: "none",
      Idisplay: "flex",
      Cdisplay: "none",
      Lcolor: "#6f00cc",
      Scolor: "#6f00cc",
      Icolor: "#a868df",
      ccolor: "#6f00cc",
    });
  };

  menuOnmouse3 = (e) => {
    this.setState({
      menuSelect: 3,
      Ldisplay: "none",
      Sdisplay: "none",
      Idisplay: "none",
      Cdisplay: "flex",
      Lcolor: "#6f00cc",
      Scolor: "#6f00cc",
      Icolor: "#6f00cc",
      ccolor: "#a868df",
      kinds: "",
    });
  };

  selectmenuFetch = () => {
    // rows = [];
    console.log("????????????");
    this.setState(
      {
        rows: [],
      },
      () => {
        let data = {
          id: "",
          clickmenu: this.state.clickmenu,
        };
        fetch("api/download", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((json) => {
            if (json === undefined) {
              alert("??????");
            } else {
              //   rows = rows.concat(createData("dd", "dd", 126577691, 1972550));
              //   rows = rows.concat(createData("dd", "dd", 126577691, 1972550));
              for (let i = 0; i < json.length; i++) {
                // console.log(json.length);
                this.setState({
                  rows: this.state.rows.concat(
                    createData(
                      json[i].number,
                      json[i].title,
                      json[i].writer,
                      json[i].time,
                      json[i].recomend
                    )
                  ),
                });
              }

              console.log(json);
            }
          });

        // console.log(this.state.rows);
      }
    );
  };

  selectmenu = (e) => {
    if (localStorage.getItem("userid") === "") {
      alert("????????? ????????????");
    } else {
      this.setState(
        {
          clickmenu: e.target.value, // ????????? ??????????????? state?????? ?????????
          boardon: "inline",
          iframOn: "none",
        },
        () => {
          this.selectmenuFetch();
        }
      );
    }

    console.log(this.state.clickmenu);
    console.log("aaaa");
    // console.log(this.state.content);

    // rows = [];
  };

  clickIfram = (e) => {
    this.setState(
      {
        clickifram: e.target.value, // ????????? ??????????????? state?????? ?????????
        boardon: "none",
        iframOn: "block",
      },
      () => {
        // console.log(this.state.clickifram);
      }
    );
  };

  render() {
    return (
      <div>
        <div className="main_top">
          <div className="main_toptitle">
            <img
              src={counseling}
              width="50"
              height="50"
              style={{ marginLeft: 20 }}
            />
            <div
              style={{
                display: "inline",
                marginTop: 10,
              }}
            >
              &nbsp;?????????????????????
            </div>

            {/* <text className="main_topsubtitle">&nbsp;&nbsp;????????? ?????????</text> */}
          </div>
          <div className="main_loginbox">
            <span>
              <Login />
            </span>

            {/* <button className="main_login">?????????</button> */}
            <Sign />
            {/* <button className="main_login">????????????</button> */}
          </div>
        </div>

        <div className="main_middlemenubox">
          <div className="main_middlemenuboxinbox">
            <div
              className="main_middlemenu"
              onMouseOver={this.menuOnmouse0}
              style={{ backgroundColor: this.state.Lcolor }}
            >
              Languege
            </div>
            <div
              className="main_middlemenu"
              onMouseOver={this.menuOnmouse1}
              style={{ backgroundColor: this.state.Scolor }}
            >
              Subject
            </div>
            {/* <div
              className="main_middlemenu"
              onMouseOver={this.menuOnmouse2}
              style={{ backgroundColor: this.state.Icolor }}
            >
              IT News
            </div> */}
            {/* <div
              className="main_middlemenu"
              onMouseOver={this.menuOnmouse3}
              style={{ backgroundColor: this.state.ccolor }}
            >
              ??????
            </div> */}
          </div>
        </div>

        <div className="main_middlemenubox2">
          {/* ---------?????????--------- */}
          <div
            className="main_middlemenuboxinbox2"
            style={{ display: this.state.Ldisplay }}
          >
            <button
              className="main_middlemenu2"
              onClick={this.selectmenu}
              value="C"
            >
              c
            </button>
            <button
              className="main_middlemenu2"
              name="java"
              onClick={this.selectmenu}
              value="Java"
            >
              java
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.selectmenu}
              value="Python"
            >
              python
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.selectmenu}
              value="C++"
            >
              c++
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.selectmenu}
              value="Javascript"
            >
              javascript
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.selectmenu}
              value="C#"
            >
              c#
            </button>

            <button
              className="main_middlemenu2"
              onClick={this.selectmenu}
              value="Php"
            >
              php
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.selectmenu}
              value="SQL"
            >
              sql
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.selectmenu}
              value="Ruby"
            >
              Ruby
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.selectmenu}
              value="Go"
            >
              Go
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.selectmenu}
              value="Swift"
            >
              Swift
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.selectmenu}
              value="Cotlin"
            >
              Cotlin
            </button>
          </div>

          {/* ----------??????-------- */}
          <div
            className="main_middlemenuboxinbox2"
            style={{ display: this.state.Sdisplay }}
          >
            <button
              className="main_middlemenu2"
              onClick={this.selectmenu}
              value="SE??????"
            >
              ???????????????<br></br>??????
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.selectmenu}
              value="????????????"
            >
              ????????????
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.selectmenu}
              value="????????????"
            >
              ????????????
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.selectmenu}
              value="???????????????"
            >
              ???????????????
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.selectmenu}
              value="???????????????"
            >
              ???????????????
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.selectmenu}
              value="???????????????"
            >
              ???????????????
            </button>

            <button
              className="main_middlemenu2"
              onClick={this.selectmenu}
              value="?????????????????????"
            >
              ???????????????<br></br>??????
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.selectmenu}
              value="??????????????????"
            >
              ??????????????????
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.selectmenu}
              value="????????????????????????"
            >
              ?????????<br></br>???????????????
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.selectmenu}
              value="?????????????????????"
            >
              ?????????<br></br>????????????
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.selectmenu}
              value="???????????????"
            >
              ???????????????
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.selectmenu}
              value="????????????"
            >
              ??????/<br></br>????????????
            </button>
          </div>

          {/* ------------------ */}
          <div
            className="main_middlemenuboxinbox2"
            style={{ display: this.state.Idisplay }}
          >
            {/* <button
              className="main_middlemenu2"
              onClick={this.clickIfram}
              value="????????????"
            >
              ????????????
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.clickIfram}
              value="ZDnet"
            >
              ZDnet
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.clickIfram}
              value="?????????"
            >
              ?????????
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.clickIfram}
              value="???????????????"
            >
              ???????????????
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.clickIfram}
              value="IT World"
            >
              IT World
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.clickIfram}
              value="??????????????????"
            >
              ??????????????????
            </button>

            <button
              className="main_middlemenu2"
              onClick={this.clickIfram}
              value="???????????????"
            >
              ???????????????
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.clickIfram}
              value="IT??????"
            >
              IT??????
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.clickIfram}
              value="IT??????"
            >
              IT??????
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.clickIfram}
              value="IT DALY"
            >
              IT DALY
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.clickIfram}
              value="PC??????"
            >
              PC??????
            </button> */}
          </div>

          {/* ------------------ */}

          <div
            className="main_middlemenuboxinbox2"
            style={{ display: this.state.Cdisplay }}
          >
            {/* <button
              className="main_middlemenu2"
              onClick={this.clickIfram}
              value="????????????"
            >
              ????????????
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.clickIfram}
              value="?????????"
            >
              ?????????
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.clickIfram}
              value="??????????????????"
            >
              ??????????????????
            </button> */}
            <button
              className="main_middlemenu2"
              onClick={this.clickIfram}
              value="?????????"
            >
              ?????????
            </button>
            <button
              className="main_middlemenu2"
              onClick={this.clickIfram}
              value="????????????"
            >
              ????????????
            </button>

            <button
              className="main_middlemenu2"
              onClick={this.clickIfram}
              value="??????"
            >
              ??????
            </button>
            {/* <button
              className="main_middlemenu2"
              onClick={this.clickIfram}
              value="????????????"
            >
              ????????????
            </button> */}
            <button
              className="main_middlemenu2"
              style={{ width: 750 }}
            ></button>
          </div>

          {/* ------------------ */}
        </div>
        <div className="main_contents">
          {/* ????????? ?????? */}
          <div
            className="main_board_content"
            style={{ display: this.state.boardon }}
          >
            <BoardMain
              clickmenu={this.state.clickmenu}
              rows={this.state.rows}
              selectmenuFetch={this.selectmenuFetch}
              // offBoardWrite={this.state.offBoardWrite}
            ></BoardMain>
          </div>

          {/* ?????? ?????? */}
          <div
            className="main_chatt_content"
            style={{ display: this.state.boardon }}
          >
            {/* <Allmessage /> */}
            <Message />
          </div>

          {/* <div style={{ display: this.state.iframOn, width: "100%" }}>
            <Iframe clickifram={this.state.clickifram} />
          </div> */}
        </div>
      </div>
    );
  }
}

export default Main;
