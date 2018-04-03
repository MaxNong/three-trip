var path = require('path')

// 获取绝对路径
function getAbsolutePath(addr) {
  if(!/\/src\//.test(addr)) {
    addr = '../src/' + addr;
  }
  return path.resolve(__dirname, addr);
}

module.exports = {
  'vue': 'vue/dist/vue.js',
  'src': path.resolve(__dirname, '../src'),
  // components 下各类组件
  'qrcodefooter': getAbsolutePath('components/fragment/qrcodefooter.vue'),
  'navBox': getAbsolutePath('components/nav/index.vue'),
  'selectItem': getAbsolutePath('components/selectList/index.vue'),
  'infoBox': getAbsolutePath('components/infoBox/index.vue'),
  'map': getAbsolutePath('components/map/index.vue'),
  'bulkInfo': getAbsolutePath('components/bulkInfo/index.vue'),
  'card': getAbsolutePath('components/card/index.vue'),
  'infoForm': getAbsolutePath('components/form/index.vue'),
  // common
  'Utils': getAbsolutePath('common/utils.js'),
  // controllers
  'Stars': getAbsolutePath('controllers/star.js'),
  'Meteor': getAbsolutePath('controllers/Meteor.js'),
  'Moon': getAbsolutePath('controllers/Moon.js'),
  'addFeature': getAbsolutePath('controllers/map/addFeature.js'),
  //constants
  'apiConfig': getAbsolutePath('constants/config.api.js'),
  'config': getAbsolutePath('constants/config.js'),
  //services
  'localStorage': getAbsolutePath('services/localStorage.js'),
  'transferService': getAbsolutePath('services/transferService.js'),
  'api': getAbsolutePath('services/api.js'),
  'mapJs': getAbsolutePath('services/map.js')
}
