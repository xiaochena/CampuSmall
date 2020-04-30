var express = require("express");
var cors = require("cors");
var cookieParser = require("cookie-parser");

var app = express();

// 使用 中间件;
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/web/api", require("./routes/web"));

app.listen(3000, function () {
  console.log("启动成功：http://localhost:3000");
});
