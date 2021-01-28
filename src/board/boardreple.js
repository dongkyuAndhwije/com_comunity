import React, { Component } from "react";
import "./boardreple.css";
import like from "./like.png";

let list = [];

function createData(nick, time, reple, recomend) {
  return { nick, time, reple, recomend };
}

class Boardreple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   무
    };
  }

  componentDidMount() {
    let data = {};

    fetch("http://localhost:3001/repDownload", {
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
            list = list.concat(
              createData(
                json[i].nick,
                json[i].time,
                json[i].reple,
                json[i].recomend
              )
            );
          }

          console.log(json);
        }
      });
  }
  render() {
    const content = list.map((list) => (
      <div className="rep_box">
        <div className="rep_title">
          <div className="rep_WTbox">
            <div className="rep_writer">{list.nick}</div>
            <div className="rep_time"> {list.time}</div>
          </div>
          <div className="rep_buttonbox">
            <img src={like} width="12" height="12" className="rep_rexobtn" />
            <div className="rep_reco">좋아요: {list.recomend}</div>
          </div>
        </div>
        <div className="rep_reple">{list.reple}</div>
      </div>
    ));

    return <div>{content}</div>;
  }
}

export default Boardreple;
