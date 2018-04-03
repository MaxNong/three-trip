import Conf from 'config'
import transferService from 'transferService'

const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/
/********************* utils 区域 *********************/
// att-bb => arrBb
// arr:bb => arrBb
// 转化为驼峰
export function camelCase (name) {
  return name.replace(/([:\-_]+(.))/g, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter
  }).replace(/^moz([A-Z])/, 'Moz$1')
}
export function extend (destination, source, isDeep) {
  var obj, copy
  for (var property in source) {
    obj = source[property]
    if (isDeep && isObject(obj)) { // 判断是深拷贝且这个属性是纯对象
      let copy = isObject(destination[property]) ? destination[property] : {}
      destination[property] = extend(copy, obj, isDeep) // 递归调用，创建一份obj的拷贝，赋值给destination
    } else {
      destination[property] = obj
    }
  }
  return destination
}

// 获取url里的search字段，返回一个json
export function getQuery () {
  let search = (window.location.href.match(/\?([^?]+)$/) || [])[1]
  let map = {}
  if (search) {
    // 反向解析url格式
    search = decodeURI(search)
    search.replace(/([^&=\s]*)\s*=\s*([^&=\s]*)/g, function (all, a, b) {
      map[a] = b
    })
  }
  return map
}

// 1,333,112 ==> 1333112
export function moneyToDigit (v) {
  return parseFloat(v.toString().replace(/,/g, ''))
}

// 1333112(.00) ==>  1,333,112(.00)
export function digitToMoney (v) {
  return v.toString().replace(/(\d)(?=(\d{3})+(\.\d{2}|$))/g, '$1,')
}

// 是不是在微信里，配制微信分享
export let isWeixin = (function () {
  let isInWeiXin = window.navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1
  return function () {
    return isInWeiXin
  }
})()

// 拨打电话
export function callUp (phone) {
  window.location.href = 'tel:' + phone
}

//把数字转为带千字符的
export function toThousands (nums = '') {
  var num = nums && nums.toString(), result = '', decimal = ''
  //先判断是否是带小数的
  if (~num.indexOf('.')) {
    decimal = num.substr(num.indexOf('.'))
    num = num.substr(0, num.indexOf('.'))
  }
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result
    num = num.slice(0, num.length - 3)
  }
  if (num) result = num + result
  return result + decimal
}

//比较两个时间差额是多少天，返回值单位天
export function dateDiff (sDate1, sDate2) {
  //sDate1和sDate2是2006-12-18格式
  var aDate, oDate1, oDate2, iDays
  aDate = sDate1.split('-')
  //调用Date的构造函数，转换为12-18-2006格式
  oDate1 = new Date(aDate[0], aDate[1] - 1, aDate[2])
  aDate = sDate2.split('-')
  oDate2 = oDate2 = new Date(aDate[0], aDate[1] - 1, aDate[2])
  //把相差的毫秒数转换为天数
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
  if (!(oDate1 < oDate2)) {
    iDays = -iDays
  }
  return iDays >= 0 ? iDays + 1 : iDays
}

// 数据类型, 返回他的数据类型
export function isType (obj) {
  var s = Object.prototype.toString.call(obj)
  return s.match(/\[object (.*?)\]/)[1].toLowerCase()
}

// 是否对象类型
export function isObject (o) {
  return isType(o) === 'object'
}

// 是否字符串类型
export function isString (o) {
  return isType(o) === 'string'
}

// 是否布尔类型
export function isBoolean (o) {
  return isType(o) === 'boolean'
}

// 是否number类型
export function isNumber (o) {
  return isType(o) === 'number'
}

// 是否function类型
export function isFunction (o) {
  return isType(o) === 'function'
}

// 是否数组类型
export function isArray (o) {
  return Array.isArray(o)
}

// 是否空对象
export function isEmptyObject (obj) {
  let name
  for (name in obj) {
    if (obj.hasOwnProperty(name)) {
      return false
    }
  }
  return true
}

/********************* dom 区域 *********************/
// 触发自定义事件
export function trigger (el, type) {
  var e = document.createEvent('HTMLEvents')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}

// 绑定事件
export function bind (elem, event, handler, type) {
  if (!(elem && event && handler)) return
  type = !!type
  elem = querySelector(elem)
  // fzc 测试发现给body加scroll事件没效果
  if (elem.tagName && elem.tagName.toLowerCase() === 'body' && event === 'scroll') {
    elem = window
  }
  elem.addEventListener(event, handler, type)
}

