<template>
  <div id="login">
    <div class="topBar">
      <span @click="$router.go(-2)">
        <img class="back" src="../static/back.svg" alt />
      </span>
      <span class="help">帮助</span>
    </div>
    <div class="content">
      <div class="title">
        <span>邮箱登录</span>
      </div>
      <form class="form">
        <input class="email" type="text" v-model="useremail" placeholder="请输入邮箱" />
        <input class="password" v-model="password" type="password" placeholder="请输入密码" />
        <span class="caveat">{{this.message}}</span>
        <div class="hint">未注册的邮箱验证通过后将会自动注册</div>
        <input type="button" class="submit" value="登录" @click="login" />
        <div class="forget">
          <!-- <span>忘记了?</span>
          <a href>找回密码</a> -->
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return { useremail: "", password: "", message: "" };
  },
  methods: {
    async login() {
      if (!this.useremail || !this.password) {
        return (this.message = "账号或密码不能为空");
      } else {
        this.message = "";
      }
      let res = await this.$http.post("/login", {
        useremail: this.useremail,
        passworld: this.password
      });
      res = res.data;
      switch (res.status) {
        case 0:
          this.message = "密码错误";
          console.log("密码错误");

          break;
        case 1:
          this.$router.go(-1);
          break;

        default:
          break;
      }
      if (res.status == 2) {
        this.$router.push(`/verify/${this.useremail}`);
      }
      console.log(res);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#login {
  width: 100%;
  height: 100vh;
  position: absolute;
  background-color: #ffffff;
  z-index: 100;
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
    .form {
      display: flex;
      flex-direction: column;
      font-size: 16px;
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
      .caveat {
        margin: 10px 0;
        font-size: 12px;
        color: red;
      }
      .hint {
        font-size: 12px;
        color: #718093;
      }
      .submit {
        margin-top: 20px;
        background-color: #ff4544;
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
