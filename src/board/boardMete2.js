import React, { Component } from "react";
import App1 from "./app1";
import Boardreple from "./boardreple";

class BoardMete2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reple: "",
      id: localStorage.getItem("userid"),
      writer: localStorage.getItem("usernick"),
    };
  }
  componentDidMount = () => {};

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value, // 변화가 있을때마다 state값을 초기화
    });
    console.log(this.state.reple);
  };

  repleSubmit = () => {
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
    };

    console.log(data);

    fetch("http://localhost:3001/repUpload", {
      //서버의 Singo라우터를 찾아간다
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), // json화 해버리기
    });

    alert("업로드 했습니다.");
    // window.location.reload();
  };
  render() {
    return (
      <div className="Mete_board">
        <div className="mete_titlebox">
          <div className="mete_Btitle">{this.props.data.title}</div>
          <div className="mete_Bwtbox">
            <div className="mete_Bwtbox2">
              <div className="mete_Bwriter"> {this.props.data.writer}</div>
              <div className="mete_Btime">{this.props.data.time}</div>
            </div>
            <button className="mete_recomendButn">
              추천: {this.props.data.recomend}
            </button>
          </div>
        </div>
        <div className="mete_content">{this.props.data.content}</div>
        <div className="mete_replebox">
          <div className="mete_textareabox">
            <div className="mete_repletitle">
              <text>댓글쓰기</text>
              <text style={{ marginRight: "10px" }}>댓글 수 : 0</text>
            </div>
            <div className="mete_textareabox2">
              <textarea
                className="mete_textarea"
                name="reple"
                placeholder="최대 200자까지 가능해요"
                onChange={this.onChange}
              ></textarea>
              <button className="mete_replebtn" onClick={this.repleSubmit}>
                등록
              </button>
            </div>
          </div>
        </div>
        <div className="mete_line"></div>
        <div style={{ marginBottom: 30 }}>
          <Boardreple />
        </div>
      </div>
    );
  }
}

export default BoardMete2;
