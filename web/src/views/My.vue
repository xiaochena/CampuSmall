<template>
  <div id="my"></div>
</template>

<script>
export default {
  name: "my",
  data() {
    return {};
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#my {
  height: 100%;
  .swiper-container {
    width: 100%;
    height: 100%;
    .loadmore {
      position: absolute;
      line-height: 20px;
      top: 100%;
      text-align: center;
      width: 100%;
    }
    .refresh {
      position: absolute;
      line-height: 100px;
      bottom: 100%;
      text-align: center;
      width: 100%;
    }
  }
}
</style>


