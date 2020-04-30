const mysqlDB = require("./mysqlDB");

let CACHE = { EMAIL_CODE: "", TOKEN_KEY: "", captchaPool: {}, timeoutPool: {} };
CACHE.getCode = async function () {
  CACHE.EMAIL_CODE = await mysqlDB(`SELECT authCode FROM encrypted`);
  CACHE.EMAIL_CODE = CACHE.EMAIL_CODE[0].authCode;

  CACHE.TOKEN_KEY = await mysqlDB(`SELECT tokenKey FROM encrypted`);
  CACHE.TOKEN_KEY = CACHE.TOKEN_KEY[0].tokenKey;
};
module.exports = CACHE;
