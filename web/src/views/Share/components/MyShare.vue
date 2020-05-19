<template>
  <div id="myShare">
    <div class="banner">
      <div class="header" v-if="false">为你推荐的圈子</div>
      <ul class="content">
        <li class="list" v-for="item in list" :key="item">
          <img src="@/../public/1.jpg" alt />
          <div class="rightSection">
            <div class="about">
              <div class="description">电脑DIY专区</div>
              <div class="number">1946 人在这里</div>
            </div>
            <div class="button">
              <span>关注</span>
            </div>
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
      list: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    };
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
        align-items: center;
        img {
          display: block;
          width: 50px;
          height: 50px;
          border-radius: 5px;
        }
        .rightSection {
          height: 70px;
          flex: 1;
          margin-left: 10px;
          font-size: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #515151;
          .about {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .description {
              font-size: 16px;
              font-weight: bold;
            }
            .number {
              margin: 5px 0 0;
              font-size: 14px;
              color: #707070;
            }
          }
          .button {
            font-size: 14px;
            font-weight: 600;
            text-align: center;
            border: 1px solid #707070;
            padding: 5px 10px;
            border-radius: 50px;
          }
        }
      }
    }
  }
}
</style>