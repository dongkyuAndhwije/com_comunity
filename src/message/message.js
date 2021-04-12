import React, { Component, input } from "react";
import "./message.css";
import ScrollToBottom from "react-scroll-to-bottom";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import Allview from "./allview";
import Allview2 from "./allview2";

const socket = io("localhost:3001");

class message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: localStorage.getItem("usernick"),
      message: "",
      messages: [],
    };
  }

  componentWillMount() {
    fetch("http://localhost:3001/allmatchGetMessage", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((json) => {
        json.map((row) => {
          let newrow = {
            nickname: row.nickname,
            message: row.message,
          };
          this.setState({
            messages: [...this.state.messages, newrow],
          });
        });
        console.log(this.state.messages);
      });
    // socket.emit("roomjoin", "hwi");
    // socket.on("heejewake", (massage) => {
    //   alert(massage);
    // });

    // socket.on("recieveallmessage", function (box) {
    //   console.log(box);

    //   this.setState({
    //     messages: this.state.messages.concat(box),
    //   });
    // });

    socket.on("recieveallmessage", (box) => {
      console.log(box);
      this.setState({
        messages: [...this.state.messages, box],
      });
    });
    console.log(this.state.messages);
  }

  onchage = (e) => {
    this.setState({
      message: e.target.value,
    });
    console.log(this.state.message);
  };

  sendClick = () => {
    console.log("전송클릭");

    const box = {
      nickname: localStorage.getItem("usernick"),
      message: this.state.message,
    };
    socket.emit("send allmessage", box);
    this.setState({
      message: "",
    });
  };

  render() {
    return (
      <div>
        <div className="chatBox">
          <div className="chatRbox">
            <div className="chatTitleBox">
              <span>실시간 채팅</span>
            </div>
            <div>
              <ScrollToBottom className="chatBody">
                {this.state.messages.map((message) => {
                  if (message.nickname === localStorage.getItem("usernick")) {
                    return (
                      <Allview
                        nickname={message.nickname}
                        message={message.message}
                      />
                    );
                  } else {
                    return (
                      <Allview2
                        nickname={message.nickname}
                        message={message.message}
                      />
                    );
                  }
                })}
                {/* {this.state.messages.map((message) => {
                  return (
                    <Allview
                      nickname={message.nickname}
                      message={message.message}
                    />
                  );
                })} */}
              </ScrollToBottom>
            </div>

            <div className="chatInputBox">
              <input
                className="messageInput"
                name="message"
                onChange={this.onchage}
              />
              <button onClick={this.sendClick}>전송</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default message;
