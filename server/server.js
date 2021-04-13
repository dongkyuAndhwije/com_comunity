const express = require("express"); //
const app = express(); //
const cors = require("cors"); //
const bodyParser = require("body-parser"); //
const port = 3001; //
const route = require("./routes/index"); //

var http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(bodyParser.json()); //
app.use(cors()); //
app.use("/api", route);

io.on("connection", function (socket) {
  console.log("소켓 접속 완료");

  socket.on("roomjoin", (userid) => {
    console.log(userid);
    socket.join(userid);
  });

  //------------------------------------------------------------

  socket.on("allroomjoin", (usernick) => {
    // 전체방 접속
    socket.join("allmatchingroom");
    if (io.sockets === undefined) {
    } else {
      // var clients = io.sockets.adapter.rooms["allmatchingroom"].sockets;
      console.log(usernick + " " + "전체방 접속");
    }
  });

  socket.on("send allmessage", (box) => {
    //DB에 메시지를 저장한다.
    connection.query("INSERT INTO message_table (nickname,message) VALUES (?,?)", [box.nickname, box.message], function (err, rows, fields) {
      if (err) {
        console.log("전체 채팅방 메시지 저장에 에러");
        console.log(err);
      }
    });
    console.log(box); //출력 됨
    // io.emit("heejewake", "123");

    io.emit("recieveallmessage", box);
    console.log("여긴왔나");
  });
});

http.listen(port, () => {
  console.log(`express is running on ${port}`);
});
