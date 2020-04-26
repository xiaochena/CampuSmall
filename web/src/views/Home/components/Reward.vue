<template>
  <div id="reward">
    <div class="carousel">
      <img src="@/assets/carousel.jpg" alt />
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
  name: "Reward"
};
</script>

<style lang="scss" scoped>
#reward {
  padding: 10px 10px 0;
  .carousel {
    img {
      height: 200px;
      width: 100%;
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