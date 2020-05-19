<template>
  <div id="searchlist">
    <div class="topBar">
      <span class="back" @click="$router.push('/home/main')">
        <img src="../static/back.svg" alt />
      </span>
      <span class="myProfile">
        <cube-input
          class="searchInput"
          v-model="value"
          placeholder="搜索关键字"
          v-on:keyup.enter.native="getGoods(searchKey)"
        ></cube-input>
      </span>
      <!-- <div class="sort">
        <span>时间</span>
        <span>价格</span>
        <span>点击量</span>
      </div>-->
    </div>
    <div class="scroll-list-wrap">
      <cube-scroll ref="scroll">
        <div class="box">
          <div class="information">
            <div
              class="merchandise"
              v-for="item in goods"
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
      </cube-scroll>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchList",
  props: { searchKey: "" },
  data() {
    return {
      value: "",
      goods: ""
    };
  },
  created: async function() {
    this.value = this.searchKey;
    await this.getGoods();
  },
  methods: {
    async getGoods(searchKey) {
      let res = await this.$http.get("/getSearchGoods", {
        params: {
          searchKey: this.searchKey
        }
      });
      this.goods = res.data.data;
    }
  }
};
</script>
<style lang="scss" scoped>
#searchlist {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: #ecf0f1;
  overflow: scroll;
  z-index: 100;
  .topBar {
    background-color: #fff;
    display: flex;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    position: sticky;
    z-index: 100;
    top: 0;
    .back {
      width: 40px;
      display: flex;
      align-items: center;
      img {
        width: 100%;
      }
    }
    .myProfile {
      flex: 1;
    }
    .searchInput::after {
      border: none;
    }
    .searchInput {
      height: 35px;
      background-color: #f2f2f2;
      border-radius: 20px;
      overflow: hidden;
      margin: 10px;
      padding-left: 10px;
      .prepend {
        height: 35px;
        margin-left: 15px;
        display: flex;
        align-items: center;
        img {
          height: 60%;
        }
      }
    }
  }
  .scroll-list-wrap {
    width: 100vw;
    // height: 100vh;
    height: calc(100vh - 50px);
    .box {
      min-height: calc(100vh + 1px);
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
  }
}
</style>