// 解绑
export function unbind (elem, event, handler, type) {
  if (!(elem && event && handler)) return
  type = !!type
  elem = querySelector(elem)
  // fzc 测试发现给body加scroll事件没效果
  if (elem.tagName && elem.tagName.toLowerCase() === 'body' && event === 'scroll') {
    elem = window
  }
  elem.removeEventListener(event, handler, type)
}

export function getStyle (elem, styleName) {
  if (!elem || !styleName) return null
  let ref
  styleName = camelCase(styleName)
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }
  // 从style里取值
  ref = elem.style[styleName]
  // 不存在就从css文件里取
  if (!ref) {
    ref = document.defaultView.getComputedStyle(elem, '')[styleName]
  }
  return ref || null
}

export function setStyle (elem, styleName, value) {
  if (!elem || !styleName) return
  if (typeof value == 'undefined') {
    value = null
  }
  if (typeof styleName === 'object') {
    Object.keys(styleName).forEach(item => {
      setStyle(elem, item, styleName[item])
    })
  } else {
    styleName = camelCase(styleName)
    elem.style[styleName] = value
  }
}

export function setStyleText (elem, str) {
  elem.style.cssText = str
}
export function getStyleText (elem, str) {
  return elem.style.cssText
}

// 只绑定一次事件
export function once (el, event, fn) {
  var listener = function () {
    if (fn) {
      fn.apply(this, arguments)
    }
    unbind(el, event, listener)
  }
  bind(el, event, listener)
}

// 有没有className
export function hasClass (el, cls) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
}

// 添加className
export function addClass (el, cls) {
  if (!el) return
  if (el.classList) {
    el.classList.add(cls)
    return
  }
  var curClass = el.className
  var classes = (cls || '').split(' ')
  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  }
  el.className = curClass
}
// 取元素, 如果是('.a,.b')不要用原生的，此函数可以保证他的前后顺序
// 原生找到第一个满足条件的元素，不管参数的顺序
// 原生查找逻辑:
// 1. 由外到内
// 2. 由上到下，
export function querySelector (elem) {
  let ref
  if (isString(elem)) {
    let arr = elem.split(',')
    // 以空格为分隔符，如果数据大于1说明是多个中选一个
    // 按先后顺序取node
    if (arr.length > 1) {
      arr.forEach(node => {
        if (!ref) {
          ref = querySelector(node)
        }
      })
    }
  } else if (elem.window == window) {
    ref = elem
  }
  return elem.nodeType ? elem : (ref || document.querySelector(elem))
}

// 取所有满足条件的元素
export function querySelectorAll (elem) {
  return elem.tagName ? elem : document.querySelectorAll(elem)
}

// 取元素的偏移量
export function offset (elem, targer) {
  targer = targer || document.body
  let dis = {
    top: 0,
    left: 0
  }
  // 默认要运行下
  do {
    dis.top += elem.offsetTop
    dis.left += elem.offsetLeft

    elem = elem.offsetParent
  } while (elem && elem.tagName.toLowerCase() !== 'body')

  return dis
}

// 删除className
export function removeClass (el, cls) {
  if (!el || !cls) return
  var classes = cls.split(' ')
  var curClass = ' ' + el.className + ' '

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else {
      if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ')
      }
    }
  }
  if (!el.classList) {
    el.className = curClass.trim()
  }
}

/********************* 设备判断 区域 *********************/
export function isIos () {
  let UA = typeof window !== 'undefined' && window.navigator.userAgent.toLowerCase()
  return UA && /iphone|ipad|ipod|ios/.test(UA)
}

export function isAndroid () {
  let UA = typeof window !== 'undefined' && window.navigator.userAgent.toLowerCase()
  return UA && UA.indexOf('android') > 0
}

// 分析设备
let isHadEquipmentInfo = false
export function getEquipmentClassify () {
  if (!isHadEquipmentInfo) {
    let isApp = /\?app=1/.test(window.location.href),
      ios = isIos(),
      android = isAndroid()

    Conf.isApp = isApp
    Conf.isAndroid = android
    Conf.isIos = ios
    Conf.isWeixin = isWeixin()

    if (isApp) {
      Conf.isIosApp = ios
      Conf.isAndroidApp = android
    }
    isHadEquipmentInfo = true
  }
  // webpack打包会把import先解析
  // 所以在main里的取设备类型的会晚些时间运行
  // 如果加载页面时就要用到就用这个返回值
  // wxShare有用到return里的值
  return {
    isApp: Conf.isApp,
    isAndroid: Conf.isAndroid,
    isIos: Conf.isIos,
    isIosApp: Conf.isIosApp,
    isAndroidApp: Conf.isAndroidApp,
    isWeixin: Conf.isWeixin
  }
}

/********************* 数据相关 *********************/

