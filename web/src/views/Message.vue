<template>
  <div id="message">
    <div class="scroll-list-wrap">
      <cube-scroll
        ref="scroll"
        :options="options"
        :scroll-events="['scroll']"
        @scroll="onScrollHandle"
      >
        <div class="box">
          <h1>11111</h1>
          <h1>22222</h1>
          <h1>33333</h1>
          <h1>44444</h1>
          <h1>11111</h1>
          <h1>22222</h1>
          <h1>33333</h1>
          <h1>44444</h1>
          <h1>11111</h1>
          <h1>22222</h1>
          <h1>33333</h1>
          <h1>44444</h1>
          <h1>11111</h1>
          <h1>22222</h1>
          <h1>33333</h1>
          <h1>44444</h1>
          <h1>11111</h1>
          <h1>22222</h1>
          <h1>33333</h1>
          <h1>44444</h1>
          <h1>11111</h1>
          <h1>22222</h1>
          <h1>33333</h1>
          <h1>44444</h1>
          <h1>11111</h1>
          <h1>22222</h1>
          <h1>33333</h1>
          <h1>44444</h1>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
export default {
  name: "message"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.scroll-list-wrap {
  height: 100vh;
}
</style>
