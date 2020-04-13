<template>
  <div id="my">
    <div class="backTop"></div>
    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll" :options="options" @pulling-down="onPullingDown">
        <div class="box">
          <div class="headerBgc"></div>
          <div class="header">
            <img class="portrait" src="../static/header.svg" alt="头像" />
            <div class="aboutPortrait">
              <div class="member">setsege47</div>
              <div class="nickname">昵称</div>
              <div class="homepage">个人主页</div>
            </div>
          </div>
          <div class="content">
            <div class="Socializing">
              <div></div>
              <div>0 超赞</div>
              <div>|</div>
              <div>0 关注</div>
              <div>|</div>
              <div>0 粉丝</div>
              <div></div>
            </div>
            <div class="banner">
              <header class="headerTxt">卖在校园</header>
              <div class="bannerCont">
                <div class="option">
                  <img src="../static/release.svg" alt />
                  <span>我发布的 0</span>
                </div>
                <div></div>
                <div class="option">
                  <img src="../static/sell.svg" alt />
                  <span>我卖出的 0</span>
                </div>
                <div></div>
                <div class="option"></div>
              </div>
            </div>
            <div class="banner">
              <header class="headerTxt">买在校园</header>
              <div class="bannerCont">
                <div class="option">
                  <img src="../static/buy.svg" alt />
                  <span>我买到的 0</span>
                </div>
                <div></div>
                <div class="option">
                  <img src="../static/collect.svg" alt />
                  <span>我收藏的 0</span>
                </div>
                <div></div>
                <div class="option">
                  <img src="../static/label.svg" alt />
                  <span>我租到的 0</span>
                </div>
              </div>
            </div>
            <div class="banner">
              <header class="headerTxt">玩在校园</header>
              <div class="bannerCont">
                <div class="option">
                  <img src="../static/post.svg" alt />
                  <span>我的帖子</span>
                </div>
                <div></div>
                <div class="option">
                  <img src="../static/circle.svg" alt />
                  <span>我的圈子</span>
                </div>
                <div></div>
                <div class="option">
                  <img src="../static/footprint.svg" alt />
                  <span>我的足迹</span>
                </div>
                <div></div>
                <div class="option">
                  <img src="../static/coupon.svg" alt />
                  <span>我的福利</span>
                </div>
                <div></div>
                <div class="option">
                  <img src="../static/regulation.svg" alt />
                  <span>平台规则</span>
                </div>
                <div></div>
                <div class="option">
                  <img src="../static/customerSer.svg" alt />
                  <span>客服中心</span>
                </div>
                <div></div>
                <div class="option">
                  <img src="../static/donate.svg" alt />
                  <span>爱心捐赠</span>
                </div>
                <div></div>
                <div class="option">
                  <img src="../static/feedback.svg" alt />
                  <span>意见反馈</span>
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
        pullDownRefresh: {},
        // pullUpLoad: this.pullUpLoadObj,
        scrollbar: false
      }
    };
  },
  components: {},
  methods: {
    onPullingDown() {
      // 模拟更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          this.$refs.scroll.forceUpdate();
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate();
        }
      }, 1000);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#my {
  height: 100%;
  background-color: #ecf0f1;
  background-size: 50px 50px;
  .backTop {
    width: 100%;
    height: 300px;
    position: absolute;
    background-color: #ff4544;
  }
  .scroll-list-wrap {
    height: 100%;
    z-index: -99;
    .box {
      background-color: #ecf0f1;
      overflow: hidden;
      .headerBgc {
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 200px;
        border-radius: 0 0 60px 60px /0 0 20px 20px;
        background-color: #ff4544;
      }
      .header {
        margin: 15px 10px 0;
        display: flex;
        position: relative;
        z-index: 99;
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
      .content {
        margin: 15px 10px;
        position: relative;
        z-index: 99;
        .Socializing {
          padding: 15px;
          font-size: 15px;
          color: black;
          border-radius: 15px;
          background-color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .banner {
          border-radius: 15px;
          font-size: 13px;
          color: #84817a;
          padding: 15px;
          margin-top: 15px;
          background-color: white;
          display: flex;
          flex-direction: column;

          .headerTxt {
            color: black;
            font-size: 14px;
            font-weight: 600;
          }
          .bannerCont {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .option {
              margin-top: 15px;
              min-width: 70px;
              display: flex;
              flex-direction: column;
              align-items: center;
              img {
                height: 30px;
              }
              span {
                margin-top: 5px;
              }
            }
          }
          .bannerCont::before {
            content: "";
          }
          .bannerCont::after {
            content: "";
          }
        }
      }
    }
  }
}
</style>


