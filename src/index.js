'use strict'
import Vue from 'vue'
import router from './routers/router'
import App from './App.vue'
import store from './store'
import './assets/scss/element-variables.scss'
// import 'element-ui/lib/theme-chalk/index.css'

window.Vue = Vue
Vue.startApp = function () {
  const app = new Vue({
    router,
    store,
    ...App
  }).$mount('#app')
}
Vue.startApp()
