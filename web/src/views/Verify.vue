<template>
  <div id="verify">
    <div class="topBar">
      <span>
        <img class="back" src="../static/back.svg" alt />
      </span>
      <span class="help">帮助</span>
    </div>
    <div class="content">
      <div class="title">
        <span>请输入验证码</span>
      </div>
      <form class="form">
        <input class="email" v-model="captcha" placeholder="请输入验证码" />
        <span class="caveat" v-if="this.message">{{message}}</span>
        <div class="arrange">
          <cube-button type="button" class="submit" @click="login">确定</cube-button>
          <cube-button type="button" class="submit">重新获取验证码</cube-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Verify",
  props: { email: "" },
  data() {
    return { captcha: "", message: "" };
  },
  methods: {
    async login() {
      console.log(this.email);
      const res = await this.$http.post("/register", {
        captcha: this.captcha,
        email: this.email
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#verify {
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
      input,
      button {
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
        margin: 10px 0 0;
        font-size: 12px;
        color: red;
      }
      .arrange {
        display: flex;
        .submit {
          padding: 0;
          margin-top: 10px;
          border-radius: 10px;
          background-color: #ff4544;
          color: #f5f6fa;
        }
        .submit:first-child {
          margin-right: 10px;
        }
        .submit:last-child {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
