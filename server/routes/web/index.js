const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const puppeteer = require("puppeteer");

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
  SQL = ` SELECT attention_others.to_attention_id
          FROM attention_others
          WHERE attention_others.user_id = ${userData.id}
  `;
  userTemp = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  userData.attention_others = userTemp;
  // 查询关注用户的人，既粉丝
  SQL = ` SELECT attention_me.from_attention_id
          FROM attention_me
          WHERE attention_me.user_id = ${userData.id}
  `;
  userTemp = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  userData.attention_me = userTemp;
  // 查询给用户点赞的人
  SQL = ` SELECT up_me.from_up_id
          FROM up_me
          WHERE up_me.user_id = ${userData.id}
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
  SQL = ` SELECT collect.collect_id
          FROM collect
          WHERE collect.user_id = ${userData.id}
  `;
  userTemp = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
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
router.post("/certification", getuserID, async (req, res) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://account.chsi.com.cn/passport/login?service=https://my.chsi.com.cn/archive/j_spring_cas_security_check"
  );
  await page.waitForSelector("#username");
  await page.type("#username", "15860837398", { delay: 100 });
  await page.waitForSelector("#password");
  await page.type("#password", "clg0824", { delay: 100 });
  await page.waitForSelector("#fm1 > .btn_login");
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle0" }),
    page.click("#fm1 > .btn_login"),
  ]);

  await page.waitForSelector(".login-btn");
  await page.click(".login-btn");

  await page.waitForSelector(".i-m-top:nth-child(1) > .i-m-r > a:nth-child(3)");
  await page.click(".i-m-top:nth-child(1) > .i-m-r > a:nth-child(3)");

  await page.waitForSelector(".xjxx-img");
  const imageSrc = await page.$eval(".xjxx-img", (el) => el.src);
  await browser.close();
  let SQL = ` UPDATE users 
              SET users.certification_url =  "${imageSrc}" , users.certification = "认证中"
              WHERE users.id = ${req.userID}`;
  JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  await res.send({ status: 1, test: "上传成功" });
});

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
  console.log(SQL);

  JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  res.send({ status: 1, message: "修改成功" });
});

const postgoods = multer({ dest: __dirname + "../../../DB/postgoods" });
router.post(
  "/postgoods",
  getuserID,
  postgoods.array("file", 6),
  async (req, res) => {
    // console.log(req.body.textarea);
    // console.log(req.files);
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
  console.log(req.query);
  let SQL = `SELECT * FROM commodity WHERE commodity_id = ${req.query.id}`;
  let sqlres = JSON.parse(JSON.stringify(await mysqlDB(SQL)));
  sqlres = sqlres[0];
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

router.get("/", async (req, res) => {
  console.log(req.cookies);
  res.send("test");
});

module.exports = router;
