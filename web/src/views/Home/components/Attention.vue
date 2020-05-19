<template>
  <div id="attention" :class="attention_others.length?'':'none'">
    <div class="attentionUser" v-if="attention_others.length">
      <div class="title">关注的人</div>
      <div class="content">
        <div class="user" v-for="item in attention_others" :key="item.id">
          <img class="userAvatar" :src="item.header_img" alt />
          <div class="userName">{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="information">
      <div class="merchandise" v-for="item in goods" :key="item.commodity_id">
        <div class="images">
          <img :src="item.commodity_img1_url" alt="没有图片" />
        </div>
        <div class="introduction">
          <p v-html="item.textarea"></p>
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
  name: "Attention",
  data() {
    return { attention_others: {}, goods: {} };
  },
  created: async function() {
    let res = await this.$http.get("/profile");
    res = res.data;
    switch (res.status) {
      case 0:
        this.login = false;
        this.$router.push("/login");
        break;
      case 1:
        this.login = true;
        this.attention_others = res.data.attention_others;
        console.log(this.attention_others);
      default:
        break;
    }

    let goods = await this.$http.get("/getattengoods", {
      params: { attention: "all" }
    });
    this.goods = goods.data.data;
    console.log(this.goods);
  }
};
</script>

<style lang="scss" scoped>
.none {
  width: 100vw;
  height: 100vh;
  background-color: white;
}
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
