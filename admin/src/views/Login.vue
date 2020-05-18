<template>
  <div id="login">
    <div class="loginBox">
      <div class="title">网站后台管理</div>
      <div class="content">
        <el-input v-model="user" type="text" placeholder="请输入账户"></el-input>
        <el-input
          class="separate"
          type="passworld"
          show-password
          v-model="passworld"
          placeholder="请输入密码"
        ></el-input>
        <el-button class="separate" @click="login" type="success">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Login",
  data() {
    return { user: "", passworld: "" };
  },
  methods: {
    async login() {
      if (this.user == "" || this.passworld == "") {
        this.$message("请输入账户密码");
        return;
      }
      let res = await this.$http.post("/login", {
        user: this.user,
        passworld: this.passworld
      });
      res = res.data;
      console.log(res);
      switch (res.status) {
        case 1:
          this.$router.push(`/main`);
          break;
        case 0:
          this.$message("账户或密码错误");
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style scoped lang="scss">
#login {
  height: 100vh;
  width: 100%;
  background-color: #444444;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginBox {
    width: 400px;
    background-color: white;
    display: flex;
    flex-direction: column;
    padding: 0 20px 20px;
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80px;
      font-size: 30px;
      color: #5d5d5d;
    }
    .content {
      flex: 1;
      .separate {
        margin-top: 20px;
        width: 100%;
      }
    }
  }
}
</style>
