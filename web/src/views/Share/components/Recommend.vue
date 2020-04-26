<template>
  <div id="recommend">
    <div class="banner">
      <div class="search">
        <!-- <input type="text" /> -->
      </div>
      <ul class="list">
        <li class="item">
          <img class="img" src="@/../public/1.jpg" alt />
          <div class="content">
            <div class="title">学生党，等价交换</div>
            <div class="number">1161人</div>
          </div>
        </li>
        <li class="item">
          <img class="img" src="@/../public/1.jpg" alt />
          <div class="content">
            <div class="title">学生党，等价交换</div>
            <div class="number">1161人</div>
          </div>
        </li>
        <li class="item">
          <img class="img" src="@/../public/1.jpg" alt />
          <div class="content">
            <div class="title">大学生！跳蚤街</div>
            <div class="number">1161人</div>
          </div>
        </li>
        <li class="item">
          <img class="img" src="@/../public/1.jpg" alt />
          <div class="content">
            <div class="title">玩家国度</div>
            <div class="number">1161人</div>
          </div>
        </li>
        <li class="item">
          <img class="img" src="@/../public/1.jpg" alt />
          <div class="content">
            <div class="title">刺客信条 · 信仰之跃</div>
            <div class="number">1161人</div>
          </div>
        </li>
        <li class="item">
          <img class="img" src="@/../public/1.jpg" alt />
          <div class="content">
            <div class="title">刺客信条 · 信仰之跃</div>
            <div class="number">1161人</div>
          </div>
        </li>
      </ul>
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
  name: "Recommend",
  data() {
    return {
      list: [5, 4, 3, 2, 1]
    };
  }
};
</script>

<style lang="scss" scoped>
#recommend {
  z-index: 99;
  padding: 10px 10px 50px;
  .banner {
    border-radius: 15px;
    background-color: #fff;
    padding: 15px 10px;
    display: flex;
    flex-direction: column;
    .search {
      background-color: #e6e6e6;
      width: 100%;
      height: 30px;
      border-radius: 30px;
    }
    .list {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      font-size: 16px;
      .item {
        display: flex;
        font-size: 12px;
        // border: 1px solid black;
        padding: 0 5px;
        margin: 5px 0;
        width: 50%;
        .img {
          width: 40px;
          height: 40px;
          background-color: pink;
        }
        .content {
          margin-left: 5px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .title {
            margin-bottom: 5px;
            width: 106px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: clip;
          }
        }
      }
    }
  }

  .information {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
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