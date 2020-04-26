<template>
  <div id="app">
    <div class="appContent">
      <router-view></router-view>
    </div>
    <BottomBar active="home" />
  </div>
</template>

<script>
import BottomBar from "@/components/BottomBar";
export default {
  name: "App",
  components: { BottomBar },
  created: function() {
    setTimeout(function() {
      window.scrollTo(0, 1);
    }, 0);
  }
};
</script>

//
<style scoped lang="scss">
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ecf0f1;
  .appContent {
    flex-grow: 1;
    overflow: hidden;
  }
}
</style>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: black;
}
</style>
