<template>
  <div id="applyschool">
    <div class="topBar">
      <span @click="$router.push('/setting')">
        <img class="back" src="../static/back.svg" alt />
      </span>
      <span class="myProfile">学生认证</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ApplySchool"
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
}
</style>