export function setLoginInfo (info) {
  transferService.set('loginInfo', info)
}

export function getLoginInfo () {
  return transferService.get('loginInfo')
}

/********************* input 相关 *********************/
// 取input的值，这里还要分出radio
export function getInputValue (elem) {
  let val = elem.value.trim()
  if (/^(radio|checkbox)$/.test(elem.type) && !elem.checked) {
    val = ''
  }
  return val
}

function formatNumber (n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export function formatTime (date) {
  if (!date) return false
  if (typeof date !== 'object') {
    date = new Date(parseInt(date, 10))
  }
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
export function getStartAndEndDate (year, month) {
  let date = new Date()
  year = year || date.getFullYear()
  month = month || (date.getMonth() + 1)
  let getDayCount = function (year, month) {
    let day = new Date(year, month, 0)
    return day.getDate()
  }
  let daycount = getDayCount(year, month)
  return {
    start: [year, month, 1].map(formatNumber).join('-'),
    end: [year, month, daycount].map(formatNumber).join('-')
  }
}
export function formatDate (date) {
  if (!date) return ''
  if (/\d{4}-\d{2}-\d{2}/.test(date)) {
    return date
  }
  if (typeof date !== 'object') {
    date = new Date(parseInt(date, 10))
  }
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-')
}

export function checkTel (rule, value, callback) {
  var reg = /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/
  if (!value) {
    return callback(new Error('请输入公司电话'))
  }
  if (!reg.test(value)) {
    callback(new Error('请输入正确的公司电话'))
  } else {
    callback()
  }
}
export function checkTime (rule, value, callback) {
  var reg = /([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))/
  if (!value) {
    return callback(new Error('请输入营业期限'))
  }
  if (!reg.test(value)) {
    callback(new Error('请输入正确的营业期限'))
  } else {
    callback()
  }
}
export function checkCertCode (rule, value, callback) {
  var reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/
  if (!value) {
    return callback(new Error('请输入法定代表人身份证号码'))
  }
  if (!reg.test(value)) {
    callback(new Error('请输入正确的代表人身份证号码'))
  } else {
    callback()
  }
}
export function checkPhone (rule, value, callback) {
  var reg = regMobile
  if (!value) {
    return callback(new Error('请输入手机号码'))
  }
  if (!reg.test(value)) {
    callback(new Error('请输入正确的手机号码'))
  } else {
    callback()
  }
}
export function checkSmsCode (rule, value, callback) {
  var reg = /^\d{6}$/
  if (!value) {
    return callback(new Error('请输入手机动态码'))
  }
  if (!reg.test(value)) {
    callback(new Error('请输入正确的手机动态码'))
  } else {
    callback()
  }
}
export function checkCode (rule, value, callback) {
  var reg = /^.{4}$/
  if (!value) {
    return callback(new Error('请输入验证码'))
  }
  if (!reg.test(value)) {
    callback(new Error('请输入正确的验证码'))
  } else {
    callback()
  }
}

export function checkBankNumber (rule, value, callback) {
  var reg = /^\d+$/
  if (!value) {
    return callback(new Error('请输入银行卡号'))
  }
  if (!reg.test(value)) {
    callback(new Error('请输入正确的银行卡号'))
  } else {
    callback()
  }
}

export function validPass (rule, value, callback) {
  var reg = /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/
  if (!value) {
    this.passError = true
    return callback(new Error('请输入密码'))
  }
  if (value.length !== 6) {
    this.passError = true
    callback(new Error('请输入完整的密码'))
  } else {
    this.passError = false
    callback()
  }
}

// 服务于animation的函数
var animationFunc = {
  // 查找滚动相关
  reg: /^scroll/,
  // 初始化取相关数据
  init: function (elem, props) {
    let ref = {},
      pos = {}

    Object.keys(props).forEach(k => {
      // 滚动相关, 直接元素里取
      if (this.reg.test(k)) {
        ref[k] = elem[k]
      } else {
        ref[k] = parseInt(getStyle(elem, k))
      }
      // 取有差别的元素值，这样方便作动画
      if (!pos.dis) {
        pos.init = ref[k]
        pos.dis = parseInt(props[k]) - ref[k]
      }
    })
    // 返回
    return {
      ref,
      pos
    }
  },
  // 给元素赋值
  setTargetVal: function (elem, initData, curDis) {
    let ref = {},
      initProps = initData.ref

    Object.keys(initProps).forEach(k => {
      // 如果是滚动相关的
      if (this.reg.test(k)) {
        elem[k] = initProps[k] + curDis
      } else {
        ref[k] = (initProps[k] + curDis) + 'px'
      }
    })
    setStyle(elem, ref)
  }
}
