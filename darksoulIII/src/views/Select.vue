<template>
  <div>
    <div class="fie shadow">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        :border="true"
        @row-click="selectRow"
      >
        <el-table-column prop="Name" label="服务器名" width="180">
        </el-table-column>
        <el-table-column prop="PlayerCount" label="在线人数" width="180">
        </el-table-column>
        <el-table-column prop="Description" label="服务器描述">
        </el-table-column>
        <el-table-column prop="Hostname" label="来源"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import request from "../utils/request";
export default {
  name: "Select",
  components: {},
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getServers();
  },
  methods: {
    getServers() {
      request.get("http://dev.ymchangge.cn/sid/api/v1/servers").then((res) => {
        console.log(res);
        this.tableData = res.data;
      });
    },
    selectRow(row, column, event) {
      console.log(row, column, event);
      localStorage.setItem('servers', JSON.stringify(row))
      this.$router.push({ name: "Startthe", query: { index: row } });
    },
  },
};
</script>

<style scoped>
.fie {
  margin-top: 20px;
  margin-left: 10%;
  height: 500px;
  width: 80%;
  border: 1.5px solid #dcdfe6;
  border-radius: 4px;
}

.shadow {
  --tw-shadow: 0 20px 25px -5px rgb(0 0 0/0.1), 0 8px 10px -6px rgb(0 0 0/0.1);
  --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color),
    0 8px 10px -6px var(--tw-shadow-color);
  -webkit-box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
</style>
