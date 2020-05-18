const express = require("express");
const jwt = require("jsonwebtoken");

const mysqlDB = require("../../DB/mysqlDB");
const CACHE = require("../../DB/cache");

var config = require("../../.config");

const router = express.Router({
  mergeParams: true,
});

async function getuserID(req, res, next) {
  // #region 第一步：查询cookie中是否存有用户token，如果没有就返回.
  if (!req.cookies.token) {
    return res.send({ status: 0, message: "用户未登录" });
  }
  // #endregion
  // #region 第二步：解码token获得用户username
  let username;
  try {
    username = jwt.verify(req.cookies.token, CACHE.TOKEN_KEY);
  } catch (error) {
    return res.send({ status: 0, message: "错误" });
  }
  // #endregion
  // #region 第三步：查询用户id，后面的所有查询都根据id查询
  let SQL = ` SELECT users.id
              FROM users
              WHERE users.email = "${username}"
`;
  let userID = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  userID = userID[0].id;
  req.userID = userID;
  next();
}

router.post("/login", async (req, res) => {
  console.log("req", req.body);
  let SQL = `SELECT * FROM management WHERE username = '${req.body.user}'`;
  let SQLres = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  console.log("sql", SQLres[0]);
  if (SQLres.length < 1) {
    return res.send({ status: 0, message: "密码或账户错误" });
  }
  if (req.body.passworld != SQLres[0].passworld) {
    return res.send({ status: 0, message: "密码或账户错误" });
  }
  if (req.body.passworld == SQLres[0].passworld) {
    const token = jwt.sign(SQLres[0].username, CACHE.TOKEN_KEY);
    res.cookie("token", token, { maxAge: 9000000, httpOnly: true });
    return res.send({ status: 1, message: "登录成功" });
  }

  res.send("test");
});

router.get("/", async (req, res) => {
  console.log(req.cookies);
  res.send("test");
});

module.exports = router;
