/**
 * Created by xuxin on 16/4/28.
 */
import { addClass, removeClass } from '../common/dom'

function isCanSubmit (el, binding) {
  // 新改版组件用的是<button type="button"></button>
  const btn = el.querySelector('input[type=button], button[type=button]') || {getAttribute: function () {}}
  const effectiveClass = el.getAttribute('activeclass') || 'blue'
  //是否需要校验input的有效性
  const noNeedCheck = btn.getAttribute('is-valid') == 0

  const obj = binding.value
  // fzc: 最后对特殊字段进行处理, lastValid为function
  const callback = obj.lastValid

  let isCanSubmit = true

  if (!noNeedCheck) {
    //初始情况没有属性值
    if (Object.isEmptyObject((obj))) {
      isCanSubmit = false
    } else {
      for (let v in obj) {
        if (obj.hasOwnProperty(v)) {
          if (obj[v] !== 0 && !obj[v]) {
            isCanSubmit = false
          }
        }
      }
    }
  }

  // 有callback，则如果返回是true则说明通过
  if (isCanSubmit && (!callback || callback(obj))) {
    addClass(btn, effectiveClass)
    btn.disabled = false
  } else {
    removeClass(btn, effectiveClass)
    btn.disabled = true
  }
}

let formValidate = {}

formValidate.install = function (vue) {
  vue.directive('formValidate', {
    deep: true,
    // fzc: 有时候填写完内容不小心切换页面，返回后不能变蓝
    // 所以默认检查一次
    bind (el, binding) {
      isCanSubmit(el, binding)
    },
    update (el, binding) {
      isCanSubmit(el, binding)
    }
  })
}

export default formValidate

