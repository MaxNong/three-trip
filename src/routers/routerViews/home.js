let homeRouter = [
  {
    path: '/plan/index',
    name: 'planIndex',
    component: resolve => {
      require(['../../views/plan/index.vue'], resolve)
    }
  },
  {
    path: '/plan/detail',
    name: 'planDetail',
    component: resolve => {
      require(['../../views/plan/detail.vue'], resolve)
    }
  }
]

export default homeRouter
