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
  if (!req.cookies.adminToken) {
    return res.send({ status: 0, message: "用户未登录" });
  }
  // #endregion
  // #region 第二步：解码token获得用户username
  let username;
  try {
    username = jwt.verify(req.cookies.adminToken, CACHE.TOKEN_KEY);
  } catch (error) {
    return res.send({ status: 0, message: "错误" });
  }
  // #endregion
  // #region 第三步：查询用户id，后面的所有查询都凭借id查询
  let SQL = ` SELECT *
              FROM management
              WHERE management.username = "${username}"
`;
  let userID = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  userID = userID[0].id;
  req.userID = userID;
  next();
}

router.post("/login", async (req, res) => {
  let SQL = `SELECT * FROM management WHERE username = '${req.body.user}'`;
  let SQLres = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  if (SQLres.length < 1) {
    return res.send({ status: 0, message: "密码或账户错误" });
  }
  if (req.body.passworld != SQLres[0].passworld) {
    return res.send({ status: 0, message: "密码或账户错误" });
  }
  if (req.body.passworld == SQLres[0].passworld) {
    const adminToken = jwt.sign(SQLres[0].username, CACHE.TOKEN_KEY);
    res.cookie("adminToken", adminToken, { maxAge: 9000000, httpOnly: true });
    return res.send({ status: 1, message: "登录成功" });
  }

  res.send("test");
});

router.get("/certification", getuserID, async (req, res) => {
  let SQL = `SELECT
	users.id,
	users.name,
	users.header_img,
	users.birthday,
	users.certification,
	certification.actual_name,
	certification.certification_img1,
	certification.certification_img2 
FROM
	users,
	certification 
WHERE
	certification = '认证中' 
  AND certification.user_id = users.id`;

  let SQLres = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  for (let item of SQLres) {
    item.header_img = `${config.dev}/public/${item.header_img}`;
    item.certification_img1 = `${config.dev}/certification/${item.certification_img1}`;
    item.certification_img2 = `${config.dev}/certification/${item.certification_img2}`;
  }

  res.send({ status: 1, message: "获取成功", data: SQLres });
});

router.put("/isCertification", getuserID, async (req, res) => {
  let SQL = `UPDATE users SET users.certification = '${req.body.whether}' WHERE users.id = ${req.body.id}`;
  JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  if (req.body.whether == "认证失败") {
    SQL = `DELETE FROM certification WHERE user_id = ${req.body.id}`;
    JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  }
  res.send({ status: 1, message: "成功" });
});

router.get("/", async (req, res) => {
  console.log(req.cookies);
  res.send("test");
});

module.exports = router;
