// mysql.js
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456", //数据库连接密码
  database: "campusmall", //查询的表名
});

connection.connect();

connection.query("SELECT * FROM authorizationcode", function (error, results) {
  if (error) throw error;
  console.log("The solution is: ", results);
});

connection.end();
