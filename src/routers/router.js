import Router from 'vue-router'
import routes from './routerViews/index'
import Vue from 'vue'

Vue.use(Router)
let router = new Router({
  routes
})

export default router
