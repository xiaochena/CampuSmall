<template>
  <div id="certification">
    <div class="topBar">
      <span @click="$router.go(-1)">
        <img class="back" src="../static/back.svg" alt />
      </span>
      <span class="myProfile">学生认证</span>
    </div>
    <form class="form" v-show="!api">
      <input class="email" type="text" v-model="account" placeholder="请输入习信网账号(手机号/身份证/邮箱)" />
      <input class="password" v-model="password" type="password" placeholder="请输入密码" />
      <span class="caveat">{{this.message}}</span>
      <div class="hint">
        这里输入的是习信网的账号和密码，而不是该用户的账号和密码
        <br />我们只会获取学生信息，不会记住学生的习信网账户密码
      </div>
      <input type="button" class="submit" value="登录" @click="login" />
      <div class="forget">
        <span>不放心?</span>
        <a @click="api = !api">使用其他方式</a>
      </div>
    </form>
    <form class="form" v-show="api">
      <input class="email" type="text" v-model="idCard" placeholder="请输入身份证" />
      <input type="button" class="submit" value="确定" @click="loginApi" />
      <div class="forget">
        <a @click="api = !api">使用其他方式</a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Certification",
  data() {
    return {
      account: "",
      password: "",
      message: "",
      idCard: "",
      api: true
    };
  },
  methods: {
    async login() {
      let res = await this.$http.post("/certification", {
        account: this.account,
        password: this.password
      });
      res = res.data;
      switch (res.status) {
        case 0:
          this.$router.push("/login");
          break;
        case 1:
          let toast = this.$createToast({
            time: 1000,
            txt: "登录成功，工作人员将会验证信息",
            onTimeout: () => {
              this.$router.push("/setting");
            }
          });
          console.log(res);
        default:
          break;
      }
    },
    async loginApi() {
      let res = await this.$http.post("/certificationapi", {
        idcard: this.idCard
      });
      res = res.data;
      switch (res.status) {
        case 0:
          this.$router.push("/login");
          break;
        case 1:
          let toast = this.$createToast({
            time: 1000,
            txt: "登录成功，工作人员将会验证信息",
            onTimeout: () => {
              this.$router.push("/setting");
            }
          });
          console.log(res);
        default:
          break;
      }
    }
  }
};
</script>

<style scoped lang="scss">
#certification {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: #e6e6e6;
  z-index: 100;
  .topBar {
    background-color: #fff;
    display: flex;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    .back {
      position: absolute;
      width: 50px;
    }
    .myProfile {
      margin: 0 auto;
    }
  }

  .form {
    padding: 0 10px;
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
      margin-top: 10px;
      font-size: 12px;
      color: #718093;
      a {
        color: skyblue;
      }
    }
  }
}
</style>