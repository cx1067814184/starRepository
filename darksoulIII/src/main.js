import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'animate.css'

// Vue.prototype.$api = process.env.NODE_ENV == 'development' ? '' : "http://dev.ymchangge.cn"; 
// Vue.prototype.$api = process.env.NODE_ENV == 'development' ? '' : "http://ds3sid.xyz:50005";


Vue.config.productionTip = false
Vue.use(ElementUI)


new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  beforeCreate(){
    Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
},
})
