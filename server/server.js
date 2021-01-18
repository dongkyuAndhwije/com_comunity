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
//------------------------------------------------------------------------------------------------------

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

//------------------------------------------------------------------------------------------------------

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