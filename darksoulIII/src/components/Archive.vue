<template>
  <div
    @drop="enentDrop($event)"
    @dragleave="dragleave($event)"
    @dragover="dragover($event)"
  >
    <el-card shadow="hover" :body-style="{ padding: '20px' }">
      <div slot="header">
        <el-tag class="kong">{{ label }}</el-tag>
      </div>
      <!-- card body -->
      <div class="info">
        <!-- 上传 -->

        <div class="uid">
          <el-tag type="success" size="medium"> SteamID</el-tag>
          <el-input
            v-model="steamID"
            size="mini"
            clearable
            style="max-width: 200px"
          />
        </div>
      </div>
      <el-table :data="tableData" height="400" :border="true" :stripe="true">
        <el-table-column prop="name" label="角色名" width="180">
        </el-table-column>
        <el-table-column prop="level" label="等级" width="180">
        </el-table-column>
        <el-table-column prop="playTimeSeconds" label="游戏时长">
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >复制</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import request from "../utils/request";
export default {
  props: {
    tableData: {
      type: Array,
      default: [],
    },
    label: {
      type: String,
      default: "存档一",
    },
  },
  name: "Archive",
  components: {},
  data() {
    return {
      steamID: "",
      file: [],
      sl2filepath: "",
      fileData: [],
      data: {
        sl2filepath: "",
        index: 0,
      },
    };
  },
  mounted() {},
  methods: {
    handleEdit(index, row) {
      this.$bus.$emit("chara", row, this.label);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.data.sl2filepath = this.sl2filepath;
      this.data.index = index;
      request({
        url: "http://localhost:5000/api/save/sl2-character-slot",
        method: "delete",
        data: this.data,
      }).then((res) => {
        console.log(res);
        this.tableData.splice(index, 1);
      });
    },
    getCharacter() {
      request
        .get(
          "http://localhost:5000/api/save/sl2-information/" +
            encodeURIComponent(this.sl2filepath)
        )
        .then((res) => {
          console.log("res", res);
          const characterSlotInformations =
            res.data.characterSlotInformations.filter(function (val) {
              if (val === null) {
                val = "";
              }
              return val;
            });
          this.tableData = characterSlotInformations;
          this.steamID = res.data.steamId;
          this.$bus.$emit("charaList", this.tableData, this.label);
          this.$bus.$emit("getPath", this.label, this.sl2filepath);
        });
    },
    enentDrop: function (e) {
      e.stopPropagation();
      e.preventDefault();
      console.log("file", e.dataTransfer.files);
      this.fileName = e.dataTransfer.files[0].name;
      this.filePath = e.dataTransfer.files[0].path;
      var flag = this.fileName.substring(
        this.fileName.length - 3,
        this.fileName.length
      );
      if (flag != "sl2") {
        this.$message({
          type: "error",
          message: "请选择sl2文件",
        });
      }
      console.log(this.filePath);
      this.sl2filepath = this.filePath;
      this.getCharacter();
    },
    dragleave(e) {
      e.stopPropagation();
      e.preventDefault();
    },
    dragenter(e) {
      e.stopPropagation();
      e.preventDefault();
    },
    dragover(e) {
      e.stopPropagation();
      e.preventDefault();
    },
  },
};
</script>
<style scoped>
.info {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}
.info .uid {
  display: flex;
  flex-direction: row;
  flex: 1;
  gap: 10px;
  align-items: center;
}
.kong {
  width: 120px;
  height: 30px;
  font-size: 20px;
}
</style>
