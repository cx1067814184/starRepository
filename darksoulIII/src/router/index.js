import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/Layout.vue'
import Management from '@/views/Management.vue'
import Set from "@/views/Set.vue"
import Startthe from "@/views/Startthe.vue"
import Select from "@/views/Select.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: "/startthe",
      children: [
        {
          path: 'set',
          name: 'Set',
          component: Set
        },
        {
          path: 'management',
          name: 'Management',
          component: Management
        },
        {
          path: 'startthe',
          name: 'Startthe',
          component: Startthe
        },
        {
          path: 'select',
          name: 'Select',
          component: Select
        }
      ]
    }
  ]
})
