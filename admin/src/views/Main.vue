<template>
  <div class="main">
    <el-container style="height: 100vh;">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router default-active="certification" class="el-menu-vertical-demo">
          <el-menu-item index="certification">
            <i class="el-icon-user-solid"></i>
            <span slot="title">用户认证</span>
          </el-menu-item>
          <el-menu-item index="applyschool">
            <i class="el-icon-s-check"></i>
            <span slot="title">学校申请</span>
          </el-menu-item>
          <el-menu-item index="goods">
            <i class="el-icon-s-check"></i>
            <span slot="title">商品审核申请</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Main",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss" scoped>
#main {
  display: flex;
}
</style>