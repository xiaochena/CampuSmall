<template>
  <div id="myposted">
    <div class="topBar">
      <span @click="$router.go(-1)">
        <img class="back" src="../static/back.svg" alt />
      </span>
      <span class="myProfile">我的帖子</span>
    </div>
    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll">
        <div class="box">
          <div
            class="banner"
            v-for="item in posts"
            :key="item.commodity_id"
            @click="click(item.commodity_id)"
          >
            <img class="img" :src="item.commodity_img1_url" alt />
            <div class="about">
              <div class="title" v-html="item.textarea"></div>
              <div class="price">￥{{item.price}}</div>
              <div class="delete">删除</div>
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
  name: "MyPosted",
  data() {
    return { posts: {} };
  },
  created: async function() {
    let res = await this.$http.get("/profile");
    res = res.data;
    switch (res.status) {
      case 0:
        this.login = false;
        this.$router.push("/login");
        break;
      case 1:
        this.login = true;
        this.posts = res.data.posts;
        console.log(this.posts);
      default:
        break;
    }
  },
  methods: {
    click(id) {
      this.$router.push(`/display/${id}`);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#myposted {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: #e6e6e6;
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
  .scroll-list-wrap {
    height: 100vh;
  }
  .banner {
    margin: 10px 10px 0;
    padding: 10px 15px;
    border-radius: 10px;
    background-color: #fff;
    display: flex;
    .img {
      background-color: pink;
      object-fit: cover;
      width: 80px;
      height: 80px;
      border-radius: 10px;
    }
    :not(div) {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .about {
      width: 240px;
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 16px;
      .title {
        height: 16px;
        width: 100%;
        overflow: hidden;
      }
      .price {
        color: red;
      }
      .delete {
        width: 70px;
        padding: 5px 0;
        text-align: center;
        border-radius: 20px;
        color: #b5b5b5;
        border: 1px solid #b5b5b5;
      }
    }
  }
}
</style>