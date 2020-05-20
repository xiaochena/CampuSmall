<template>
  <div id="certification">
    <div class="topBar">
      <span @click="$router.push('/setting')">
        <img class="back" src="../static/back.svg" alt />
      </span>
      <span class="myProfile">学生认证</span>
    </div>
    <div class="banner">
      <p>身份认证的好处：</p>
      <p>1. 发布商品后，获得更快的审核速度</p>
      <p>2. 在商品列表和详情页显示明显认证标识，让他人对您的商品更放心</p>
      <p>3. 获得推荐机会等更多好处</p>
    </div>
    <form class="form">
      <span>姓名</span>
      <input class="input" type="text" v-model="name" placeholder="填写姓名" />
      <span>身份证号码</span>
      <input class="input" type="text" v-model="idCard" placeholder="请输入身份证" />
      <span class="hint">
        手持身份证，学生证正面信息页，保证字体清晰
        <a href="#/showmodel" style="color: #09f;">示范</a>
      </span>
      <cube-upload ref="certification" :action="action" :max="2" :auto="false" v-model="files" />
      <input type="button" class="submit" value="确定" @click="certification" />
    </form>
  </div>
</template>

<script>
export default {
  name: "Certification",
  data() {
    return {
      idCard: "",
      name: "",
      files: [],
      action: {
        target: this.$http.defaults.baseURL + "/certification",
        withCredentials: true
      }
    };
  },
  created: async function() {
    let res = await this.$http.get("/profile");
    res = res.data;
    if (
      res.data.certification == "认证中" ||
      res.data.certification == "已认证"
    ) {
      const toast = this.$createToast({
        type: "warn",
        time: 1000,
        txt: "您已认证或正在认证中，请勿重复认证",
        mask: true,
        onTimeout: () => {
          this.$router.go(-1);
        }
      });
      toast.show();
    }
    console.log(res);
  },
  methods: {
    async certification() {
      if (this.name == "") {
        const toast = this.$createToast({
          type: "warn",
          time: 1000,
          txt: "请输入姓名",
          mask: true
        });
        toast.show();
        return;
      }
      if (this.idCard.length < 18) {
        const toast = this.$createToast({
          type: "warn",
          time: 1000,
          txt: "请上传正确的身份证",
          mask: true
        });
        toast.show();
        return;
      }
      if (this.files.length < 2) {
        const toast = this.$createToast({
          type: "warn",
          time: 1000,
          txt: "请上传身份证以及学生证",
          mask: true
        });
        toast.show();
        return;
      }
      var formData = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        formData.append("file", this.files[i].file);
      }
      formData.append("idCard", this.idCard);
      formData.append("name", this.name);
      let res = await this.$http.post("/certification", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      res = res.data;
      switch (res.status) {
        case 0:
          this.$router.push("/login");
          break;
        case 1:
          let toast = this.$createToast({
            time: 1000,
            txt: "上传成功",
            onTimeout: () => {
              this.$router.push("/setting");
            }
          });
          this.$router.push("/setting");
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
<style>
.cube-upload-file-def,
.cube-upload-btn-def {
  width: calc(100vw / 2.2);
  height: calc(100vw / 3.5);
  margin-left: 0;
}
</style>