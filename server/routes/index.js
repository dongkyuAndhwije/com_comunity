const express = require("express");
const router = express.Router();
var mysql = require("mysql");
// nodemailer 모듈 요청

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "jeong1207",
  database: "com_community",
});

connection.connect(function (err) {
  if (err) console.error("mysql connection error : " + err);
  else console.log("mysql is connected successfully!");
}); //mysql 연결

router.post("/log", function (req, res) {
  console.log(req.body);
  let user_id = req.body.id;
  let user_pw = req.body.pw;

  console.log(req.body);

  let sql = "select id,pw from usertable where id=?";
  connection.query(sql, [user_id], function (err, rows, fields) {
    console.log(rows);
    let log = new Object();
    // log.key = row[0].user_key;
    // log.id = rows[0].id;
    // log.email = rows[0].email;
    // log.nickname = row[0].nickname;
    // log.logtf = false;
    log.idtf = false; //아이디가 있는가?
    log.pwtf = false; //비밀번호가 맞는가?

    if (rows[0] === undefined) {
      //쿼리항목이안나오면
      res.send(log);
      console.log("첫번째");
    } else if (rows[0].pw === user_pw) {
      //일치할때
      console.log("두번째");
      log.pwtf = true;
      log.idtf = true;
      console.log(log);
      res.send(log);
    } else {
      //비번이 안맞을 때
      console.log("세번째");
      log.idtf = true;
      res.send(log);
    }
  });
});

//---메세지 가져오기 ---------------------------------------------------------------------------------------------------
router.post("/allmatchGetMessage", (req, res) => {
  console.log("들어옴");
  connection.query(
    "SELECT * FROM message_table order by num asc",
    function (err, rows, field) {
      if (err) {
        console.log(err);
        console.log("전체방 채팅 가져오기 err");
      } else if (rows[0] != undefined) {
        //보낼 메시지가 있음
        console.log(rows);
        res.send(rows);
      } else {
        //보낼 메시지가 없음
      }
    }
  );
});
//---게시판 ---------------------------------------------------------------------------------------------------

router.post("/deleteBoard", (req, res) => {
  const rownumber = req.body.rownumber;

  connection.query(
    "DELETE FROM table_ WHERE number = (?)",
    [rownumber],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log(true);
        res.send(true);
      }
    }
  );
});

router.post("/deletePw", (req, res) => {
  const inputpw = req.body.inputpw;
  const rownumber = req.body.rownumber;
  console.log(inputpw + "======" + rownumber);

  connection.query(
    "SELECT user_pw FROM user_table WHERE user_id = (SELECT id FROM table_ WHERE number =(?))",
    [rownumber],
    function (err, rows, fields) {
      if (rows[0] === undefined) {
        res.send(false);
        // console.log("1번오류");
      } else if (rows[0].user_pw === inputpw) {
        res.send(true);
        // console.log("2번오류");
      } else {
        res.send(false);
        // console.log("3번오류");
      }
    }
  );
});

router.post("/updateLikeB", (req, res) => {
  let number = req.body.number;
  let recomend = req.body.recomend;

  let sql = "UPDATE table_ SET recomend = (?) WHERE number = (?)";

  connection.query(sql, [recomend, number], function (err, result) {
    //연결!
    if (err) throw err;
    // console.log("1 record update");
  });
});

router.post("/updateLike", (req, res) => {
  let number = req.body.number;
  let recomend = req.body.recomend;

  let sql = "UPDATE reple_ SET recomend = (?) WHERE number = (?)";

  connection.query(sql, [recomend, number], function (err, result) {
    //연결!
    if (err) throw err;
    // console.log("1 record update");
  });
});

router.post("/repDownload", (req, res) => {
  let number = req.body.number;
  let sql = "SELECT * FROM reple_ WHERE kinds=(?)";
  console.log("eeeeeeeeeeeee");
  connection.query(sql, [number], function (err, rows, result) {
    console.log("111111111112211");
    if (err) {
      console.log(err);
      throw err;
    } else {
      res.send(rows);
    }
  });
});

router.post("/repUpload", (req, res) => {
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

router.post("/getContent", (req, res) => {
  let number = req.body.number;
  let writer = req.body.writer;
  let sql = "SELECT * FROM table_ WHERE number=? AND writer=?";

  connection.query(sql, [number, writer], function (err, rows, result) {
    //연결!
    if (err) {
      console.log(err);
      throw err;
    } else {
      // console.log(rows);
      // console.log(result);
      console.log(rows);

      res.send(rows);
    }
  });
});
router.post("/getUser", (req, res) => {
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

router.post("/download", (req, res) => {
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

router.post("/upload", (req, res) => {
  let title = req.body.title; //받은 데이터 req의 body의 title
  let content = req.body.content; //받은 데이터 req의 body의 content
  let writer = req.body.writer;
  let time = req.body.time;
  let user_id = req.body.userid;
  let clickmenu = req.body.clickmenu;

  // console.log(clickmenu);

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

router.post("/login", (req, res) => {
  const id = req.body.id;
  const pw = req.body.pw;
  const box = {};
  box.boolean = false;

  connection.query(
    "SELECT user_id FROM user_table WHERE user_id = (?)",
    [id],
    function (err, rows, fields) {
      console.log("로그인");
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

router.post("/checkid", function (req, res) {
  let user_id = req.body.id;

  console.log(req.body.id);
  let sql = "select user_id from user_table where user_id=?"; //sql 쿼리문-> id 에맞는 row들고 오고싶다
  connection.query(sql, [user_id], function (err, rows, fields) {
    // console.log(rows);
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

router.post("/checknick", function (req, res) {
  let user_nick = req.body.nick;

  console.log(req.body.nick);
  let sql = "select user_id from user_table where user_nick=?"; //sql 쿼리문-> id 에맞는 row들고 오고싶다
  connection.query(sql, [user_nick], function (err, rows, fields) {
    // console.log(rows);
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

router.post("/signup", (req, res) => {
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

module.exports = router;
