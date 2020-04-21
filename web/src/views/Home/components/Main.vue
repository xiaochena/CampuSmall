<template>
  <div id="main">
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
          <img src="@/../public/1.jpg" alt />
        </div>
        <div class="item">
          <div class="about">
            <div class="user">
              <span class="name">小陈啊</span>
              <span class="price">￥99</span>
            </div>
            <div class="message">这里是求助信息</div>
          </div>
          <img src="@/../public/1.jpg" alt />
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
  name: "main"
};
</script>

<style lang="scss" scoped>
#main {
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
</style>