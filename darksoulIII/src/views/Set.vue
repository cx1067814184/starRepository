<template>
  <div>
    <div class="center">
      <el-form label-position="top" label-width="80px" :model="formLabelAlign" >
        <el-form-item label="DARKSOUL III 游戏路径(自动获取)">
          <el-input v-model="formLabelAlign.thepath" disabled></el-input>
        </el-form-item>
        <el-form-item label="MasterServer栏位1">
          <el-input v-model="formLabelAlign.column1"></el-input>
        </el-form-item>
        <el-form-item label="MasterServer栏位2">
          <el-input v-model="formLabelAlign.column2"></el-input>
        </el-form-item>
        <el-form-item label="MasterServer栏位3">
          <el-input v-model="formLabelAlign.column3"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from '../utils/request'
export default {
  name: "Set",
  components: {},
  data() {
    return {
      formLabelAlign: {
        thepath: "",
        column1: "",
        column2: "",
        column3: "",
      },
    };
  },
  created(){
    this.getDS3Path()
  },
  methods: {
    getDS3Path(){
      request.get('http://localhost:5000/api/loader/game-path').then(res => {
        console.log(res)
        if(res.succeeded){
          this.formLabelAlign.thepath = res.data
        }else{
          this.$message({
              type: "error",
              message: res.errors,
            });
        }
      })
    }
  },
};
</script>

<style scoped>
.center {
  margin: 20px;
  text-align: center;
}
</style>>