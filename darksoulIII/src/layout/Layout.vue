<template>
  <div>
    <!--    头部-->
    <Header />
    <!--    主体-->
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  name: "Layout",
  components: {
    Header,
  },
};
</script>

<style scoped>
</style>