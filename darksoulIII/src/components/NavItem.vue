<template>
  <router-link :to="url">
    <div class="item">
      <i :class="icon" />
      {{ title }}
    </div>
  </router-link>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
  },
  name: 'NavItem',
  components: {},
  data() {
    return {}
  },
}
</script>
<style scoped>
a {
  text-decoration: none;
}
.item {
  padding: 0 4px;
  color: #f5f5f7;
  opacity: 0.7;
}

.item i {
  color: #f5f5f7 !important;
}

.item:hover {
  opacity: 1;
}
.router-link-active {
  border-bottom: 3px solid #409eff;
}
.router-link-active .item {
  opacity: 1;
}
</style>
