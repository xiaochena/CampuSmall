<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="header_img" label="头像" width="150"></el-table-column>
      <el-table-column fixed prop="email" label="账户" width="150"></el-table-column>
      <el-table-column prop="name" label="昵称" width="120"></el-table-column>
      <el-table-column prop="gender" label="性别" width="120"></el-table-column>
      <el-table-column prop="birthday" label="生日" width="120"></el-table-column>
      <el-table-column prop="certification" label="认证状态" width="120"></el-table-column>
      <el-table-column prop="school" label="学校" width="300"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "persinfo",
  data() {
    return {
      tableData: []
    };
  },
  created: async function() {
    let res = await this.$http.get("/persinfo");
    res = res.data;
    switch (res.status) {
      case 1:
        this.tableData = res.data;
        break;
      case 0:
        this.$router.push(`/login`);
        break;
      default:
        break;
    }
  },
  methods: {
    handleClick(row) {
      console.log(row);
    }
  }
};
</script>
<style>
</style>