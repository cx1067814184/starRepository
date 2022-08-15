<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
[class*=" el-icon-"], [class^=el-icon-] {
  color: rgb(26, 93, 119);
}
.el-input__inner, .el-textarea__inner{
  text-align: center;
}
</style>
