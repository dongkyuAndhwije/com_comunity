import React, { Component } from "react";
import PropTypes from "prop-types";
import "./login_page.css";

class Login_page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      pw: "",
    };
  }

  login = (e) => {
    e.preventDefault();
    const box = {
      id: this.state.id,
      pw: this.state.pw,
    };
    fetch("http://localhost:3001/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(box),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.boolean === false) {
          alert("아이디 또는 비밀번호가 틀렸어요");
        } else {
          alert("로그인 성공");
          localStorage.setItem("userid", json.id);
          localStorage.setItem("usernick", json.nick);

          console.log(localStorage.getItem("userid"));
          console.log(localStorage.getItem("usernick"));

          // window.localStorage.setItem("user", JSON.stringify(json));
          window.location.replace("/Main");
        }
      });
  };

  idinput = (e) => {
    //id인풋시 초기화
    this.setState({
      id: e.target.value,
    });
    console.log(this.state.id);
  };

  pwinput = (e) => {
    //id인풋시 초기화
    this.setState({
      pw: e.target.value,
    });
    console.log(this.state.pw);
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="item">
            <div className="top_box">
              <text className="login_title_text">동규휘제닷컴</text>
            </div>
            <div className="login_login_box">
              <text className="login_login_text">로그인</text>
            </div>
            <div className="login_id_box">
              <text className="login_id_text">아이디</text>
            </div>
            <div className="login_id_inputbox">
              <input onChange={this.idinput} className="login_id_input" />
            </div>
            <div className="login_pw_box">
              <text className="login_id_text">비밀번호</text>
            </div>
            <div className="login_id_inputbox">
              <input onChange={this.pwinput} className="login_id_input" />
            </div>
            <div className="login_enterbottonbox">
              <button className="login_enterbotton" onClick={this.login}>
                확인
              </button>
            </div>
            <div className="login_blank"></div>
            <div className="login_bottom_box">
              <a
                href="/sign"
                className="login_bottom_text"
                onClick={this.goSign}
              >
                처음이신가요? 가입하세요
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login_page;
