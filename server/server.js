const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3001;
app.use(bodyParser.json());
const mysql = require("mysql");

app.use(cors());
// app.use("/", route);
app.listen(port, () => {
  console.log(`express is running on ${port}`);
});

let connection = mysql.createConnection({
  //mysql연결하기위함
  host: "localhost",
  user: "root",
  password: "jeong1207",
  database: "com_community", //내 데이터베이스 이름
});

connection.connect(function (err) {
  if (err) console.error("mysql connection error : " + err);
  else console.log("mysql is connected successfully!");
});
//---게시판 ---------------------------------------------------------------------------------------------------

app.post("/updateLikeB", (req, res) => {
  let number = req.body.number;
  let recomend = req.body.recomend;

  let sql = "UPDATE table_ SET recomend = (?) WHERE number = (?)";

  connection.query(sql, [recomend, number], function (err, result) {
    //연결!
    if (err) throw err;
    // console.log("1 record update");
  });
});

app.post("/updateLike", (req, res) => {
  let number = req.body.number;
  let recomend = req.body.recomend;

  let sql = "UPDATE reple_ SET recomend = (?) WHERE number = (?)";

  connection.query(sql, [recomend, number], function (err, result) {
    //연결!
    if (err) throw err;
    // console.log("1 record update");
  });
});

app.post("/repDownload", (req, res) => {
  let number = req.body.number;
  let sql = "SELECT * FROM reple_ WHERE kinds=(?)";

  connection.query(sql, [number], function (err, rows, result) {
    //연결!
    if (err) throw err;
    else {
      // console.log(rows);
      // console.log(result);
      res.send(rows);
    }
  });
});

app.post("/repUpload", (req, res) => {
  let reple = req.body.reple; //받은 데이터 req의 body의 content
  let writer = req.body.writer;
  let time = req.body.time;
  let id = req.body.id;
  let number = req.body.number;

  let sql = "INSERT INTO reple_ (nick,time,reple,id,kinds) VALUES(?, ?,?,?,?);";

  connection.query(
    sql,
    [writer, time, reple, id, number],
    function (err, result) {
      //연결!
      if (err) throw err;
      console.log("1 record inserted");
    }
  );
});

app.post("/getContent", (req, res) => {
  let number = req.body.number;
  let writer = req.body.writer;
  let sql = "SELECT * FROM table_ WHERE number=? AND writer=?";

  connection.query(sql, [number, writer], function (err, rows, result) {
    //연결!
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log(rows);
      // console.log(result);

      res.send(rows);
    }
  });
});

app.post("/getUser", (req, res) => {
  let sql = "SELECT * FROM user_table WHERE user_id =(?)";

  connection.query(sql, [req.body.id], function (err, rows, result) {
    //연결!
    if (err) {
      console.log(err);
      throw err;
    } else {
      // console.log(rows);
      // console.log(result);
      res.send(rows);
    }
  });
});

app.post("/download", (req, res) => {
  let clickmenu = req.body.clickmenu;

  let sql = "SELECT * FROM table_ WHERE kinds = (?)";

  connection.query(sql, [clickmenu], function (err, rows, result) {
    //연결!
    if (err) throw err;
    else {
      // console.log(rows);
      // console.log(result);
      res.send(rows);
    }
  });
});

app.post("/upload", (req, res) => {
  let title = req.body.title; //받은 데이터 req의 body의 title
  let content = req.body.content; //받은 데이터 req의 body의 content
  let writer = req.body.writer;
  let time = req.body.time;
  let user_id = req.body.userid;
  let clickmenu = req.body.clickmenu;

  console.log(clickmenu);

  let sql =
    "INSERT INTO table_ (title,content,writer,time,id,kinds) VALUES(?, ?,?,?,?,?);";

  connection.query(
    sql,
    [title, content, writer, time, user_id, clickmenu],
    function (err, result) {
      //연결!
      if (err) throw err;
      console.log("1 record inserted");
    }
  );
});

//---로그인---------------------------------------------------------------------------------------------------

app.post("/login", (req, res) => {
  const id = req.body.id;
  const pw = req.body.pw;
  const box = {};
  box.boolean = false;

  connection.query(
    "SELECT user_id FROM user_table WHERE user_id = (?)",
    [id],
    function (err, rows, fields) {
      if (rows[0] === undefined) {
        res.send(box);
      } else {
        connection.query(
          "SELECT * FROM user_table WHERE  user_id = (?) AND user_pw =(?)",
          [id, pw],
          function (err, rows, fields) {
            if (rows[0] === undefined) {
              res.send(box);
            } else {
              box.id = rows[0].user_id;
              box.pw = rows[0].user_pw;
              box.nick = rows[0].user_nick;
              box.boolean = true;
              res.send(box);
            }
          }
        );
      }
    }
  );
});

//----------회원가입--------------------------------------------------------------------------------------------

app.post("/checkid", function (req, res) {
  let user_id = req.body.id;

  console.log(req.body.id);
  let sql = "select user_id from user_table where user_id=?"; //sql 쿼리문-> id 에맞는 row들고 오고싶다
  connection.query(sql, [user_id], function (err, rows, fields) {
    console.log(rows);
    let checkid = new Object();
    checkid.tf = false;

    if (rows[0] === undefined) {
      checkid.tf = true;
      res.send(checkid);
    } else {
      checkid.tf = false;
      res.send(checkid);
    }
  });
});

app.post("/checknick", function (req, res) {
  let user_nick = req.body.nick;

  console.log(req.body.nick);
  let sql = "select user_id from user_table where user_nick=?"; //sql 쿼리문-> id 에맞는 row들고 오고싶다
  connection.query(sql, [user_nick], function (err, rows, fields) {
    console.log(rows);
    let checkid = new Object();
    checkid.tf = false;

    if (rows[0] === undefined) {
      checkid.tf = true;
      res.send(checkid);
    } else {
      checkid.tf = false;
      res.send(checkid);
    }
  });
});

app.post("/signup", (req, res) => {
  //회원가입
  const id = req.body.id;
  const pw = req.body.pw;
  const nick = req.body.nick;
  connection.query(
    "insert into user_table (user_id,user_pw, user_nick) values (?,?,?)",
    [id, pw, nick],
    function (err, rows, fields) {
      if (err) {
        res.send(false);
      } else {
        res.send(true);
      }
    }
  );
});
