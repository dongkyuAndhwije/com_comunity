import React, { Component } from "react";
import App1 from "./app1";
import Boardreple from "./boardreple";
import like from "./like.png";
import DeleteBoard from "./deleteBoard";

class BoardMete2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reple: "",
      id: localStorage.getItem("userid"),
      writer: localStorage.getItem("usernick"),
      number: "",
      submintTF: true,
      like_: 0,
      reple_q: 0,
    };
  }
  componentDidMount = () => {};

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.data.recomend !== prevProps.data.recomend) {
      this.setState(
        {
          ...this.state,
          selectTagNum: -1,
          like_: this.props.data.recomend,
          // number: this.props.number,
        },
        () => {
          // console.log(this.state.number + "000");
        }
      );
    }
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value, // 변화가 있을때마다 state값을 초기화
    });
    console.log(this.state.reple);
  };

  repleSubmit = () => {
    if (localStorage.getItem("userid") === "") {
      alert("로그인 해주세요");
    } else {
      let today = new Date();
      let time = {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        date: today.getDate(),
        hours: today.getHours(),
        minutes: today.getMinutes(),
      };
      let timestring = `${time.year}/${time.month}/${time.date} ${time.hours}:${time.minutes}`;

      let data = {
        reple: this.state.reple,
        writer: this.state.writer,
        time: timestring,
        id: this.state.id,
        number: this.props.number,
      };

      console.log(data);
      if (this.state.submintTF === true) {
        this.setState(
          {
            submintTF: false,
          },
          () => {
            fetch("api/repUpload", {
              //서버의 Singo라우터를 찾아간다
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data), // json화 해버리기
            }).then((document.getElementById("mTxtArea").value = ""));
          }
        );
      } else {
        this.setState(
          {
            submintTF: true,
          },
          () => {
            fetch("api/repUpload", {
              method: "post",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            }).then((document.getElementById("mTxtArea").value = ""));
          }
        );
      }
    }
  };

  clickLikeB = () => {
    if (localStorage.getItem("userid") === "") {
      alert("로그인 해주세요");
    } else {
      let plus = this.props.data.recomend + 1;
      console.log(this.props.data.number + "========" + plus);

      let data = {
        number: this.props.data.number,
        recomend: plus,
      };

      fetch("api/updateLikeB", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then(
        this.setState({
          like_: plus,
        })
      );
    }
  };

  replq_q = (quentity) => {
    this.setState({
      reple_q: quentity,
    });
  };

  render() {
    return (
      <div className="Mete_board">
        <div className="mete_titlebox">
          <div className="mete_Btitle">
            {this.props.data.title}
            {/* <button className="mete_deletebutton">삭제</button> */}
            <DeleteBoard
              data={this.props.data}
              selectmenuFetch={this.props.selectmenuFetch}
              clickmenu={this.props.clickmenu}
              rows={this.props.rows}
              changeContentOn={this.props.changeContentOn}
            />
          </div>
          <div className="mete_Bwtbox">
            <div className="mete_Bwtbox2">
              <div className="mete_Bwriter"> {this.props.data.writer}</div>
              <div className="mete_Btime">{this.props.data.time}</div>
            </div>
            {/* <button className="mete_recomendButn">
              추천: {this.props.data.recomend}
            </button> */}

            <div className="mete_lickbox">
              <img
                src={like}
                width="12"
                height="12"
                style={{ marginTop: 3, marginRight: 3 }}
              />
              <div
                style={{ marginRight: 15, cursor: "pointer" }}
                onClick={this.clickLikeB}
              >
                좋아요: {this.state.like_}
                {/* 좋아요: {this.props.data.recomend} */}
              </div>
            </div>
          </div>
        </div>
        <div className="mete_content">
          {this.props.data.content.split("\n").map((line) => {
            return (
              <span>
                {line}
                <br />
              </span>
            );
          })}

          {/* {this.props.data.content} */}
        </div>
        <div className="mete_replebox">
          <div className="mete_textareabox">
            <div className="mete_repletitle">
              <span>댓글쓰기</span>
              <span style={{ marginRight: "80px" }}>
                댓글 수 : {this.state.reple_q}
              </span>
            </div>
            <div className="mete_textareabox2">
              <textarea
                className="mete_textarea"
                name="reple"
                placeholder="최대 200자까지 가능해요"
                onChange={this.onChange}
                id="mTxtArea"
              ></textarea>
              <button className="mete_replebtn" onClick={this.repleSubmit}>
                등록
              </button>
            </div>
          </div>
        </div>
        <div className="mete_line"></div>
        <div style={{ marginBottom: 30 }}>
          <Boardreple
            clickmenu={this.state.clickmenu}
            number={this.props.number}
            submintTF={this.state.submintTF}
            replq_q={this.replq_q}
          />
        </div>
      </div>
    );
  }
}

export default BoardMete2;
