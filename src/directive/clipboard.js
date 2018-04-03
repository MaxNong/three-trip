// v-clipboard
// <div v-clipboard="function/string"></div>
// 自动检测app
import {on} from 'dom'
import Conf from 'config'
import { xhh } from 'interaction'

let body = document.body, clipboard = {}, oldValue, isIos = window.navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)
function createInput (val) {
  let input
  if (Conf.isApp) {
    xhh.doAction('doCopy', {data: val})
  } else if (val !== oldValue) {
    input = document.createElement('input')
    input.type = 'text'
    input.readonly = true
    input.style.cssText = 'position:absolute;top:-10000px'
    input.value = val
    body.appendChild(input)
    if (isIos) {
      // 这段代码必须放在前面否则无效
      window.getSelection().removeAllRanges()
      var range = document.createRange()
      // 选中需要复制的节点
      range.selectNode(input)
      // 执行选中元素
      window.getSelection().addRange(range)
    } else {
      input.select()
    }
    document.execCommand('Copy')
    body.removeChild(input)
    oldValue = val
  }
  window.WAP.vm.$Tip('复制成功')
}

clipboard.install = function (vue) {
  vue.directive('clipboard', {
    bind (el, { value }, vnode) {
      oldValue = ''
      on(el, 'click', function () {
        let val = typeof value === 'function' ? value() : value
        if (val) {
          createInput(val)
        }
      })
    }
  })
}

export default clipboard

