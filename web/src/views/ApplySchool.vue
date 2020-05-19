<template>
  <div id="applyschool">
    <div class="topBar">
      <span @click="$router.push('/my')">
        <img class="back" src="../static/back.svg" alt />
      </span>
      <span class="myProfile">开通学校</span>
    </div>
    <div class="banner">
      <p>提示：</p>
      <p>1. 您可以号召身边的同学一起申请，申请者越多通过的可能性越大</p>
      <p>2. 进行过身份认证的用户将增大通过的可能性</p>
      <p>3. 通过后我们将会联系您</p>
    </div>
    <form class="form">
      <span>学校全名</span>
      <input class="input" type="text" v-model="school" placeholder="填写学校名称" />
      <span>姓名</span>
      <input class="input" type="text" v-model="name" placeholder="填写姓名" />
      <span>手机号</span>
      <input class="input" type="text" v-model="phone" placeholder="填写手机号" />
      <input type="button" class="submit" value="确定" @click="appleSchool" />
    </form>
  </div>
</template>

<script>
export default {
  name: "ApplySchool",
  data() {
    return {
      school: "",
      name: "",
      phone: "",
      status: ""
    };
  },
  created: async function() {
    let res = await this.postSchool();
    console.log(res);
  },
  methods: {
    appleSchool() {
      if (this.school == "" || this.name == "" || this.phone == "") {
        const toast = this.$createToast({
          type: "warn",
          time: 1000,
          txt: "请输入学校，姓名，电话",
          mask: true
        });
        toast.show();
        return;
      }
      this.postSchool(this.school, this.name, this.phone);
    },
    async postSchool(school, name, phone) {
      let res = await this.$http.post("/appleSchool", {
        school: school,
        name: name,
        phone: phone
      });
      res = res.data;
      console.log(res);

      switch (res.status) {
        case 0:
          this.login = false;
          this.$router.push("/login");
          break;
        case 1:
          let correct = this.$createToast({
            type: "correct",
            time: 2000,
            txt: "申请成功，通过后将会邮件通知您",
            mask: true,
            $events: {
              timeout: () => {
                this.$router.push("/my");
              }
            }
          });
          correct.show();
          break;
        case 3:
          let toast = this.$createToast({
            type: "warn",
            time: 2000,
            txt: "您有一个申请正在进行中，请勿重复申请",
            mask: true,
            $events: {
              timeout: () => {
                this.$router.push("/my");
              }
            }
          });
          toast.show();
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#applyschool {
  width: 100vw;
  height: 100vh;
  background-color: white;
  position: absolute;
  z-index: 100;
  .topBar {
    background-color: #ff4544;
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
  .banner {
    border-radius: 10px;
    margin: 10px;
    font-size: 13px;
    padding: 10px;
    color: #666;
    background-color: #eeeeee;
    line-height: 18px;
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
    .input {
      margin: 10px 0px 10px;
    }
    .hint {
      font-size: 12px;
      color: #718093;
      margin-bottom: 10px;
    }
    .submit {
      margin-top: 10px;
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