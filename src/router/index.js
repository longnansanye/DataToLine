import Vue from 'vue'
import Router from 'vue-router'
import datatoline from '@/components/datatoline'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Element)
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
