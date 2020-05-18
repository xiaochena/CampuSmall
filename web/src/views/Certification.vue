<template>
  <div id="certification">
    <div class="topBar">
      <span @click="$router.go(-1)">
        <img class="back" src="../static/back.svg" alt />
      </span>
      <span class="myProfile">学生认证</span>
    </div>
    <form class="form">
      <input class="email" type="text" v-model="idCard" placeholder="请输入身份证" />
      <span class="hint">请上传本人清晰的身份证正反面照片及学生证相关信息</span>
      <cube-upload ref="certification" :action="action" :max="4" :auto="false" v-model="files" />
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
      files: [],
      action: {
        target: this.$http.defaults.baseURL + "/certification",
        withCredentials: true
      }
    };
  },
  methods: {
    async certification() {
      //#region
      // if (this.idCard.length < 18) {
      //   const toast = this.$createToast({
      //     type: "warn",
      //     time: 1000,
      //     txt: "请上传正确的身份证",
      //     mask: true
      //   });
      //   toast.show();
      //   return;
      // }
      // if (this.files.length < 2) {
      //   const toast = this.$createToast({
      //     type: "warn",
      //     time: 1000,
      //     txt: "请上传身份证正反面两张",
      //     mask: true
      //   });
      //   toast.show();
      //   return;
      // }
      // #endregion
      var formData = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        formData.append("file", this.files[i].file);
      }
      formData.append("idCard", this.idCard);
      let res = await this.$http.post("/certification", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      res = res.data;
      // switch (res.status) {
      //   case 0:
      //     this.$router.push("/login");
      //     break;
      //   case 1:
      //     let toast = this.$createToast({
      //       time: 1000,
      //       txt: "登录成功，工作人员将会验证信息",
      //       onTimeout: () => {
      //         this.$router.push("/setting");
      //       }
      //     });
      //     console.log(res);
      //   default:
      //     break;
      // }
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