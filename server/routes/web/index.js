const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const mysqlDB = require("../../DB/mysqlDB");
const CACHE = require("../../DB/cache");

var config = require("../../.config");

CACHE.getCode();

async function getuserID(req, res, next) {
  // #region 第一步：查询cookie中是否存有用户token，如果没有就返回.
  if (!req.cookies.token) {
    return res.send({ status: 0, message: "用户未登录" });
  }
  // #endregion
  // #region 第二步：解码token获得用户email
  let useremial;
  try {
    useremial = jwt.verify(req.cookies.token, CACHE.TOKEN_KEY);
  } catch (error) {
    return res.send({ status: 0, message: "错误" });
  }
  // #endregion
  // #region 第三步：查询用户id，后面的所有查询都根据id查询
  let SQL = ` SELECT users.id
              FROM users
              WHERE users.email = "${useremial}"
`;
  let userID = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  userID = userID[0].id;
  req.userID = userID;
  next();
}

const router = express.Router({
  mergeParams: true,
});
// 验证
router.post("/register", async (req, res) => {
  // #region 第一步：查询缓存中的captchaPool验证码池是否还保留有请求中email的验证码
  if (!CACHE.captchaPool[req.body.email]) {
    return res.send({ status: 2, message: "验证码超时，跳转重新登陆" });
  }
  //#endregion
  // #region 第二步：查询captchaPool验证码池中email对应的验证码是否和请求的验证码相同
  let verify = CACHE.captchaPool[req.body.email].captcha == req.body.captcha;
  if (!verify) {
    return res.send({ status: 0, message: "验证码错误" });
  }
  // #endregion
  // #region 第三步：将用户信息插入数据库,清除缓存
  let SQLinsert = `
  INSERT INTO users(email,name,passworld)
  VALUES ("${CACHE.captchaPool[req.body.email].useremail}",
  "${CACHE.captchaPool[req.body.email].useremail}",
  "${CACHE.captchaPool[req.body.email].passworld}")`;
  mysqlDB(SQLinsert);
  let SQLinsert2 = `
  INSERT INTO userinfo(email)
  VALUES ("${CACHE.captchaPool[req.body.email].useremail}")`;
  mysqlDB(SQLinsert2);
  delete CACHE.captchaPool[req.body.useremail];
  let tempTime = CACHE.timeoutPool[req.body.useremail];
  delete CACHE.timeoutPool[req.body.useremail];
  clearTimeout(tempTime);
  // #endregion
  // #region 第四步：生成token，并存入cookie
  const token = jwt.sign(
    CACHE.captchaPool[req.body.email].useremail,
    CACHE.TOKEN_KEY
  );
  res.cookie("token", token, { maxAge: 900000, httpOnly: true });
  // #endregion
  res.send({ status: 1, message: "验证码正确", token: token });
});

// 登录注册
router.post("/login", async (req, res) => {
  // #region 第一步：验证用户是否已经存在
  let SQLselect = `SELECT * FROM users where email="${req.body.useremail}"`;
  let user = await mysqlDB(SQLselect);
  // #endregion
  // #region 第二步：2.1 如果用户不存在，既查询到的user为空数组
  if (user.length == 0) {
    let captcha = new Date().valueOf() % 1000000; //生成验证码
    CACHE.captchaPool[req.body.useremail] = {
      useremail: req.body.useremail,
      passworld: req.body.passworld,
      captcha: captcha.toString(),
      timestamp: new Date().valueOf(),
    };
    // 如果定时器存在则清除定时器
    if (CACHE.timeoutPool[req.body.useremail]) {
      clearTimeout(CACHE.timeoutPool[req.body.useremail]);
    }
    // 设置定时器清除缓存任务
    CACHE.timeoutPool[req.body.useremail] = setTimeout(() => {
      delete CACHE.captchaPool[req.body.useremail];
      let tempTime = CACHE.timeoutPool[req.body.useremail];
      delete CACHE.timeoutPool[req.body.useremail];
      clearTimeout(tempTime);
    }, 300000);

    // 调用发送验证码
    // #region
    const verify = require("../../nodemailer");
    verify({
      from: "二手校园<lingang_chen@126.com>", // 发送人邮箱
      to: "1821437315@qq.com", // 接收人邮箱，多个使用数组或用逗号隔开
      subject: "二手校园注册验证", // 主题
      html: `<p>尊敬的${req.body.useremail}</p>
              <p>您正在注册校园二手交易平台</p>
              <p>您的验证码是：<span style="background-color: skyblue;">${captcha}</span></p>
              <p>不是本人请忽略该邮件</p>`, // 邮件正文 可以为 HTML 或者 text
    });

    //#endregion
    return res.send({ status: 2, message: "该邮箱未注册，跳转输入验证码" });
  }
  // #endregion
  // #region 第三步：2.2 如果用户存在，判断密码是否相同
  let passworldValid = user[0].passworld == req.body.passworld; // 验证邮箱密码

  if (!passworldValid) {
    return res.send({
      status: 0,
      message: "密码错误",
    });
  }
  // #endregion
  // #region 第四步：生成token，并存入cookie
  const token = jwt.sign(user[0].email, CACHE.TOKEN_KEY);
  res.cookie("token", token, { maxAge: 9000000, httpOnly: true });
  // #endregion
  res.send({ status: 1, token: token });
});

