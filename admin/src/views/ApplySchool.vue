<template>
  <div id="applySchool">
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      >
      <el-table-column fixed prop="application" label="申请社交圈" width="180"></el-table-column>
      <el-table-column fixed prop="user_id" label="申请人ID" width="80"></el-table-column>
      <el-table-column prop="application_user" label="申请人姓名" width="110"></el-table-column>
      <el-table-column prop="name" label="申请人账户昵称" width="180"></el-table-column>
      <el-table-column prop="user_phone" label="申请人电话" width="150"></el-table-column>
      <el-table-column prop="certification" label="实名认证" width="150"></el-table-column>
      <el-table-column prop="count" label="申请人数"></el-table-column>
      <el-table-column label="操作">
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
  name: "ApplySchool",
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
      let res = await this.$http.get("/getApplySchool");
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
    async passClick(row) {
      console.log(row);
      let res = await this.$http.post("/isSchoolPass", {
        isPass: true,
        school: row.application
      });
      this.getApplySchool();
    },
    async failClick(row) {
      let res = await this.$http.post("/isSchoolPass", {
        isPass: false,
        school: row.application
      });
      this.getApplySchool();
    },

    async load(tree, treeNode, resolve) {
      console.log(tree.application);
      let res = await this.$http.get("/getSchoolDetails", {
        params: {
          schoolName: tree.application,
          firstUserID: tree.id
        }
      });
      res = res.data;
      let data = res.data;
      console.log(data);

      resolve(data);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>