import React, { Component } from "react";
import "./boardreple.css";
import like from "./like.png";

// let list = [];

function createData(number, nick, time, reple, recomend) {
  return { number, nick, time, reple, recomend };
}

class Boardreple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  fetchFunction = () => {
    console.log("hiihi");
    this.setState(
      {
        list: [],
      },
      () => {
        let data = {
          number: this.props.number,
        };
        // console.log("hihi");
        fetch("/api/repDownload", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((json) => {
            console.log("================================================");
            if (json === undefined) {
              alert("오류");
            } else {
              for (let i = 0; i < json.length; i++) {
                this.setState(
                  {
                    list: this.state.list.concat(createData(json[i].number, json[i].nick, json[i].time, json[i].reple, json[i].recomend)),
                  },
                  () => {
                    this.props.replq_q(json.length);
                  }
                );
              }
              console.log(json);
            }
          });
      }
    );
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.number !== prevProps.number || this.props.submintTF !== prevProps.submintTF) {
      this.setState(
        {
          ...this.state,
          selectTagNum: -1,
        },
        () => {
          this.fetchFunction();
        }
      );
    }
  };

  // clickLick = (number, recomend) => {
  //   if (localStorage.getItem("userid") === "") {
  //     alert("로그인 해주세요");
  //   } else {
  //     // console.log(number + "||" + recomend + "||||||||||||||||||||||");
  //     let plus = recomend + 1;
  //     console.log(number + "========" + plus);

  //     let data = {
  //       number: number,
  //       recomend: plus,
  //     };

  //     fetch("http://localhost:3001/updateLike", {
  //       method: "post",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data),
  //     }).then();
  //   }
  // };

  clickLick = (number, recomend) => {
    if (localStorage.getItem("userid") === "") {
      alert("로그인 해주세요");
    } else {
      // console.log(number + "||" + recomend + "||||||||||||||||||||||");
      let plus = recomend + 1;
      console.log(number + "========" + plus);

      let data = {
        number: number,
        recomend: plus,
      };

      fetch("/api/updateLike", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then(this.fetchFunction());
    }
  };

  componentDidMount() {}

  render() {
    const content = this.state.list.map((list) => (
      <div className="rep_box" key={list.number}>
        <div className="rep_title">
          <div className="rep_WTbox">
            <div className="rep_writer">{list.nick}</div>
            <div className="rep_time"> {list.time}</div>
          </div>
          <div className="rep_buttonbox">
            <img src={like} width="12" height="12" className="rep_rexobtn" />
            <div
              className="rep_reco"
              onClick={() => {
                this.clickLick(list.number, list.recomend);
              }}
            >
              좋아요: {list.recomend}
            </div>
          </div>
        </div>
        {/* <div className="rep_reple">{list.reple}</div> */}
        <div className="rep_reple">
          {list.reple.split("\n").map((line) => {
            return (
              <span>
                {line}
                <br />
              </span>
            );
          })}
        </div>
      </div>
    ));

    return <div>{content}</div>;
  }
}

export default Boardreple;
