import Vue from 'vue'
import Router from 'vue-router'

import MainLayout from "@/pages/layout/main"
import Find from '@/pages/find'
import FM from '@/pages/FM'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/main/find'
    },
    {
      path: '/main',
      component: MainLayout,
      redirect: '/main/find',
      children: [
        {
          path: 'find',
          component: Find
        },
        {
          path: 'fm',
          component: FM
        }
      ]
    }
  ]
})
