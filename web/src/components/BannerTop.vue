<template>
  <div id="bannerTop">
    <slot name="left" class="left">
      <div></div>
    </slot>
    <slot name="center" class="center">
      <div></div>
    </slot>
    <slot name="right" class="right">
      <div></div>
    </slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#bannerTop {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
}
</style>