<template>
  <div id="Certification">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="actual_name" label="认证姓名" width="80"></el-table-column>
      <el-table-column prop="id" label="用户ID" width="80"></el-table-column>
      <el-table-column prop="header_img" label="用户头像" width="80">
        <template slot-scope="scope">
          <img :src="scope.row.header_img" alt style="width: 50px;height: 50px" />
        </template>
      </el-table-column>
      <el-table-column prop="birthday" label="用户生日" width="150"></el-table-column>
      <el-table-column prop="certification_img1" label="认证图片一" width="150">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.certification_img1"
            :preview-src-list="[scope.row.certification_img1]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="certification_img2" label="认证图片二" width="150">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.certification_img2"
            :preview-src-list="[scope.row.certification_img2]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <div>
            <el-button size="mini" type="danger" @click="passClick(scope.row)">通过</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button size="mini" type="danger" @click="failClick(scope.row)">不通过</el-button>
          </div>
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
    this.getCertification();
  },
  methods: {
    async getCertification() {
      let res = await this.$http.get("/certification");
      res = res.data;
      switch (res.status) {
        case 1:
          this.tableData = res.data;
          console.log(this.tableData);
          break;
        case 0:
          this.$router.push(`/login`);
          break;
        default:
          break;
      }
    },
    handleClick(row) {
      console.log(row);
    },
    async passClick(row) {
      let res = await this.$http.put("/isCertification", {
        id: row.id,
        whether: "已认证"
      });
      this.getCertification();
    },
    async failClick(row) {
      let res = await this.$http.put("/isCertification", {
        id: row.id,
        whether: "认证失败"
      });
      this.getCertification();
    }
  }
};
</script>
<style>
</style>