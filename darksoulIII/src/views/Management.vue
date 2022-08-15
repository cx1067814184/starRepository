<template>
  <div class="archive-box">
    <Archive :tableDate="tableData" label="存档一" />
    <Archive :tableDate="tableData1" label="存档二" />
  </div>
</template>

<script>
import Archive from "../components/Archive.vue";
import request from "../utils/request";
export default {
  name: "Management",
  components: { Archive },
  data() {
    return {
      tableData: [],
      tableData1: [],
      mytable: [],
      mytable1: [],
      myPath: "",
      myPath1: "",
      data: {
        sourceSL2FilePath: "",
        sourceIndex: 0,
        destinationSL2FilePath: "",
        destinationIndex: 0,
        forceCopy: false,
      },
    };
  },
  mounted() {
    this.$bus.$on("charaList", this.charaList);
    this.$bus.$on("getPath", this.getPath);
    this.$bus.$on("chara", this.copyChara);
  },
  methods: {
    getPath(lab, path) {
      if (lab === "存档一") {
        this.myPath = path;
      } else {
        this.myPath1 = path;
      }
    },
    charaList(Array, lab) {
      console.log("1", Array, lab);
      if (lab === "存档一") {
        this.tableData = Array;
      } else {
        this.tableData1 = Array;
      }
    },
    copyChara(row, lab) {
      console.log(row, lab);
      let myRow = JSON.parse(JSON.stringify(row));
      if (lab === "存档一") {
        if (this.tableData1.length >= 10) {
          this.$message.error("存档槽已经满了!请删除后再复制");
          return false;
        }
        this.data.sourceIndex = row.index;
        this.data.destinationIndex = this.tableData1.length;
        this.data.sourceSL2FilePath = this.myPath;
        this.data.destinationSL2FilePath = this.myPath1;
        myRow.index = this.tableData1.length;
        this.tableData1.push(myRow);
        request({
          url: "http://localhost:5000/api/save/copy-sl2-character-slot",
          method: "post",
          data: this.data,
        }).then((res) => {
          console.log(res);
          console.log(this.tableData1);
          if (res.statusCode === 200) {
            this.$message({
              type: "success",
              message: "复制成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "复制失败",
            });
          }
        });
      } else {
        if (this.tableData.length >= 10) {
          this.$message.error("存档槽已经满了!请删除后再复制");
          return false;
        }
        this.data.sourceIndex = row.index;
        this.data.destinationIndex = this.tableData.length;
        this.data.sourceSL2FilePath = this.myPath1;
        this.data.destinationSL2FilePath = this.myPath;
        myRow.index = this.tableData1.length;
        this.tableData.push(myRow);
        request({
          url: "http://localhost:5000/api/save/copy-sl2-character-slot",
          method: "post",
          data: this.data,
        }).then((res) => {
          console.log(res);
          console.log(this.tableData);
          if (res.statusCode === 200) {
            this.$message({
              type: "success",
              message: "复制成功",
            });
          } else {
            this.$message({
              type: "error",
              message: "复制失败",
            });
          }
        });
      }
    },
  },
  beforeDestroy() {
    this.$bus.$off("charaList");
    this.$bus.$off("getPath");
    this.$bus.$off("chara");
  },
};
</script>

<style scoped>
.archive-box {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 40px;
  text-align: center;
}
</style>
