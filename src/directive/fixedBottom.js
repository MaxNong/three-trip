/*
 组件说明：
 有些内容需要固定到底部，但是手机键盘弹启时内容会跟着上去，从而挡着其它内容
 组件逻辑，开始的时候取屏幕的高度，然后修改top值，使top固定

 v-fixed-bottom="fn"
 设置完成回调fn，把当前top值传过来
 */
import { getStyle } from 'dom'
var fixedBottom = {}

fixedBottom.install = function (Vue) {
  Vue.directive('fixedBottom', {
    acceptStatement: true,
    // dom已经放到父节点时触发事件
    inserted: function (node, binding) {
      let screenHeight = window.innerHeight, // 窗口大小
        bottom = parseInt(getStyle(node, 'bottom')), // 元素本身距离下面高度
        value = binding.value, // 回调函数
        top = screenHeight - bottom - node.clientHeight // 计算出来的top
      // 赋值
      node.style.cssText = 'bottom:auto;top:' + top + 'px'
      if (typeof value == 'function') {
        value(top)
      }
    }
  })
}

export default fixedBottom
