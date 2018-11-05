import Vue from 'vue'
import Router from 'vue-router'
import routes from '../router/index'

Vue.use(Router)

let routerM = new Router({
  routes
})

// routerM.beforeEach(function (to, from, next) {
// })

// routerM.afterEach(function (to, from, next) {
// })

export default routerM
