/*
 组件说明：
 把检验是否已经设置密码进行封装，当点击的时候进行校验
 没设置则弹出提示框
 设置过的话就调用传进来的值
 调用方式:
 v-set-pay="callback"
 callback
 可以是function
 可以是表达式 eg: this.show = true
 也可以不写值
 */

import userInfo from 'userService'
import {wap} from 'interaction'
var setPay = {}

setPay.install = function (Vue) {
  Vue.directive('setPay', {
    acceptStatement: true,
    bind: function (node, binding) {
      let callback = binding.value
      node.addEventListener('click', function () {
        let vm = wap.vm
        // 如果加到了xButton的话，点的时候检查是不是失效状态
        if (this.classList.contains('submit-button') && this.querySelector('input[type = "button"]:disabled')) return
        // 未设置支付密码 提示设置支付密码
        if (userInfo.user.is_paypwd_mobile_set != 1) {
          vm.$Alert({
            msg: '<p class="font16">6位手机支付密码是您在投资<br />或提现时必须要输入的</p>',
            text: '马上设置',
            title: null,
            onConfirm: function () {
              vm.$router.push({name: 'setpaypwd', query: {from: true}})
            }
          })
        } else if (callback && typeof callback == 'function') {
          callback()
        }
      }, false)
    }
  })
}

export default setPay
