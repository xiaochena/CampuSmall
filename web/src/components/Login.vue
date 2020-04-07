<template>
  <div id="login">
    <div class="topBar">
      <span>
        <img class="back" src="../static/back.svg" alt />
      </span>
      <span class="help">帮助</span>
    </div>
    <div class="content">
      <div class="title">
        <span>邮箱密码登录</span>
      </div>
      <form class="input">
        <input class="email" type="email" placeholder="请输入邮箱" />
        <input class="password" type="password" placeholder="请输入密码" />
        <div class="hint">未注册的邮箱验证通过后将会自动注册</div>
        <input type="submit" class="submit" value="登录" />
        <div class="forget">
          <span>忘记了?</span>
          <a href>找回密码</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#login {
  width: 100%;
  height: 100vh;
  // position: absolute;
  z-index: 99;
  // background-color: skyblue;
  .topBar {
    // background-color: pink;
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    .back {
      width: 40px;
    }
    .help {
      margin-right: 20px;
    }
  }
  .content {
    padding: 10px 20px 0px;
    .title {
      font-size: 20px;
    }
    .input {
      input {
        width: 100%;
        height: 40px;
        background-color: #f5f6fa;
        border: none;
        padding-left: 10px;
      }
      .email {
        margin: 20px 0px 10px;
      }
      .hint {
        font-size: 12px;
        color: #718093;
      }
      .submit {
        margin-top: 20px;
        background-color: #718093;
        color: #f5f6fa;
      }
      .forget {
        margin-top: 5px;
        font-size: 12px;
        color: #718093;
        a {
          color: skyblue;
        }
      }
    }
  }
}
</style>
