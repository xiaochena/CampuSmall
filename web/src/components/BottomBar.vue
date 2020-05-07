<template>
  <div id="BottomBar">
    <a href="#/home/main" @click="selectActive('home')">
      <img v-if="active == 'home'" src="../static/home-active.svg" alt />
      <img v-else src="../static/home.svg" alt />
      <span>首页</span>
    </a>
    <a href="#/share/myshare" @click="selectActive('share')">
      <img v-if="active == 'share'" src="../static/share-active.svg" alt />
      <img v-else src="../static/share.svg" alt />
      <span>分享</span>
    </a>
    <a href="#/post" @click="selectActive('buy')">
      <img src="../static/add.svg" alt />
      <span>卖闲置</span>
    </a>
    <a href="#/message" @click="selectActive('message')">
      <img v-if="active == 'message'" src="../static/message-active.svg" alt />
      <img v-else src="../static/message.svg" alt />
      <span>消息</span>
    </a>
    <a href="#/my" @click="selectActive('my')">
      <img v-if="active == 'my'" src="../static/my-active.svg" alt />
      <img v-else src="../static/my.svg" alt />
      <span>我的</span>
    </a>
  </div>
</template>

<script>
export default {
  name: "BottomBar",
  data() {
    return {
      active: "home"
    };
  },
  methods: {
    selectActive(activeStr) {
      this.active = activeStr;
    }
  }
};
</script>

<style scope lang="scss">
#BottomBar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 55px;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  line-height: 8px;
  border-top: 1px solid #888;
  background-color: #fff;
  a {
    flex: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  span {
    margin-top: 3px;
    transform: scale(0.75);
  }
  img {
    height: 25px;
  }
}
</style>
