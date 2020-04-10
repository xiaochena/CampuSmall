<template>
  <div id="my">
    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll" :options="options">
        <div class="box">
          <div class="header">
            <img class="portrait" src="../static/header.svg" alt="头像" />
            <div class="aboutPortrait">
              <div class="member">setsege47</div>
              <div class="nickname">昵称</div>
              <div class="homepage">个人主页</div>
            </div>
          </div>
          <div class="banContent">
            <div class="bannerOne banner">
              <div></div>
              <div>0 超赞</div>
              <div>|</div>
              <div>0 关注</div>
              <div>|</div>
              <div>0 粉丝</div>
              <div></div>
            </div>
            <div class="bannerTwo banner">
              <header class="headerTxt">卖在校园</header>
              <div class="">
                <div class="option">
                  <img src="../static/release.svg" alt />
                  <span>我发布的</span>
                </div>
                <div class="option">
                  <img src="../static/sell.svg" alt />
                  <span>我收藏的</span>
                </div>
              </div>
            </div>
          </div>
          <div class="scroll-content"></div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
export default {
  name: "my",
  data() {
    return {
      options: {
        // pullDownRefresh: { stopTime: 200, txt: "aaa" },
        // pullUpLoad: this.pullUpLoadObj,
        scrollbar: false
      }
    };
  },
  components: {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#my {
  height: 100%;
  background-color: #ff4544;
  .scroll-list-wrap {
    height: 100%;
    z-index: -99;
    .box {
      background-color: #f7f1e3;
      overflow: hidden;
      .scroll-content {
        height: 1000px;
      }
      .header {
        margin: 10px 10px 0;
        display: flex;
        background-color: skyblue;
        .portrait {
          border-radius: 10px;
          width: 70px;
          height: 70px;
        }
        .aboutPortrait {
          margin-left: 10px;
          font-size: 16px;
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: space-around;
          .member {
            font-weight: 600;
          }
          .nickname {
            font-size: 13px;
          }
          .homepage {
            height: 20px;
            width: 70px;
            border-radius: 10px;
            font-size: 13px;
            line-height: 20px;
            text-align: center;
            background-color: white;
          }
        }
      }
      .banContent {
        margin: 0px 10px;
        .headerTxt {
          color: black;
          font-size: 14px;
          font-weight: 600;
        }
        .banner {
          border-radius: 15px;
          font-size: 13px;
          color: #84817a;
          padding: 15px;
          margin-top: 10px;
        }
        .bannerOne {
          font-size: 15px;
          color: black;
          background-color: pink;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .bannerTwo {
          display: flex;
          flex-direction: column;
          background-color: skyblue;
          .optionContent {
            display: flex;
            .option {
              display: flex;
              flex-direction: column;
              align-items: center;
              margin: 0 20px;
              img {
                height: 30px;
              }
            }
          }
        }
      }
    }
  }
}
</style>


