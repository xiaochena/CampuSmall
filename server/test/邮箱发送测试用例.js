//nodemailer.js
const nodemailer = require("nodemailer");

// 创建一个SMTP客户端对象
const transporter = nodemailer.createTransport({
  host: "smtp.126.com", //邮箱服务的主机，如smtp.qq.com
  port: 465, //对应的端口号
  auth: {
    user: "lingang_chen@126.com", //注册的邮箱账号
    pass: "<<授权码>>", //邮箱的授权码，不是注册时的密码
  },
});

//发送邮件
transporter.sendMail(
  {
    from: "二手校园<lingang_chen@126.com>", // 发送人邮箱
    to: "tthz-zwq@qq.com", // 接收人邮箱，多个使用数组或用逗号隔开
    subject: "测试用邮箱", // 主题
    html: "我来测试一下", // 邮件正文 可以为 HTML 或者 text
  },
  (err) => {
    if (err) {
      throw err;
    }
  }
);
