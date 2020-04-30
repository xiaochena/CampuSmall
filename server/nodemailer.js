//nodemailer.js
const nodemailer = require("nodemailer");

const CACHE = require("./DB/cache");

// 创建一个SMTP客户端对象
const transporter = nodemailer.createTransport({
  host: "smtp.126.com", //邮箱服务的主机，如smtp.qq.com
  port: 465, //对应的端口号
  auth: {
    user: "lingang_chen@126.com", //注册的邮箱账号
    pass: CACHE.EMAIL_CODE, //邮箱的授权码，不是注册时的密码
  },
});


/**
 *
 * @param {Object} mail - 发送相关参数
 */
module.exports = (mail) => {
  transporter.sendMail(mail, function (error, info) {
    if (error) {
      return console.log(error);
    }
    // console.log("mail sent:", info.response);
  });
};
