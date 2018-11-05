import threeScene from './modules/threeScene.js'

let routers = []
let defalutRouter = [{
  path: '/',
  name: 'home',
  component: function (resolve) {
    require(['../views/index.vue'], resolve)
  }
}, {
  path: '*',
  redirect: '/'
}]

routers = [].concat(defalutRouter, threeScene)
export default routers
