import React from "react";
import io from "socket.io-client";
const socket = io();

export default class Socket1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "been",
    };
  }
  componentWillMount() {
    socket.emit("roomjoin", this.state.userid);
    // socket.on("heejewake", (touserid) => {
    //   alert(touserid);
    // });
  }
  onclick = (e) => {
    const str = "hwi";
    socket.emit("alert", str);
  };
  render() {
    return (
      <div>
        <button onClick={this.onclick}>알림창 보내기</button>
      </div>
    );
  }
}
