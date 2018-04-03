import axios from 'axios'
import apiConfig from 'apiConfig'

// android 4.1不支持promise,这里先加上防止以后
if (!window.Promise) {
  window.Promise = require('es6-promise').Promise
}
//axios配置
axios.defaults.timeout = 15000 // 响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded' // 配置post请求头

function api (option) {
  if (typeof (option) !== 'object') {
    window.alert('无效的接口地址')
    return
  }
  let url = ''
  let name = option.name
  let type = option.type || 'get'
  if (type === 'get') {
    url = apiConfig[name] + jsonToQueryString(option.data)
  }
  axios[type](type === 'get' && option.data ? url : apiConfig[name], option.data || {}).then(function (response) {
    if (response.data.code) {
      option.resolve(response.data.data)
    } else {
      if (response.data.message) window.alert(response.data.message)
    }
  }, function (response) {
    if (option.reject) { option.reject() }
    window.alert('系统连接超时，请稍后再试')
  })

  function jsonToQueryString (json) {
    if (!json) return ''
    return '?' +
      Object.keys(json).map(function (key) {
        return encodeURIComponent(key) + '=' +
          encodeURIComponent(json[key])
      }).join('&')
  }
}

export default api