// 重新获取验证码
router.get("/getcode", async (req, res) => {
  let captcha = new Date().valueOf() % 1000000; //生成验证码
  let user = CACHE.captchaPool[req.query.email];
  // 查询验证码是否超时
  if (!user) {
    return res.send({ status: 2, message: "获取验证码超时，跳转重新登陆" });
  }
  // if (user.timestamp - new Date().valueOf() < 30000) {
  //   return res.send({ status: 3, message: "每30秒只能请求一次" });
  // }
  user.captcha = captcha;
  user.timestamp = new Date().valueOf();

  // 清除定时器连接池中之前用于删除验证码的定时器
  let usertimeout = CACHE.timeoutPool[req.query.email];
  if (usertimeout) {
    clearTimeout(usertimeout);
  }
  // 再设置定时器清除缓存任务
  usertimeout = setTimeout(() => {
    delete CACHE.captchaPool[req.query.email];
    let tempTime = CACHE.timeoutPool[req.query.email];
    delete CACHE.timeoutPool[req.query.email];
    clearTimeout(tempTime);
  }, 300000);

  // 调用发送验证码
  // #region
  const verify = require("../../nodemailer");
  verify({
    from: "二手校园<lingang_chen@126.com>", // 发送人邮箱
    to: "1821437315@qq.com", // 接收人邮箱，多个使用数组或用逗号隔开
    subject: "二手校园注册验证", // 主题
    html: `<p>尊敬的${req.query.email}</p>
              <p>您正在注册校园二手交易平台</p>
              <p>您的验证码是：<span style="background-color: skyblue;">${captcha}</span></p>
              <p>不是本人请忽略该邮件</p>`, // 邮件正文 可以为 HTML 或者 text
  });

  res.send({ status: 0, message: "获取验证码成功" });
});

