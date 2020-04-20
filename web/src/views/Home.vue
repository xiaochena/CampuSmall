<template>
  <div id="home">
    <div class="backTop"></div>
    <div class="bannerTop fixed" v-show="topShow">
      <div class="bannerBgc"></div>
      <div class="banner">
        <a href>
          <img src="../static/scan.svg" alt />
        </a>
        <div class="title">
          <span>关注</span>
          <span>首页</span>
          <span>附近</span>
        </div>
        <a href>
          <img src="../static/signin.svg" alt />
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
                <img src="../static/scan.svg" alt />
              </a>
              <div class="title">
                <span>关注</span>
                <span>首页</span>
                <span>附近</span>
              </div>
              <a>
                <img src="../static/signin.svg" alt />
              </a>
            </div>
            <div class="search">
              <!-- <input type="text" /> -->
            </div>
          </div>
          <div class="reward">
            <div class="title">校园悬赏</div>
            <div class="rewardContent">
              <div class="item">
                <div class="about">
                  <div class="user">
                    <span class="name">小陈啊</span>
                    <span class="price">￥99</span>
                  </div>
                  <div class="message">这里是求助信息呀呀呀呀呀呀呀呀呀呀呀钱钱钱钱钱钱</div>
                </div>
                <img src="../../public/1.jpg" alt />
              </div>
              <div class="item">
                <div class="about">
                  <div class="user">
                    <span class="name">小陈啊</span>
                    <span class="price">￥99</span>
                  </div>
                  <div class="message">这里是求助信息</div>
                </div>
                <img src="../../public/1.jpg" alt />
              </div>
            </div>
          </div>
          <div class="information">
            <div class="merchandise">
              <div class="images">
                <img src="../../public/3.jpg" alt="没有图片" />
              </div>
              <div class="introduction">
                <p>校园二手物品简介啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦</p>
                <div class="priceUsername">
                  <span class="price">￥99</span>
                  <span class="username">小陈</span>
                </div>
              </div>
            </div>
            <div class="merchandise">
              <div class="images">
                <img src="../../public/2.jpg" alt />
              </div>
              <div class="introduction">
                <p>校园二手物品简介</p>
                <div class="priceUsername">
                  <span class="price">￥99</span>
                  <span class="username">小陈</span>
                </div>
              </div>
            </div>
            <div class="merchandise">
              <div class="images">
                <img src="../../public/3.jpg" alt />
              </div>
              <div class="introduction">
                <p>校园二手物品简介</p>
                <div class="priceUsername">
                  <span class="price">￥99</span>
                  <span class="username">小陈</span>
                </div>
              </div>
            </div>
            <div class="merchandise">
              <div class="images">
                <img src="../../public/3.jpg" alt />
              </div>
              <div class="introduction">
                <p>校园二手物品简介</p>
                <div class="priceUsername">
                  <span class="price">￥99</span>
                  <span class="username">小陈</span>
                </div>
              </div>
            </div>
            <div class="merchandise">
              <div class="images">
                <img src="../../public/3.jpg" alt />
              </div>
              <div class="introduction">
                <p>校园二手物品简介</p>
                <div class="priceUsername">
                  <span class="price">￥99</span>
                  <span class="username">小陈</span>
                </div>
              </div>
            </div>
            <div class="merchandise">
              <div class="images">
                <img src="../../public/3.jpg" alt />
              </div>
              <div class="introduction">
                <p>校园二手物品简介</p>
                <div class="priceUsername">
                  <span class="price">￥99</span>
                  <span class="username">小陈</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
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
        span {
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
    height: 100vh;
    .box {
      // min-height: 600px;
      padding-bottom: 50px;
      background-color: #ecf0f1;
      display: flex;
      flex-direction: column;
      .reward {
        border-radius: 10px;
        margin: 10px 10px 0;
        padding: 10px 10px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: white;
        .title {
          margin-bottom: 10px;
          color: red;
        }
        .rewardContent {
          display: flex;
          justify-content: space-between;
          .item {
            display: flex;
            width: 160px;
            justify-content: space-between;

            .about {
              display: flex;
              flex-direction: column;
              .user {
                display: flex;
                justify-content: space-between;
                margin: 5px 0;
              }
              .message {
                width: 100px;
                height: 30px;
                line-height: 17px;
                overflow: hidden;
              }
            }

            img {
              width: 50px;
              height: 50px;
            }
          }
        }
      }
      .information {
        display: flex;
        flex-wrap: wrap;
        padding: 10px 10px 0;
        justify-content: space-between;
        img {
          width: 100%;
          display: block;
        }
        .merchandise {
          overflow: hidden;
          border-radius: 10px;
          width: 170px;
          background-color: #fff;
          margin-bottom: 10px;
          font-size: 16px;
          .images {
            width: 100%;
            height: 170px;
            overflow: hidden;
          }
          .introduction {
            padding: 5px 10px 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            p {
              overflow: hidden;
              line-height: 20px;
              height: 40px;
            }
            .priceUsername {
              margin-top: 5px;
              display: flex;
              justify-content: space-between;
              .price {
                color: red;
              }
            }
          }
        }
      }
    }
  }
}
</style>
