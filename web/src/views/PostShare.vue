<template>
  <div id="post">
    <div class="topBar">
      <span class="back" @click="$router.go(-1)">
        <span>取消</span>
      </span>
      <span class="myProfile">发布</span>
      <span class="button" @click="postgoods">发布</span>
    </div>
    <div class="textarea">
      <quill-editor v-model="textarea" ref="myQuillEditor" :options="editorOption"></quill-editor>
      <!-- <cube-textarea v-model="textarea" placeholder="新旧程度，入手渠道，转手原因" width="500px" :maxlength="800"></cube-textarea> -->
      <cube-upload ref="postgoods" :action="action" :max="6" :auto="false" v-model="files" />
    </div>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
export default {
  name: "Post",
  data() {
    return {
      price: null,
      textarea: "", // 富文本编辑器默认内容,
      editorOption: {
        theme: "snow",
        modules: {
          toolbar: [["italic"], [{ font: [] }], [{ list: "ordered" }]]
        },
        placeholder: "分享你身边的新鲜事"
      },
      action: {
        target: this.$http.defaults.baseURL + "/postgoods",
        withCredentials: true
      },
      files: []
    };
  },
  methods: {
    async postgoods() {
      // console.log(this.files[0].file);
      // this.$refs.postgoods.start();
      if (this.files.length == 0) {
        const toast = this.$createToast({
          type: "warn",
          time: 1000,
          txt: "请至少选择一张图片",
          mask: true
        });
        toast.show();
        return;
      }
      if (!this.textarea) {
        const toast = this.$createToast({
          type: "warn",
          time: 1000,
          txt: "请编写文章",
          mask: true
        });
        toast.show();
        return;
      }
      var formData = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        formData.append("file", this.files[i].file);
      }
      formData.append("textarea", this.textarea);
      let res = await this.$http.post("/postShare", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      res = res.data;
      switch (res.status) {
        case 1:
          this.$router.push("/share/myshare");
        default:
          break;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#post {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: #fff;
  z-index: 100;
  padding: 10px;
  .topBar {
    background-color: #fff;
    display: flex;
    .back {
      font-size: 18px;
      color: #bababa;
      width: 50px;
    }
    .myProfile {
      font-weight: 600;
      font-size: 20px;
      margin: 0 auto;
    }
    .button {
      height: 25px;
      line-height: 25px;
      width: 50px;
      text-align: center;
      font-size: 14px;
      background-color: #ff4544;
      border-radius: 25px;
    }
  }
  .textarea {
    margin-top: 20px;
    .price {
      display: flex;
      padding: 10px;
      border-top: 1px #d5d5d5 solid;
      font-size: 18px;
      align-items: center;
      .number {
        flex: 1;
      }
    }
  }
}
</style>
<style lang="scss">
#post {
  .ql-container {
    border: none;
  }
  .ql-toolbar {
    border: none;
    border-bottom: 1px solid #ccc;
  }
  .ql-editor {
    padding: 10px;
    height: 200px;
  }
  .cube-upload-file-def,
  .cube-upload-btn-def {
    width: calc(100vw / 3.5);
    height: calc(100vw / 3.5);
    margin-left: 0;
  }
}
</style>