// 获取个人信息
router.get("/profile", getuserID, async (req, res) => {
  // #region 第一步： 使用getuserID中间件查找出用户的userID，附在req.userID上
  // #region 第二步：通过获取的userID查询用户数据
  let SQL = ` SELECT 
              id,name,email,header_img,gender,
              birthday,school,certification
              FROM users
              WHERE users.id = "${req.userID}"
  `;
  let userTemp = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  userTemp = userTemp[0];
  let userData = {
    id: userTemp.id,
    name: userTemp.name,
    email: userTemp.email,
    gender: userTemp.gender,
    school: userTemp.school,
    birthday: userTemp.birthday,
    certification: userTemp.certification,
    header_img_url: `${config.dev}/public/${userTemp.header_img}`,
  };

  // 查询用户关注的人
  SQL = ` SELECT
	users.name,
	users.header_img,
	users.id,
	attentions.create_time 
FROM
	attentions,
	users 
WHERE
	from_id =  ${userData.id} 
	AND to_id = users.id 
ORDER BY
	create_time
  `;
  userTemp = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  for (item of userTemp) {
    item.header_img = `${config.dev}/public/${item.header_img}`;
  }
  userData.attention_others = userTemp;
  // 查询关注用户的人，既粉丝
  SQL = ` SELECT attention_me.from_attention_id
          FROM attention_me
          WHERE attention_me.user_id = ${userData.id}
  `;
  userTemp = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  userData.attention_me = userTemp;
  // 查询给用户点赞的人
  SQL = ` SELECT *
          FROM up
          WHERE up.to_id = ${userData.id}
  `;
  userTemp = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  userData.up_me = userTemp;
  // 查询用户发布的商品
  SQL = ` SELECT *
  FROM commodity
  WHERE commodity.from_id= ${userData.id}
  `;
  userTemp = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  for (item of userTemp) {
    if (item.commodity_img1_url)
      item.commodity_img1_url = `${config.dev}/post/${item.commodity_img1_url}`;
    if (item.commodity_img2_url)
      item.commodity_img2_url = `${config.dev}/post/${item.commodity_img2_url}`;
    if (item.commodity_img3_url)
      item.commodity_img3_url = `${config.dev}/post/${item.commodity_img3_url}`;
    if (item.commodity_img4_url)
      item.commodity_img4_url = `${config.dev}/post/${item.commodity_img4_url}`;
    if (item.commodity_img5_url)
      item.commodity_img5_url = `${config.dev}/post/${item.commodity_img5_url}`;
    if (item.commodity_img6_url)
      item.commodity_img6_url = `${config.dev}/post/${item.commodity_img6_url}`;
  }
  userData.posts = userTemp;

  // 查询用户收藏的商品
  SQL = ` SELECT * 
  FROM collects,commodity
   WHERE collects.from_id = ${userData.id} AND commodity.commodity_id = collects.owner_id
  `;
  userTemp = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  for (item of userTemp) {
    if (item.commodity_img1_url)
      item.commodity_img1_url = `${config.dev}/post/${item.commodity_img1_url}`;
    if (item.commodity_img2_url)
      item.commodity_img2_url = `${config.dev}/post/${item.commodity_img2_url}`;
    if (item.commodity_img3_url)
      item.commodity_img3_url = `${config.dev}/post/${item.commodity_img3_url}`;
    if (item.commodity_img4_url)
      item.commodity_img4_url = `${config.dev}/post/${item.commodity_img4_url}`;
    if (item.commodity_img5_url)
      item.commodity_img5_url = `${config.dev}/post/${item.commodity_img5_url}`;
    if (item.commodity_img6_url)
      item.commodity_img6_url = `${config.dev}/post/${item.commodity_img6_url}`;
  }
  userData.collect = userTemp;
  // #endregion
  res.send({
    status: 1,
    message: "用户已登录",
    data: userData,
  });
});

// 修改头像
const multer = require("multer");
const upload = multer({ dest: __dirname + "../../../DB/webpublic" });
router.post("/upload", getuserID, upload.single("file"), async (req, res) => {
  // #region 第一步：使用getuserID中间件查找出用户的userID，附在req.userID上
  // #region 第二步：通过获取的userID查询旧的图片地址
  let SQL = `SELECT users.header_img FROM users WHERE users.id = ${req.userID}`;
  let oldHeaderUrl = await JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  oldHeaderUrl = oldHeaderUrl[0].header_img;
  if (!oldHeaderUrl.includes("default")) {
    fs.unlink(`${__dirname}../../../DB/webpublic/${oldHeaderUrl}`, (err) => {
      if (err) return console.log(err);
    });
  }
  // #endregion
  // #region 第三步：将新的图片地址存入
  SQL = ` UPDATE users 
          SET users.header_img = "${req.file.filename}"
          WHERE id = ${req.userID}`;

  JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  const file = req.file;
  res.send(file);
});

