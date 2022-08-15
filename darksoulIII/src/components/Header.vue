<template>
  <nav class="tou">
    <div class="zi" @click="$router.push('/')">药丸启动器</div>
    <div class="operation">
      <!-- <el-button
        round
        icon="el-icon-switch-button"
        @click="$router.push({ name: 'Startthe' })"
        >启动</el-button
      >
      <el-button round @click="$router.push({ name: 'Management' })"
        >存档管理</el-button
      >
      <el-button
        round
        icon="el-icon-setting"
        @click="$router.push({ name: 'Set' })"
        >设置
      </el-button> -->

      <nav-item
        class="nav-item"
        v-for="item in ops"
        :key="item.url"
        :title="item.title"
        :url="item.url"
        :icon="item.icon"
      />
    </div>
  </nav>
</template>
<script>
import NavItem from './NavItem.vue'
export default {
  name: 'Header',
  components: { NavItem },
  data() {
    return {
      ops: [
        {
          title: '启动',
          url: '/startthe',
          icon: 'el-icon-switch-button',
        },
        {
          title: '存档管理',
          url: '/management',
          icon: 'el-icon-document',
        },
        {
          title: '设置',
          url: '/set',
          icon: 'el-icon-setting',
        },
      ],
    }
  },
}
</script>

<style scoped>
.tou {
  height: 50px;
  line-height: 50px;
  display: flex;
  background-color: #424245;
  padding: 0px 40px;
}
.zi {
  width: 200px;
  font-weight: bold;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
}
.operation {
  display: flex;
  flex: 1;
  justify-content: right;
  grid-gap: 2rem;
  gap: 2rem;
}

.nav-item:focus {
  animation: fadeIn;
  animation-duration: 0.8s;
}
</style>
