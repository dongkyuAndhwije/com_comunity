import React, { Component } from "react";

class Boardwrite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1,
      title: "",
      writer: "",
      time: "",
      visit: 12,
      content: "",
      userid: localStorage.getItem("userid"),
    };
  }

  componentDidMount = () => {
    let data = {
      id: localStorage.getItem("userid"),
    };
    //usernickname가져옴
    fetch("http://localhost:3001/getUser", {
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
            writer: json[0].user_nick,
          });
          //   console.log(json[0].user_nick);
        }
      });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value, // 변화가 있을때마다 state값을 초기화
    });
    console.log(this.state.title);
    console.log(this.state.content);
  };

  onSubmit = (e) => {
    e.preventDefault();
    //시간 객체
    let today = new Date();
    let time = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      date: today.getDate(),
      hours: today.getHours(),
      minutes: today.getMinutes(),
    };

    let timestring = `${time.year}/${time.month}/${time.date} ${time.hours}:${time.minutes}`;
    console.log(timestring);
    // 전달 할 거

    let data = {
      title: this.state.title,
      content: this.state.content,
      writer: this.state.writer,
      time: timestring,
      userid: this.state.userid,
    };

    if (this.state.title == "" || this.state.content == "") {
      // 내용을 안썼으면 alert발동
      alert("제목이나 내용을 입력해 주세요");
    } else if (data.content.length >= 2000) {
      //내용 입력값의 길이가 200자가 넘어가면 alert발동
      alert("2000자를 초과 했어요");
    } else {
      fetch("http://localhost:3001/upload", {
        //서버의 Singo라우터를 찾아간다
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), // json화 해버리기
      });

      alert("업로드 했습니다."); //제출 알림
      window.location.reload();
      // setTimeout($("aaa").load(window.location.href + "aaa"), 1000);
    }
  };
  render() {
    return (
      <div>
        <input
          name="title"
          placeholder="제목입력"
          onChange={this.onChange}
        ></input>
        <textarea
          name="content"
          placeholder="최대 200자까지 가능해요"
          onChange={this.onChange}
        ></textarea>
        <button onClick={this.onSubmit}>올리기</button>
      </div>
    );
  }
}

export default Boardwrite;