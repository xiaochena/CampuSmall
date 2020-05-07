<template>
  <div id="post">
    <div class="topBar">
      <span class="back" @click="$router.go(-1)">
        <span>取消</span>
      </span>
      <span class="myProfile">发布</span>
      <span class="button">发布</span>
    </div>
    <div class="textarea">
      <cube-textarea v-model="value" placeholder="新旧程度，入手渠道，转手原因" width="500px" :maxlength="800"></cube-textarea>
      <cube-upload :action="action" :simultaneous-uploads="1" :max="6" :auto="false" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Post",
  data() {
    return {
      value: "",
      action: {
        target: this.$http.defaults.baseURL + "/postgoods",
        withCredentials: true
      }
    };
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
    .cube-textarea-wrapper {
      height: 200px;
      border: none;
    }
    .cube-textarea-wrapper::after {
      border: none;
    }
  }
}
</style>
<style lang="scss">
#post {
  .cube-upload-btn-def {
    background-color: #dbdbdb;
  }
}
</style>
