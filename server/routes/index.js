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

module.exports = router;
