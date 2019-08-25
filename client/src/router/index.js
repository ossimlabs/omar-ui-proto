import Vue from 'vue'
import Router from 'vue-router'
import MainPageSplash from '@/components/MainPageSplash/MainPageSplash'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/omar-ui-proto',
      name: 'MainPageSplash',
      component: MainPageSplash
    }
  ]
})