// 修改其他相关信息
router.put("/putprofile", getuserID, async (req, res) => {
  let SQL = ` UPDATE users 
              SET users.${req.body.field} = "${req.body.name}"
              WHERE id = ${req.userID}`;
  JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  res.send({ status: 1, message: "修改成功" });
});
// 学生认证
const certification = multer({ dest: __dirname + "../../../DB/certification" });
router.post(
  "/certification",
  getuserID,
  certification.array("file", 2),
  async (req, res) => {
    let certification_img1 = req.files[0].filename;
    let certification_img2 = req.files[1].filename;
    let SQL = `INSERT INTO certification(card,name,user_id,certification_img1,certification_img2)
    VALUES ('${req.body.idCard}','${req.body.name}',${req.userID},'${certification_img1}','${certification_img2}')`;
    JSON.parse(JSON.stringify(await mysqlDB(SQL)));

    function GetBirthDay(idCard) {
      var birthday = "";
      if (idCard != null && idCard != "") {
        if (idCard.length == 15) {
          birthday = "19" + idCard.substr(6, 6);
        } else if (idCard.length == 18) {
          birthday = idCard.substr(6, 8);
        }
        birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
      }

      return birthday;
    }
    let birthday = GetBirthDay(req.body.idCard);
    SQL = `UPDATE users 
    SET users.birthday = "${birthday}",users.certification = '认证中'
    WHERE id = ${req.userID};`;
    JSON.parse(JSON.stringify(await mysqlDB(SQL)));
    res.send({ status: 1, test: "上传成功" });
  }
);

router.post("/certificationapi", getuserID, async (req, res) => {
  const axios = require("axios");
  let nodeRes = await axios.get(
    `https://api.jisuapi.com/idcard/query?appkey=a8cac32fc6c2bcdd&idcard=${req.body.idcard}`
  );
  nodeRes = nodeRes.data;

  let birth = nodeRes.result.birth;
  birth = birth.replace("年", "-").replace("月", "-").replace("日", "");
  let SQL = ` UPDATE users 
              SET users.birthday = "${birth}" , users.certification = "认证中"
              WHERE id = ${req.userID}`;

  JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  res.send({ status: 1, message: "修改成功" });
});

router.put("/quit", async (req, res) => {
  res.clearCookie("token");
  await res.send({ status: 1, message: "成功" });
});

const postgoods = multer({ dest: __dirname + "../../../DB/postgoods" });
router.post(
  "/postgoods",
  getuserID,
  postgoods.array("file", 6),
  async (req, res) => {
    let column = [];
    let value = [];
    for (let file of req.files) {
      value.push(`,"${file.filename}"`);
      column.push(`,commodity_img${column.length + 1}_url`);
    }
    let SQL = ` INSERT INTO 
    commodity(from_id,textarea,create_time,price${column.join("")})
    VALUES (${
      req.userID
    },'${req.body.textarea.toString()}',${new Date().getTime()},${
      req.body.price
    }${value.join("")});`;
    JSON.parse(JSON.stringify(await mysqlDB(SQL)));
    res.send({ status: 1, message: "上传成功" });
  }
);

router.get("/getarticle", getuserID, async (req, res) => {
  let SQL = `SELECT * FROM commodity WHERE commodity_id = ${req.query.id}`;
  let sqlres = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  sqlres = sqlres[0];
  for (let index = 0; index < 6; index++) {
    if (sqlres[`commodity_img${index + 1}_url`]) {
      sqlres[`commodity_img${index + 1}_url`] = `${config.dev}/post/${
        sqlres[`commodity_img${index + 1}_url`]
      }`;
    }
  }
  res.send({ status: 1, message: "获取成功", data: sqlres });
});

router.get("/simple", getuserID, async (req, res) => {
  let SQL = ` SELECT 
  id,name,email,header_img,gender,
  birthday,school,certification
  FROM users
  WHERE users.id = "${req.query.id}"
  `;
  let userTemp = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  userTemp = userTemp[0];
  let userData = {
    id: userTemp.id,
    name: userTemp.name,
    email: userTemp.email,
    gender: userTemp.gender,
    school: userTemp.school,
    birthday: userTemp.birthday,
    certification: userTemp.certification,
    header_img_url: `${config.dev}/public/${userTemp.header_img}`,
  };
  res.send({ status: 1, message: "获取成功", data: userData });
});

router.post("/comments", getuserID, async (req, res) => {
  let body = req.body;
  let SQL = `INSERT INTO comment(create_time,owner_id,from_id,content,to_id,parent_id)
          VALUES (${body.createTime},${body.commodityId},${req.userID},'${
    body.content
  }',${body.toID},${body.parentId || null})`;
  JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  res.send({ status: 1, message: "插入成功" });
});

