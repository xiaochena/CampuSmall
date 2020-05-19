<template>
  <div id="myShare">
    <div class="banner">
      <div class="header" v-if="false">为你推荐的圈子</div>
      <ul class="content">
        <li class="list" v-for="item in data" :key="item.share_id">
          <div class="info">
            <div class="header">
              <img :src="item.header_img" alt />
            </div>
            <span class="userName">{{item.name}}</span>
          </div>
          <div class="title" v-html="item.textarea"></div>
          <div class="mediasWrap">
            <img :src="item.share_img1_url" alt />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyShare",
  data() {
    return {
      list: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      data: []
    };
  },
  created: async function() {
    let res = await this.$http.get("/getshares");
    this.data = res.data.data;
    console.log(this.data);
  }
};
</script>

<style lang="scss" scoped>
#myShare {
  z-index: 99;
  padding: 10px 10px 50px;
  .banner {
    border-radius: 15px;
    background-color: #fff;
    padding: 15px 10px;
    display: flex;
    flex-direction: column;
    .header {
      font-size: 18px;
      font-weight: 600;
    }
    .content {
      display: flex;
      flex-direction: column;
      .list {
        display: flex;
        flex-direction: column;
        border-bottom: 4px solid #b5b5b5;
        padding: 10px 0;
        .info {
          display: flex;
          align-items: center;
          .userName {
            font-size: 16px;
            margin-left: 10px;
          }
          .header {
            width: 40px;
            height: 40px;
            border-radius: 40px;
            overflow: hidden;
            img {
              width: 40px;
              height: 40px;
              display: block;
              border-radius: 5px;
            }
          }
        }
        .title {
          margin-top: 10px;
          font-size: 16px;
          letter-spacing: 2px;
          line-height: 18px;
        }
        .mediasWrap {
          margin-top: 10px;
          height: 220px;
          overflow: hidden;
          img {
            width: 100%;
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
}
</style>