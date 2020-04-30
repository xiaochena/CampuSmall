module.exports = (SQL) => {
  // mysql.js
  var mysql = require("mysql");

  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456", //数据库连接密码
    database: "campusmall", //查询的表名
  });

  connection.connect();

  return new Promise((resolve, reject) => {
    connection.query(SQL, (error, results) => {
      if (results) {
        resolve(results);
        connection.end();
      } else {
        reject(error);
        connection.end();
      }
    });
  });
};
