<template>
  <div class="display">
    <div class="topBar">
      <span @click="$router.go(-1)">
        <img class="back" src="../static/back.svg" alt />
      </span>
    </div>
    {{id}}
  </div>
</template>

<script>
export default {
  name: "Display",
  props: { id: null },
  data() {
    return { data: {}, userdata: {} };
  },
  created: async function() {
    let res = await this.$http.get("/getarticle", {
      params: {
        id: this.id
      }
    });
    res = res.data;
    let userdata = await this.$http.get("/simple", {
      params: { id: res.data.from_id }
    });
    userdata = userdata.data;
    switch (res.status && userdata.status) {
      case 0:
        this.login = false;
        this.$router.push("/login");
        break;
      case 1:
        this.userdata = userdata.data;
        this.data = res.data;
        console.log(this.data);
      default:
        break;
    }
  }
};
</script>
<style lang="scss" scoped>
.display {
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: 100;
  background-color: white;
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
  }
}
</style>