router.get("/getcomments", getuserID, async (req, res) => {
  let query = req.query;
  let SQL = `SELECT
	comment.content,
	comment.create_time,
	comment.from_id,
	comment.id,
	comment.owner_id,
  comment.parent_id,
  comment.to_id,
  users.name,
  users.header_img
FROM
	comment,
	users 
WHERE
	comment.owner_id = ${query.commodityId} 
  AND comment.from_id = users.id
	AND comment.parent_id IS NULL`;

  let SqLres = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  for (let item of SqLres) {
    item.header_img = `${config.dev}/public/${item.header_img}`;
  }
  SQL = `SELECT
	comment.content,
	comment.create_time,
	comment.from_id,
	comment.id,
	comment.owner_id,
  comment.parent_id,
  comment.to_id,
  users.name,
  users.header_img
FROM
	comment,
	users 
WHERE
	comment.owner_id = ${query.commodityId} 
  AND comment.from_id = users.id
	AND comment.parent_id IS NOT NULL`;
  let SqLres2 = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  for (let item of SqLres2) {
    for (let index of SqLres) {
      if (index.id == item.parent_id) {
        index.replace = item;
      }
      item.header_img = `${config.dev}/public/${item.header_img}`;
    }
  }
  res.send({ status: 1, message: "插入成功", data: SqLres });
});

router.get("/getgoods", async (req, res) => {
  let SQL = `SELECT
	commodity.commodity_id,
	commodity.price,
	commodity.textarea,
	commodity.create_time,
	commodity.commodity_img1_url,
	commodity.commodity_img2_url,
	commodity.commodity_img3_url,
	commodity.commodity_img4_url,
	commodity.commodity_img5_url,
	commodity.commodity_img6_url,
	users.name
FROM
	commodity,
	users 
WHERE
	users.id = commodity.from_id 
ORDER BY
	create_time DESC`;
  let SQLres = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  for (item of SQLres) {
    if (item.commodity_img1_url)
      item.commodity_img1_url = `${config.dev}/post/${item.commodity_img1_url}`;
    if (item.commodity_img2_url)
      item.commodity_img2_url = `${config.dev}/post/${item.commodity_img2_url}`;
    if (item.commodity_img3_url)
      item.commodity_img3_url = `${config.dev}/post/${item.commodity_img3_url}`;
    if (item.commodity_img4_url)
      item.commodity_img4_url = `${config.dev}/post/${item.commodity_img4_url}`;
    if (item.commodity_img5_url)
      item.commodity_img5_url = `${config.dev}/post/${item.commodity_img5_url}`;
    if (item.commodity_img6_url)
      item.commodity_img6_url = `${config.dev}/post/${item.commodity_img6_url}`;
  }
  res.send({ status: 1, message: "成功", data: SQLres });
});

router.get("/getattengoods", getuserID, async (req, res) => {
  let SQL;
  if ((req.query.attention = "all")) {
    SQL = `SELECT
  users.name,
  commodity.commodity_id,
  commodity.price,
  commodity.textarea,
  commodity.create_time,
  commodity.commodity_img1_url,
  commodity.commodity_img2_url,
  commodity.commodity_img3_url,
  commodity.commodity_img4_url,
  commodity.commodity_img5_url,
  commodity.commodity_img6_url
  FROM
  attentions,
  commodity ,
  users
  WHERE
  attentions.from_id = ${req.userID}
  AND attentions.to_id = commodity.from_id
  AND users.id = commodity.from_id
  ORDER BY
  attentions.create_time DESC`;
  }
  let SQLres = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  for (item of SQLres) {
    if (item.commodity_img1_url)
      item.commodity_img1_url = `${config.dev}/post/${item.commodity_img1_url}`;
    if (item.commodity_img2_url)
      item.commodity_img2_url = `${config.dev}/post/${item.commodity_img2_url}`;
    if (item.commodity_img3_url)
      item.commodity_img3_url = `${config.dev}/post/${item.commodity_img3_url}`;
    if (item.commodity_img4_url)
      item.commodity_img4_url = `${config.dev}/post/${item.commodity_img4_url}`;
    if (item.commodity_img5_url)
      item.commodity_img5_url = `${config.dev}/post/${item.commodity_img5_url}`;
    if (item.commodity_img6_url)
      item.commodity_img6_url = `${config.dev}/post/${item.commodity_img6_url}`;
  }
  res.send({ status: 1, message: "成功", data: SQLres });
});

