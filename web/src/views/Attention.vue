<template>
  <div id="attention">
    <div class="topBar">
      <span @click="$router.go(-1)">
        <img class="back" src="../static/back.svg" alt />
      </span>
      <span class="myProfile">关注我的用户</span>
    </div>
    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll">
        <div class="box">
          <div
            class="banner"
            v-for="item in attention_me"
            :key="item.id"
            :href="'#/display/'+item.owner_id"
          >
            <img :src="item.header_img" alt />
            <div class="itemRight">
              <div class="name">{{item.name}}</div>
              <div class="newMessage">{{item.gender}}</div>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
    <!-- <div class="banner" v-for="item in posts" :key="item.commodity_id">{{item.commodity_id}}</div> -->
  </div>
</template>

<script>
export default {
  name: "Attention",
  data() {
    return { attention_me: [] };
  },
  created: async function() {
    let res = await this.$http.get("/profile");
    res = res.data;
    console.log(res);

    switch (res.status) {
      case 0:
        this.$router.push("/login");
        break;
      case 1:
        this.login = true;
        this.attention_me = res.data.attention_me;
        this.$refs.scroll.refresh();
      // console.log(this.posts);
      default:
        break;
    }
  },
  methods: {
    click(id) {
      this.$router.push(`/display/${id}`);
    },
    async deleteArticle(commodity_id) {
      console.log(commodity_id);

      let res = await this.$http.delete("/deletearticle", {
        data: { commodity_id: commodity_id }
      });
      res = res.data;
      switch (res.status) {
        case 0:
          this.$router.push("/login");
          break;
        case 1:
          location.reload();
        default:
          break;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#attention {
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
    height: calc(100vh - 55px);
  }
  .banner {
    color: black;
    display: flex;
    font-size: 18px;
    margin: 10px 10px 0;
    padding: 10px 15px;
    border-radius: 10px;
    background-color: #fff;
    img {
      width: 45px;
      height: 45px;
      background-color: pink;
    }
    .itemRight {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 10px;
      flex: 1;
      .newMessage {
        margin-top: 2px;
        font-size: 12px;
        color: #8a8a8a;
      }
    }
  }
}
</style>