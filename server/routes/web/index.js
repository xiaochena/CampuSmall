const express = require("express");
const jwt = require("jsonwebtoken");

const mysqlDB = require("../../DB/mysqlDB");
const CACHE = require("../../DB/cache");

CACHE.getCode();

const router = express.Router({
  mergeParams: true,
});
// 验证
router.post("/register", async (req, res) => {
  // console.log("CACHE", CACHE.captchaPool[req.body.email].captcha);
  // console.log("req", req.body.captcha);

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
  INSERT INTO users(email,passworld)
  VALUES ("${CACHE.captchaPool[req.body.email].useremail}","${
    CACHE.captchaPool[req.body.email].passworld
  }")`;
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
      // console.log("删除前", CACHE);
      delete CACHE.captchaPool[req.body.useremail];
      let tempTime = CACHE.timeoutPool[req.body.useremail];
      delete CACHE.timeoutPool[req.body.useremail];
      clearTimeout(tempTime);
      // console.log("删除后", CACHE);
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
    // console.log(captcha);

    //#endregion
    return res.send({ status: 2, message: "该邮箱未注册，跳转输入验证码" });
  }
  // #endregion
  // #region 第二步：2.2 如果用户存在，判断密码是否相同
  let passworldValid = user[0].passworld == req.body.passworld; // 验证邮箱密码

  if (!passworldValid) {
    return res.send({
      status: 0,
      message: "密码错误",
    });
  }
  // #endregion
  // #region 第三步：生成token，并存入cookie
  const token = jwt.sign(user[0].email, CACHE.TOKEN_KEY);
  res.cookie("token", token, { maxAge: 900000, httpOnly: true });
  // #endregion
  res.send({ status: 1, token: token });
});

router.get("/profile", async (req, res) => {
  // #region 第一步：查询cookie中是否存有用户token，如果没有就返回.
  if (!req.cookies.token) {
    return res.send({ status: 0, message: "用户未登录" });
  }
  //#endregion
  // #region 第二步：解码token获得用户email
  const useremial = jwt.verify(req.cookies.token, CACHE.TOKEN_KEY);
  // #region 通过解出的：email查询用户信息
  // 查询用户id，后面的所有查询都根据id查询
  let SQL = ` SELECT users.id,users.name
              FROM users
              WHERE users.email = "${useremial}"
  `;
  let userData = { id: "", name: "" };
  let userTemp = await mysqlDB(SQL);
  Object.assign(userData, userTemp[0]);
  // 查询用户关注的人
  SQL = ` SELECT attention.to_attentionid
          FROM attention
          WHERE attention.user_id = ${userData.id}
  `;
  userTemp = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  userData.to_attention = userTemp;
  // 查询关注用户的人，既粉丝
  SQL = ` SELECT fans.from_fans_id
          FROM fans
          WHERE fans.user_id = ${userData.id}
  `;
  userTemp = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  userData.fans = userTemp;
  // 查询给用户点赞的人
  SQL = ` SELECT up_me.from_up_id
          FROM up_me
          WHERE up_me.user_id = ${userData.id}
  `;
  userTemp = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  userData.up_me = userTemp;
  // 查询用户给别人的点赞
  SQL = ` SELECT up_others.to_up_id
          FROM up_others
          WHERE up_others.user_id = ${userData.id}
  `;
  userTemp = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  userData.up_others = userTemp;
  console.log(userData);
  // 查询用户发布的商品
  SQL = ` SELECT post.post_id
          FROM post
          WHERE post.user_id = ${userData.id}
  `;
  userTemp = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  userData.posts_id = userTemp;
  // 查询用户收藏的商品
  SQL = ` SELECT collect.collect_id
          FROM collect
          WHERE collect.user_id = ${userData.id}
  `;
  userTemp = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  userData.collect = userTemp;
  console.log(userData);
  // #endregion
  res.send({
    status: 1,
    message: "用户已登录",
    data: userData,
  });
  // let user = `SELECT * FROM user where email="${req.body.useremail}"`;
});

router.get("/", async (req, res) => {
  console.log(req.cookies);
  res.send("test");
});

module.exports = router;
