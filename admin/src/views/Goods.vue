<template>
  <div id="goods">
    <el-table :data="tableData" style="width: 100%" border :height="600">
      >
      <el-table-column fixed prop="name" label="昵称"></el-table-column>
      <el-table-column prop="commodity_id" label="文章ID"></el-table-column>
      <el-table-column prop="textarea" width="240" label="商品配图">
        <template slot-scope="scope">
          <div v-html="scope.row.textarea"></div>
        </template>
      </el-table-column>
      <el-table-column prop="commodity_img1_url" width="120px" label="商品配图">
        <template slot-scope="scope">
          <div v-if="!scope.row.commodity_img1_url"></div>
          <el-image
            v-else
            style="width: 100px; height: 100px"
            :src="scope.row.commodity_img1_url"
            :preview-src-list="[scope.row.commodity_img1_url]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="commodity_img2_url" width="120px" label="商品配图">
        <template slot-scope="scope">
          <div v-if="!scope.row.commodity_img2_url"></div>
          <el-image
            v-else
            style="width: 100px; height: 100px"
            :src="scope.row.commodity_img2_url"
            :preview-src-list="[scope.row.commodity_img2_url]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="commodity_img3_url" width="120px" label="商品配图">
        <template slot-scope="scope">
          <div v-if="!scope.row.commodity_img3_url"></div>
          <el-image
            v-else
            style="width: 100px; height: 100px"
            :src="scope.row.commodity_img3_url"
            :preview-src-list="[scope.row.commodity_img3_url]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="commodity_img4_url" width="120px" label="商品配图">
        <template slot-scope="scope">
          <div v-if="!scope.row.commodity_img4_url"></div>
          <el-image
            v-else
            style="width: 100px; height: 100px"
            :src="scope.row.commodity_img4_url"
            :preview-src-list="[scope.row.commodity_img4_url]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="commodity_img5_url" width="120px" label="商品配图">
        <template slot-scope="scope">
          <div v-if="!scope.row.commodity_img5_url"></div>
          <el-image
            v-else
            style="width: 100px; height: 100px"
            :src="scope.row.commodity_img5_url"
            :preview-src-list="[scope.row.commodity_img5_url]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="commodity_img6_url" width="120px" label="商品配图">
        <template slot-scope="scope">
          <div v-if="!scope.row.commodity_img6_url"></div>
          <el-image
            v-else
            style="width: 100px; height: 100px"
            :src="scope.row.commodity_img6_url"
            :preview-src-list="[scope.row.commodity_img6_url]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="110px" fixed="right">
        <template slot-scope="scope">
          <div class="buttonBox">
            <el-button size="mini" type="danger" @click="failClick(scope.row)">封禁</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Goods",
  data() {
    return {
      tableData: []
    };
  },
  created: async function() {
    this.getApplySchool();
  },
  methods: {
    async getApplySchool() {
      let res = await this.$http.get("/getGoods");
      res = res.data;
      console.log(res);
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
    async failClick(row) {
      console.log(row);
      let res = await this.$http.post("/isFollow", {
        isFollow: 0,
        commodity_id: row.commodity_id
      });
      this.getApplySchool();
    }
  }
};
</script>
<style lang="scss" scoped>
#goods {
  .buttonBox {
    display: flex;
    flex-direction: column;
    button {
      margin: 10px;
    }
  }
}
</style>