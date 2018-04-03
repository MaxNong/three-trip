
let defaultRouter = [
  {
    path: '/',
    name: 'home',
    component: resolve => {
      require(['../../views/user/login.vue'], resolve)
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]
let routers = Array.prototype.concat(defaultRouter)
export default routers
