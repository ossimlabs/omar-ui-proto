import Vue from 'vue'
import Router from 'vue-router'
import MainPageSplash from '@/components/MainPageSplash/MainPageSplash'
import SearchPageView from '@/views/SearchPageView'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainPageSplash',
      component: MainPageSplash
    },
    {
      path: '/search',
      name: 'SearchPageView',
      component: SearchPageView
    }
  ]
})
