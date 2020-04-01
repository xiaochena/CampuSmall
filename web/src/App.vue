<template>
  <div id="app">
    <router-view></router-view>
    <BottomBar />
  </div>
</template>

<script>
import BottomBar from "./components/BottomBar";
export default {
  name: "App",
  components: { BottomBar }
};
</script>

//
<style scoped lang="scss">
// #app {
//   background-color: pink;
// }
</style>
<style>
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: black;
}
</style>
