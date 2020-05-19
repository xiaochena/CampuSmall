<template>
  <div id="share">
    <div class="backTop"></div>
    <div class="bannerTop fixed" v-show="topShow">
      <!-- <div class="bannerBgc"></div> -->
      <div class="banner">
        <a class="between" href></a>
        <div class="title">
          <a class="option" href="#/share/myshare">消息</a>
        </div>
        <a class="between" href>
          <!-- <span class="release"></span> -->
        </a>
      </div>
      <!-- <div class="search"> -->
      <!-- <input type="text" /> -->
      <!-- </div> -->
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
            <!-- <div class="bannerBgc"></div> -->
            <div class="banner">
              <a class="between" href></a>
              <div class="title">
                <a class="option" href="#/share/myshare">消息</a>
              </div>
              <a class="between" href>
                <!-- <span class="release">发帖子</span> -->
              </a>
            </div>
            <!-- <div class="search"> -->
            <!-- <input type="text" /> -->
            <!-- </div> -->
          </div>

          <div class="bannerBgc"></div>
          <div class="content">
            <div class="tabControl">
              <div class="options">
                <img src="@/static/notice.svg" alt />
                <span>通知消息</span>
              </div>
              <div class="options">
                <img src="@/static/interaction.svg" alt />
                <span>互动消息</span>
              </div>
            </div>
            <div class="messageList">
              <a
                class="messageItem"
                v-for="item in data"
                :key="item.id"
                :href="'#/display/'+item.owner_id"
              >
                <img :src="item.header_img" alt />
                <div class="itemRight">
                  <div class="name">{{item.name}} 给您留言了</div>
                  <div class="newMessage">{{item.content}}</div>
                </div>
                <img :src="item.commodity_img1_url" alt />
              </a>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
export default {
  name: "Share",
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
  created: async function() {
    let res = await this.$http.get("/getmessage");
    this.data = res.data.data;
    console.log(this.data);
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
#share {
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
  .bannerBgc {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    height: 125px;
    width: 100%;
    border-radius: 0 0 100px 100px /0 0 20px 20px;
    background-color: #ff4544;
  }
  .bannerTop {
    z-index: 99;
    background-color: #ff4544;
    .banner {
      padding: 10px 10px 10px;
      position: relative;
      z-index: 99;
      font-size: 20px;
      display: flex;
      justify-content: space-between;
      .between {
        width: 70px;
      }
      img {
        height: 25px;
      }
      .title {
        display: flex;
        align-items: center;
        .option {
          color: black;
          margin: 0 5px;
        }
      }
      .release {
        font-size: 15px;
        text-align: center;
        padding: 6px 10px;
        border-radius: 25px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
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
    height: calc(100vh - 55px);
    .box {
      min-height: calc(100vh - 54px);
      // margin-bottom: 44px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
    }
    .content {
      z-index: 99;
      padding: 10px 10px 50px;
      .tabControl {
        padding: 10px 10px;
        display: flex;
        justify-content: space-around;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0px 5px 5px -3px #7f8c8d;
        .options {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 16px;
          img {
            width: 40px;
            height: 40px;
            margin-bottom: 10px;
          }
        }
      }
      .messageList {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        .messageItem {
          color: black;
          display: flex;
          font-size: 18px;
          padding: 10px;
          border-bottom: 1px solid #7f8c8d;
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
    }
  }
}
</style>
