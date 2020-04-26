<template>
  <div id="home">
    <div class="backTop"></div>
    <div class="bannerTop fixed" v-show="topShow">
      <div class="bannerBgc"></div>
      <div class="banner">
        <a href>
          <img src="@/static/certification.svg" alt />
        </a>
        <div class="title">
          <a class="option" href="#/home/attention">关注</a>
          <a class="option" href="#/home/main">首页</a>
          <a class="option" href="#/home/reward">悬赏</a>
        </div>
        <a href>
          <img src="@/static/signin.svg" alt />
        </a>
      </div>
      <div class="search">
        <!-- <input type="text" /> -->
      </div>
    </div>
    <div class="scroll-list-wrap">
      <cube-scroll
        ref="scroll"
        :options="options"
        :scroll-events="['scroll']"
        @scroll="onScrollHandle"
      >
        <div class="box">
          <div class="bannerTop">
            <div class="bannerBgc"></div>
            <div class="banner">
              <a>
                <img src="@/static/certification.svg" alt />
              </a>
              <div class="title">
                <a class="option" href="#/home/attention">关注</a>
                <a class="option" href="#/home/main">首页</a>
                <a class="option" href="#/home/reward">悬赏</a>
              </div>
              <a>
                <img src="@/static/signin.svg" alt />
              </a>
            </div>
            <div class="search">
              <!-- <input type="text" /> -->
            </div>
          </div>
          <router-view></router-view>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      publicPath: process.env.BASE_URL,
      options: {
        probeType: 3,
        preventDefaultException: { tagName: /^(BODY||DIV)$/ }
        // preventDefault: false
      },
      topShow: false,
      data: {},
      col: 2
    };
  },
  methods: {
    onScrollHandle(pos) {
      // console.log(pos.y);
      if (pos.y > 0) {
        this.topShow = false;
      } else {
        this.topShow = true;
        window.scrollTo(0, -10);
      }
    }
  },
  computed: {
    itemWidth() {
      return 138 * 0.5 * (document.documentElement.clientWidth / 375); //  #rem to layout, Calculate the value of width
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#home {
  // background-color: skyblue;
  height: 100%;
  .backTop {
    position: absolute;
    height: 50%;
    width: 100%;
    background-color: #ff4544;
  }
  .fixed {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  .bannerTop {
    padding: 10px 15px 0;
    .bannerBgc {
      position: absolute;
      z-index: 2;
      top: 0;
      left: 0;
      height: 75px;
      width: 100%;
      border-radius: 0 0 100px 100px /0 0 20px 20px;
      background-color: #ff4544;
    }
    .banner {
      position: relative;
      z-index: 99;
      font-size: 20px;
      display: flex;
      justify-content: space-between;
      .title {
        display: flex;
        align-items: center;
        .option {
          color: black;
          margin: 0 5px;
        }
      }
      img {
        height: 25px;
      }
    }
    .search {
      position: relative;
      z-index: 99;
      background-color: #fff;
      margin-top: 15px;
      // input {
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
      width: 100%;
      height: 30px;
      border: 0;
      outline: none;
      border-radius: 30px;
      // }
    }
  }
  .scroll-list-wrap {
    width: 100vw;
    // height: 100vh;
    height: calc(100vh - 55px);
    .box {
      margin-bottom: 40px;
      background-color: #ecf0f1;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
