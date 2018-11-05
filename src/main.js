import Vue from 'vue'
import App from './App'
import router from './controllers/router'

Vue.config.productionTip = false
window.Vue = Vue

/* eslint-disable no-new */
Vue.startApp = function () {
  new Vue({
    router,
    ...App
  }).$mount('#app')
}
Vue.startApp()
