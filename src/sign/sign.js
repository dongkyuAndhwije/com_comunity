import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
// import "../board/boardMete.css";
import TextField from "@material-ui/core/TextField";
// import "../main/main.css";
import "./sign_page.css";
// import "../login/login_page.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Login extends Component {
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

    fetch("api/checkid", {
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

    fetch("api/checknick", {
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
    if (this.state.idcheck === true && this.state.niccheck === true && this.state.pwcheck === true) {
      const user_info = {
        id: this.state.id,
        pw: this.state.pw,
        pw2: this.state.pw2,
        nick: this.state.nick,
      };
      fetch("/api/signup", {
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

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state.inputpw);
  };

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        <button
          // variant="outlined"
          // color="primary"
          onClick={this.handleClickOpen}
          className="main_login"
          style={{}}
        >
          회원가입
        </button>
        <Dialog open={this.state.open} TransitionComponent={Transition} keepMounted onClose={this.handleClose} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
          <DialogContent>
            <div className="sign_subtitle">컴퓨터공학닷컴</div>
            <div className="sign_title">
              회원가입
              {/* <DialogTitle id="alert-dialog-slide-title">{"로그인"}</DialogTitle> */}
            </div>

            <div className="sign_inputbox">
              <div className="login_idinput">
                {/* <input onChange={this.idinput} className="login_id_input" /> */}
                <TextField
                  //   className="write_title_"
                  id="id"
                  label="아이디 입력"
                  variant="outlined"
                  name="id"
                  placeholder=""
                  onChange={this.info_input}
                  className="sign_input"
                />
              </div>

              <button className="sign_id_right" onClick={this.checkID}>
                확인
              </button>
            </div>
            {/* <div className="sign_pw_box">
              <text className="sign_id_text">비밀번호</text>
            </div> */}
            <div className="sign_inputbox">
              <TextField
                //   className="write_title_"
                id="pw"
                label="비밀번호 입력"
                variant="outlined"
                name="pw"
                placeholder=""
                type="password"
                onChange={this.info_input}
                className="sign_input"
              />
            </div>

            <div className="sign_inputbox">
              <TextField
                //   className="write_title_"
                id="pw2"
                label="비밀번호 확인"
                variant="outlined"
                name="pw2"
                placeholder=""
                type="password"
                onChange={this.info_input}
                className="sign_input"
              />
              <button className="sign_id_right" onClick={this.checkPW}>
                확인
              </button>
            </div>

            <div className="sign_inputbox">
              <TextField
                id="nick"
                label="닉네임 입력"
                variant="outlined"
                name="nick"
                placeholder=""
                // type="password"
                onChange={this.info_input}
                className="sign_input"
              />
              <button className="sign_id_right" onClick={this.checkNICK}>
                확인
              </button>
            </div>
          </DialogContent>
          <div className="sign_buttons">
            <Button onClick={this.handleClose} color="primary">
              취소
            </Button>
            <Button onClick={this.goSign} color="primary">
              가입
            </Button>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default Login;
