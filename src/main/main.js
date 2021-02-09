import React, { Component, img } from "react";
import "./main.css";
import BoardMain from "../board/boardMain";
import { nodeName } from "jquery";
import counseling from "./counseling.png";

import Login from "../login/login";
import Sign from "../sign/sign";

function createData(number, title, writer, date, recomend) {
  //   const density = population / size;
  return { number, title, writer, date, recomend };
}

// let rows = [];

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
      // boardon: "none",
      rows: [],
    };
  }

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
    console.log("패치진입");
    this.setState(
      {
        rows: [],
      },
      () => {
        let data = {
          id: "",
          clickmenu: this.state.clickmenu,
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

        console.log(this.state.rows);
      }
    );
  };

  selectmenu = (e) => {
    this.setState(
      {
        clickmenu: e.target.value, // 변화가 있을때마다 state값을 초기화
        boardon: "inline",
      },
      () => {
        this.selectmenuFetch();
      }
    );
    console.log(this.state.clickmenu);
    // console.log(this.state.content);

    // rows = [];
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
              &nbsp;컴퓨터공학닷컴
            </div>

            {/* <text className="main_topsubtitle">&nbsp;&nbsp;개발자 꿈나무</text> */}
          </div>
          <div className="main_loginbox">
            <Login />
            {/* <button className="main_login">로그인</button> */}
            <Sign />
            {/* <button className="main_login">회원가입</button> */}
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
            <div
              className="main_middlemenu"
              onMouseOver={this.menuOnmouse2}
              style={{ backgroundColor: this.state.Icolor }}
            >
              IT News
            </div>
            <div
              className="main_middlemenu"
              onMouseOver={this.menuOnmouse3}
              style={{ backgroundColor: this.state.ccolor }}
            >
              취업
            </div>
          </div>
        </div>

        <div className="main_middlemenubox2">
          {/* ---------랭귀지--------- */}
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

          {/* ----------과목-------- */}

          <div
            className="main_middlemenuboxinbox2"
            style={{ display: this.state.Sdisplay }}
          >
            <div className="main_middlemenu2">
              소프트웨어<br></br>공학
            </div>
            <div className="main_middlemenu2">자료구조</div>
            <div className="main_middlemenu2">운영체제</div>
            <div className="main_middlemenu2">데이터통신</div>
            <div className="main_middlemenu2">컴퓨터구조</div>
            <div className="main_middlemenu2">컴퓨터개론</div>

            <div className="main_middlemenu2">
              프로그래밍<br></br>언어
            </div>
            <div className="main_middlemenu2">논리회로설계</div>
            <div className="main_middlemenu2">
              모바일<br></br>프로그래밍
            </div>
            <div className="main_middlemenu2">
              컴퓨터<br></br>그래픽스
            </div>
            <div className="main_middlemenu2">컴퓨터보안</div>
            <div className="main_middlemenu2">
              공업/<br></br>이산수학
            </div>
          </div>

          {/* ------------------ */}
          <div
            className="main_middlemenuboxinbox2"
            style={{ display: this.state.Idisplay }}
          >
            <div className="main_middlemenu2">전자신문</div>
            <div className="main_middlemenu2">ADnet</div>
            <div className="main_middlemenu2">블로터</div>
            <div className="main_middlemenu2">씨넷코리아</div>
            <div className="main_middlemenu2">IT World</div>
            <div className="main_middlemenu2">디지털데일리</div>

            <div className="main_middlemenu2">케이벤치</div>
            <div className="main_middlemenu2">얼리어답터</div>
            <div className="main_middlemenu2">IT조선</div>
            <div className="main_middlemenu2">IT뉴스</div>
            <div className="main_middlemenu2">IT DALY</div>
            <div className="main_middlemenu2">PC사랑</div>
          </div>

          {/* ------------------ */}

          <div
            className="main_middlemenuboxinbox2"
            style={{ display: this.state.Cdisplay }}
          >
            <div className="main_middlemenu2">로켓펀치</div>
            <div className="main_middlemenu2">원티드</div>
            <div className="main_middlemenu2">프로그래머스</div>
            <div className="main_middlemenu2">사람인</div>
            <div className="main_middlemenu2">잡코리아</div>
            <div className="main_middlemenu2">잡플래닛</div>
            <div className="main_middlemenu2" style={{ width: 500 }}></div>
          </div>

          {/* ------------------ */}
        </div>
        <div className="main_contents">
          {/* 게시판 자리 */}
          <div
            className="main_board_content"
            style={{ display: this.state.boardon }}
          >
            <BoardMain
              clickmenu={this.state.clickmenu}
              rows={this.state.rows}
              selectmenuFetch={this.selectmenuFetch}
            ></BoardMain>
          </div>
          {/* 채팅 자리 */}
          <div className="main_chatt_content"></div>
        </div>
      </div>
    );
  }
}

export default Main;
