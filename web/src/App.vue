<template>
  <div id="app">
    <router-view></router-view>
    <BottomBar active="home" />
  </div>
</template>

<script>
import BottomBar from "@/components/BottomBar";
export default {
  name: "App",
  components: { BottomBar }
};
</script>

//
<style scoped lang="scss">
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  
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