router.delete("/deletearticle", getuserID, async (req, res) => {
  let SQL = `DELETE FROM commodity WHERE commodity_id = ${req.body.commodity_id}`;
  let SQLres = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  res.send({ status: 1, message: "成功", data: SQLres });
});

router.post("/islike", getuserID, async (req, res) => {
  let SQL = `SELECT * FROM up WHERE owner_id = ${req.body.commodity_id} AND from_id = ${req.userID}`;
  let SQLres = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  if (!SQLres.length) {
    SQL = `INSERT INTO up(from_id,to_id,owner_id)
    VALUES(${req.userID},${req.body.to_id},${req.body.commodity_id})`;
  } else {
    SQL = `DELETE FROM up WHERE owner_id = ${req.body.commodity_id} AND from_id = ${req.userID}`;
  }
  JSON.parse(JSON.stringify(await mysqlDB(SQL)));

  res.send({ status: 1, message: "成功", data: !SQLres.length });
});

router.get("/getlike", getuserID, async (req, res) => {
  let SQL = `SELECT * FROM up WHERE owner_id = ${req.query.owner_id} AND from_id = ${req.userID}`;
  let SQLres = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  res.send({ status: 1, message: "成功", data: SQLres.length });
});

router.post("/iscollects", getuserID, async (req, res) => {
  let SQL = `SELECT * FROM collects WHERE owner_id = ${req.body.commodity_id} AND from_id = ${req.userID}`;
  let SQLres = JSON.parse(JSON.stringify(await mysqlDB(SQL)));

  if (req.userID == req.body.to_id) {
    res.send({ status: 3, message: "错误", data: false });
    return;
  }
  if (!SQLres.length) {
    SQL = `INSERT INTO collects(from_id,to_id,owner_id)
    VALUES(${req.userID},${req.body.to_id},${req.body.commodity_id})`;
  } else {
    SQL = `DELETE FROM collects WHERE owner_id = ${req.body.commodity_id} AND from_id = ${req.userID}`;
  }
  JSON.parse(JSON.stringify(await mysqlDB(SQL)));

  res.send({ status: 1, message: "成功", data: !SQLres.length });
});

router.get("/getcollects", getuserID, async (req, res) => {
  let SQL = `SELECT * FROM collects WHERE owner_id = ${req.query.owner_id} AND from_id = ${req.userID}`;
  let SQLres = JSON.parse(JSON.stringify(await mysqlDB(SQL)));

  res.send({ status: 1, message: "成功", data: SQLres.length });
});

router.get("/getattention", getuserID, async (req, res) => {
  let SQL = `SELECT * FROM attentions WHERE from_id = ${req.userID}  AND to_id = ${req.query.from_id} `;
  let SQLres = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  res.send({ status: 1, message: "成功", data: SQLres.length });
});

router.post("/isattentios", getuserID, async (req, res) => {
  let SQL = `SELECT * FROM attentions WHERE to_id = ${req.body.attentios_id} AND from_id = ${req.userID}`;
  let SQLres = JSON.parse(JSON.stringify(await mysqlDB(SQL)));

  if (req.userID == req.body.attentios_id) {
    res.send({ status: 3, message: "错误", data: false });
    return;
  }

  if (!SQLres.length) {
    SQL = `INSERT INTO attentions(from_id,to_id,create_time)
    VALUES(${req.userID},${req.body.attentios_id},${new Date().getTime()})`;
  } else {
    SQL = `DELETE FROM attentions WHERE to_id = ${req.body.attentios_id} AND from_id = ${req.userID}`;
  }
  JSON.parse(JSON.stringify(await mysqlDB(SQL)));

  res.send({ status: 1, message: "成功", data: !SQLres.length });
});

router.get("/", async (req, res) => {
  console.log(req.cookies);
  res.send("test");
});

module.exports = router;
