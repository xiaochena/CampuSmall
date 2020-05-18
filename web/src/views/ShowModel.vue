<template>
  <div>
    <a id="showModel" href="#/certification">
      <img src="../assets/model.png" alt />
      <img src="../assets/studentModel.png" alt />
    </a>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
#showModel {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: #000000;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    margin: 10px;
    width: 300px;
  }
}
</style>