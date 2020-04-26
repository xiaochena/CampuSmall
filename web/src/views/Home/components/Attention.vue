<template>
  <div id="attention">
    <div class="attentionUser">
      <div class="title">关注的人</div>
      <div class="content">
        <div class="user">
          <img class="userAvatar" src="@/assets/header.jpeg" alt />
          <div class="userName">小陈啊啊啊啊啊啊</div>
        </div>
        <div class="user">
          <img class="userAvatar" src="@/assets/header.jpeg" alt />
          <div class="userName">小陈啊啊啊啊啊啊</div>
        </div>
        <div class="user">
          <img class="userAvatar" src="@/assets/header.jpeg" alt />
          <div class="userName">小陈啊啊啊啊啊啊</div>
        </div>
      </div>
    </div>
    <div class="information">
      <div class="merchandise">
        <div class="images">
          <img src="@/../public/3.jpg" alt="没有图片" />
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
          <img src="@/../public/2.jpg" alt />
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
          <img src="@/../public/3.jpg" alt />
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
          <img src="@/../public/3.jpg" alt />
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
          <img src="@/../public/3.jpg" alt />
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
          <img src="@/../public/3.jpg" alt />
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
</template>

<script>
export default {
  name: "Attention"
};
</script>

<style lang="scss" scoped>
#attention {
  padding: 10px 10px 0px;
  .attentionUser {
    padding: 15px 10px 10px;
    border-radius: 10px;
    font-size: 14px;
    background-color: white;
    .title {
      color: red;
    }
    .content {
      display: flex;
      overflow: hidden;
      .user {
        margin: 10px 10px 0 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .userAvatar {
          background-color: skyblue;
          width: 50px;
          height: 50px;
          border-radius: 25px;
        }
        .userName {
          width: 55px;
          overflow: hidden;
          text-overflow: clip;
          white-space: nowrap;
          font-weight: 600;
          text-align: center;
          margin-top: 10px;
        }
      }
    }
  }

  .information {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0 0;
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
</style>
