import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import "./boardMete.css";
import TextField from "@material-ui/core/TextField";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class AlertDialogSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      inputpw: "",
    };
  }

  onDelete = (e) => {
    // e.preventDefault();
    const box = {
      inputpw: this.state.inputpw, //입력 패스워드
      rownumber: this.props.data.number, //선택게시물넘버
    };
    fetch("http://localhost:3001/deletePw", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(box),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json === false) {
          alert("비밀번호가 틀렸어요"); //비밀번호 틀림
        } else {
          alert("게시물이 삭제 되었습니다");
          fetch("http://localhost:3001/deleteBoard", {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(box),
          })
            .then((res) => res.json())
            .then((json) => {
              this.props.selectmenuFetch();
              this.props.changeContentOn();
            });
        }
      });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state.inputpw);
  };

  handleClickOpen = () => {
    if (localStorage.getItem("userid") === "") {
      alert("로그인 해주세요");
    } else {
      this.setState({
        open: true,
      });
    }
  };

  accept = () => {
    // alert("확인누름");
    this.setState(
      {
        open: false,
      },
      () => {
        this.onDelete();
        document.getElementById("qq").value = "";
      }
    );
    // console.log(this.props.data);
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
          className="mete_deletebutton"
          style={{}}
        >
          삭제
        </button>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"삭제하시려면 비밀번호를 입력하세요"}
          </DialogTitle>
          <DialogContent>
            <TextField
              //   className="write_title_"
              id="qq"
              label="비밀번호 입력"
              variant="outlined"
              name="inputpw"
              placeholder=""
              type="password"
              onChange={this.onChange}
            />
            {/* <DialogContentText id="alert-dialog-slide-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              취소
            </Button>
            <Button onClick={this.accept} color="primary">
              확인
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogSlide;
