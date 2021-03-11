import React from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3001/");

export default class Socket2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "hwi",
    };
  }
  componentWillMount() {
    socket.emit("roomjoin", this.state.userid);
    socket.on("heejewake", (massage) => {
      alert(massage);
    });
  }
  render() {
    return <div>asdf</div>;
  }
}
