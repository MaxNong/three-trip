export default [
  {
    path: '/test',
    name: 'test',
    component: function (resolve) {
      require(['../../views/test.vue'], resolve)
    }
  }
]
