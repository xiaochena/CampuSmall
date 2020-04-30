const express = require("express");
const jwt = require("jsonwebtoken");

const mysqlDB = require("../../DB/mysqlDB");
const CACHE = require("../../DB/cache");

CACHE.getCode();

const router = express.Router({
  mergeParams: true,
});

router.post("/register", async (req, res) => {
  // console.log("CACHE", CACHE.captchaPool[req.body.email].captcha);
  // console.log("req", req.body.captcha);

  // 第一步：查询缓存中的captchaPool验证码池是否还保留有请求中email的验证码
  if (!CACHE.captchaPool[req.body.email]) {
    return res.send({ status: "2", message: "验证码超时，跳转重新登陆" });
  }
  // 第二步：查询captchaPool验证码池中email对应的验证码是否和请求的验证码相同
  let verify = CACHE.captchaPool[req.body.email].captcha == req.body.captcha;
  if (!verify) {
    return res.send({ status: "0", message: "验证码错误" });
  }
  // 第三步：将用户信息插入数据库
  let SQLinsert = `INSERT INTO user(email,passworld)
  VALUES ("${req.body.useremail}","${req.body.passworld}")`;
  mysqlDB(SQLinsert);
  res.send({ status: "1", message: "验证码正确" });
});

router.post("/login", async (req, res) => {
  // 第一步：验证用户是否已经存在
  let SQLselect = `SELECT * FROM user where email="${req.body.useremail}"`;
  let user = await mysqlDB(SQLselect);

  // 第二步：2.1 如果用户不存在，既查询到的user为空数组
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
    console.log(captcha);

    //#endregion
    return res.send({ status: "2", message: "该邮箱未注册，跳转输入验证码" });
  }

  // 第二步：2.2 如果用户存在，判断密码是否相同
  let passworldValid = user[0].passworld == req.body.passworld; // 验证邮箱密码
  if (!passworldValid) {
    return res.status(422).send({
      status: "0",
      message: "密码错误",
    });
  }
  // 第三步：生成token，并存入cookie
  const token = jwt.sign(user[0].email, CACHE.TOKEN_KEY);
  // 存入cookie
  res.cookie("token", token, { maxAge: 900000, httpOnly: true });
  res.send({ status: "1", token: token });
});

router.get("/profile", async (req, res) => {
  const tokenData = jwt.verify(req.headers.authorization, CACHE.TOKEN_KEY);
  console.log("tokenData", tokenData);
  res.send("profile");
  // let user = `SELECT * FROM user where email="${req.body.useremail}"`;
});

module.exports = router;
