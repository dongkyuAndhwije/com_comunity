import React, { Component } from "react";
import PropTypes from "prop-types";
import "./sign_page.css";
import { Switch, Route, Link, NavLink, withRouter } from "react-router-dom";

class Sign_page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      pw: "",
      pw2: "",
      nick: "",
      idcheck: false,
      pwcheck: false,
      niccheck: false,
    };
  }
  checkPW = (e) => {
    if (this.state.pw === this.state.pw2) {
      alert("비밀번호 일치합니다.");
      this.setState({
        pwcheck: true,
      });
    } else {
      alert("일치하지 않습니다.");
    }
    console.log(this.state.pwcheck);
  };

  info_input = (e) => {
    //id인풋시 초기화
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log([e.target.name] + this.state[e.target.name]);
  };

  checkID = (e) => {
    e.preventDefault();

    console.log(this.state.id);
    const data = {
      id: this.state.id,
    };

    fetch("http://localhost:3001/checkid", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.tf === true) {
          alert("사용가능한 ID입니다");
          this.setState({
            idcheck: true,
          });
          console.log(this.state.idcheck);
        } else {
          alert("다른 ID를 입력해주세요");
        }
      });
  };

  checkNICK = (e) => {
    e.preventDefault();

    console.log(this.state.nick);
    const data = {
      nick: this.state.nick,
    };

    fetch("http://localhost:3001/checknick", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.tf === true) {
          alert("사용가능한 닉네임입니다");
          this.setState({
            niccheck: true,
          });
        } else {
          alert("다른 닉네임을 입력해주세요");
        }
        console.log(this.state.niccheck);
      });
  };

  goSign = (e) => {
    if (
      this.state.idcheck === true &&
      this.state.niccheck === true &&
      this.state.pwcheck === true
    ) {
      const user_info = {
        id: this.state.id,
        pw: this.state.pw,
        pw2: this.state.pw2,
        nick: this.state.nick,
      };
      fetch("http://localhost:3001/signup", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user_info),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            alert("회원가입 성공");
            window.location.href = "/";
          } else {
            alert("error");
          }
        });
    } else {
      alert("확인을 모두 눌러주세요");
    }
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="item">
            <div className="top_box">
              <text className="sign_title_text">동규휘제닷컴</text>
            </div>
            <div className="sign_sign_box">
              <text className="sign_sign_text">회원가입</text>
            </div>
            <div className="sign_id_box">
              <text className="sign_id_text">아이디</text>
            </div>
            <div className="sign_id_inputbox">
              <input
                onChange={this.info_input}
                name="id"
                className="sign_id_input"
              />
              <button className="sign_id_right" onClick={this.checkID}>
                확인
              </button>
            </div>
            <div className="sign_pw_box">
              <text className="sign_id_text">비밀번호</text>
            </div>
            <div className="sign_id_inputbox">
              <input
                type="password"
                onChange={this.info_input}
                name="pw"
                className="sign_id_input"
              />
            </div>
            <div className="sign_pw_box">
              <text className="sign_id_text">비밀번호 확인</text>
            </div>
            <div className="sign_id_inputbox">
              <input
                type="password"
                onChange={this.info_input}
                name="pw2"
                className="sign_id_input"
              />
              <button className="sign_id_right" onClick={this.checkPW}>
                확인
              </button>
            </div>
            <div className="sign_pw_box">
              <text className="sign_id_text">닉네임</text>
            </div>
            <div className="sign_id_inputbox">
              <input
                onChange={this.info_input}
                name="nick"
                className="sign_id_input"
              />
              <button className="sign_id_right" onClick={this.checkNICK}>
                확인
              </button>
            </div>
            <div className="sign_enterbottonbox">
              <button className="sign_enterbotton" onClick={this.goSign}>
                가입
              </button>
            </div>
            <div className="sign_blank"></div>
            <div className="sign_bottom_box">
              <a href="/" className="sign_bottom_text">
                로그인 화면으로
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sign_page;
