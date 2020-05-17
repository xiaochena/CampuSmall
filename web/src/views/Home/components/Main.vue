<template>
  <div id="main">
    <div class="reward">
      <!-- <div class="title">校园悬赏</div> -->
      <div class="rewardContent">
        <cube-slide ref="slide">
          <cube-slide-item>
            <img src="../../../../public/AD1.jpg" />
          </cube-slide-item>
          <cube-slide-item>
            <img src="../../../../public/AD2.jpg" />
          </cube-slide-item>
        </cube-slide>
        <!-- <div class="item">
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
        </div>-->
      </div>
    </div>
    <div class="information">
      <div
        class="merchandise"
        v-for="item in data"
        :key="item.commodity_id"
        @click="$router.push(`/display/${item.commodity_id}`)"
      >
        <div class="images">
          <img :src="item.commodity_img1_url" alt="没有图片" />
        </div>
        <div class="introduction">
          <p class="content" v-html="item.textarea"></p>
          <div class="priceUsername">
            <span class="price">￥ {{item.price}}</span>
            <span class="username">{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return { data: {} };
  },
  created: async function() {
    let res = await this.$http.get("/getgoods");
    this.data = res.data.data;
    console.log(res);
  }
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
      width: 100%;
      img {
        width: 100%;
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
      object-fit: cover;
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
        width: 169px;
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
          .username {
            width: 80px;
            text-align: right;
            overflow: hidden;
          }
          .price {
            color: red;
          }
        }
      }
    }
  }
}
</style>