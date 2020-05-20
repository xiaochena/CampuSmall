<template>
  <div id="setting">
    <div class="scroll-list-wrap">
      <div class="topBar">
        <span @click="$router.push('/my')">
          <img class="back" src="../static/back.svg" alt />
        </span>
        <span class="myProfile">我的资料</span>
      </div>
      <cube-scroll ref="scroll" :options="options">
        <div class="box">
          <p class="title">基本信息</p>
          <div class="banner">
            <!-- <cube-upload :action="$http.defaults.baseURL+'/upload'" :simultaneous-uploads="1" /> -->
            <cube-upload
              :max="1"
              ref="upload"
              v-model="files"
              :action="action"
              @files-added="filesAdded"
              @file-success="fileSuccess"
              @file-error="fileError"
            >
              <cube-upload-btn :multiple="false">
                <div class="li">
                  <span>头像</span>
                  <img :src="data.header_img_url" />
                </div>
              </cube-upload-btn>
            </cube-upload>
            <div class="li">
              <span>账号</span>
              <span class="message">{{data.email}}</span>
            </div>
            <div class="li">
              <span>昵称</span>
              <span class="message" v-show="nameShow" @click="changeNameShow">{{data.name}}</span>
              <cube-input class="message" v-model="nameValue" v-show="!nameShow" :clearable="true">
                <button slot="append" class="button" @click="putProfile">确认</button>
              </cube-input>
            </div>
            <div class="li" @click="selectGender">
              <span>性别</span>
              <span class="message">{{data.gender}}</span>
            </div>
            <div class="li" @click="selectBirthday">
              <span>生日</span>
              <span class="message">{{data.birthday}}</span>
            </div>
            <div class="li" @click="selectSchool">
              <span>学校</span>
              <span class="message">{{data.school}}</span>
            </div>
          </div>
          <p class="title">认证信息</p>
          <div class="banner">
            <a class="li" href="#/certification">
              <span>实人认证</span>
              <span>{{data.certification || "未认证" }}</span>
            </a>
          </div>
          <p class="title">操作</p>
          <div class="banner">
            <a class="li">
              <span @click="quit">退出登录</span>
            </a>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
const gender = [
  { text: "男", value: 1 },
  { text: "女", value: 0 }
];
export default {
  name: "Setting",
  data() {
    return {
      nameValue: "",
      nameShow: true,
      school: {},
      data: {},
      files: [],
      options: {},
      action: {
        target: this.$http.defaults.baseURL + "/upload",
        withCredentials: true
      }
    };
  },
  created: async function name(params) {
    await this.getData();
  },
  methods: {
    async getData() {
      let res = await this.$http.get("/profile");
      res = res.data;
      let school = await this.$http.get("/getSchool");
      school = school.data;
      this.school = school.data;
      switch (res.status) {
        case 0:
          this.$router.push("/my");
          break;
        case 1:
          this.data = res.data;
          this.nameValue = this.data.name;
        default:
          break;
      }
    },
    filesAdded(files) {
      let toast = this.$createToast({
        txt: "Loading...",
        time: 0,
        mask: true
      });
      toast.show();
    },
    fileSuccess(files) {
      let toast = this.$createToast({
        txt: "上传成功",
        mask: true
      });
      location.reload();
    },
    fileError(files) {
      let toast = this.$createToast({
        txt: "上传失败",
        mask: true
      });
      toast.hide();
      this.files = [];
    },
    changeNameShow() {
      this.nameShow = !this.nameShow;
    },
    async putProfile() {
      this.nameShow = !this.nameShow;
      let toast = this.$createToast({
        txt: "Loading...",
        time: 0,
        mask: true
      });
      toast.show();
      let res = await this.$http.put("/putprofile", {
        name: this.nameValue,
        field: "name"
      });
      toast.hide();
      this.data.name = this.nameValue;
      res = res.data;
      console.log(res);
    },
    selectGender() {
      let picker = this.$createPicker({
        title: "性别",
        data: [gender],
        onSelect: this.putGender
      });
      picker.show();
    },
    putGender(selectedVal, selectedIndex, selectedText) {
      this.$http.put("/putprofile", {
        name: selectedText.join(" "),
        field: "gender"
      });
      this.data.gender = selectedText.join(" ");
    },
    selectBirthday() {
      let datePicker = this.$createDatePicker({
        title: "选择生日",
        min: new Date(1900, 7, 8),
        max: new Date(3000, 9, 20),
        value: new Date(),
        format: {
          year: "YYYY年",
          month: "MM月",
          date: "第 DD 日"
        },
        onSelect: this.putBirthday
      });
      datePicker.show();
    },
    async putBirthday(date, selectedVal, selectedIndex, selectedText) {
      let res = await this.$http.put("/putprofile", {
        name: selectedVal.join("-"),
        field: "birthday"
      });
      console.log(res);
      if (res.data.status == 3) {
        const toast = this.$createToast({
          type: "warn",
          time: 2000,
          txt: "认证中及已认证用户无法修改出生",
          mask: true
        });
        toast.show();
        return;
      }
      this.data.birthday = selectedVal.join("-");
    },
    selectSchool() {
      const toast = this.$createToast({
        time: 2000,
        txt: "注意！！！一年只能选择一次学校",
        type: "warn",
        mask: true
      });
      toast.show();
      for (let item of this.school) {
        item.text = item.community_name;
        item.value = item.community_name;
      }
      let school = this.$createPicker({
        title: "学校",
        data: [this.school],
        onSelect: this.putSchool
      });
      school.show();
    },
    async putSchool(date, selectedVal, selectedIndex, selectedText) {
      console.log(date.join("-"));
      let res = await this.$http.put("/putSchool", {
        school: date.join("-")
      });
      res = res.data;
      if (res.status == 3) {
        const toast = this.$createToast({
          time: 1000,
          txt: "修改失败，一年只能选择一次学校",
          type: "warn",
          mask: true
        });
        toast.show();
        return;
      }
      if (res.status == 4) {
        const toast = this.$createToast({
          time: 1000,
          txt: "未认证用户无法选择学校",
          type: "warn",
          mask: true
        });
        toast.show();
        return;
      }
      await this.getData();
    },
    async quit() {
      await this.$http.put("/quit");
      this.$router.push("/home/main");
    }
  }
};
</script>
<style lang="scss" scoped>
#setting {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: #e6e6e6;
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
  .scroll-list-wrap {
    height: 100vh;
  }
  .box {
    min-height: calc(100vh + 1px);
    padding: 0 10px;
    font-size: 16px;
    .title {
      color: #707070;
      margin: 30px 0 10px;
    }
    .banner {
      padding: 10px 15px 0;
      border-radius: 10px;
      background-color: #fff;
      .li {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: black;
        .message {
          color: #515151;
        }
        img {
          border-radius: 4px;
          height: 50px;
          width: 50px;
        }
        .button {
          background-color: salmon;
          border: none;
          height: 40px;
          width: 60px;
        }
      }
    }
  }
}
</style>
