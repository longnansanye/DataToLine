import Vue from 'vue'
import Router from 'vue-router'
import datatoline from '@/components/datatoline'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'datatoline',
      component: datatoline
    }
  ]
})
