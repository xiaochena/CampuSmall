<template>
  <div id="search">
    <div class="topBar">
      <span @click="$router.push('/home/main')">
        <img class="back" src="../static/back.svg" alt />
      </span>
      <span class="myProfile">搜索</span>
    </div>
    <cube-input
      class="searchInput"
      v-model="value"
      placeholder="搜索关键字"
      v-on:keyup.enter.native="submit"
    >
      <div class="prepend" slot="prepend">
        <img src="../static/搜索.svg" alt />
      </div>
    </cube-input>
    <div class="box" style="height:1000px"></div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return { value: "" };
  },
  methods: {
    submit() {
      this.$router.push(`/search_list/${this.value}`);
    }
  }
};
</script>

<style lang="scss" scoped>
#search {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: white;
  overflow: scroll;
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
  .searchInput::after {
    border: none;
  }
  .searchInput {
    height: 35px;
    background-color: #f2f2f2;
    border-radius: 20px;
    overflow: hidden;
    margin: 10px;
    .prepend {
      height: 35px;
      margin-left: 15px;
      display: flex;
      align-items: center;
      img {
        height: 60%;
      }
    }
  }
}
</style>