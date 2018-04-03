/**
 * Created by xuxin on 16/4/28.
 * 默认间隔3s
 */
import {on, off} from 'dom'
var turn = {}
function TurnConstructor (setTimeout_id, childLen, count, interval, dEl, dHeight) {
  this.setTimeout_id = setTimeout_id
  this.childLen = childLen
  this.count = count
  this.interval = interval
  this.dEl = dEl
  this.dHeight = dHeight
}
turn.install = function (vue) {
  vue.directive('turn', {
    bind (el, binding, vnode) {
      //实例化构造函数
      var turnBae = new TurnConstructor('', vnode.children.length, 1, '', el, '')
      el.turnBae = turnBae
      if (el.turnBae.childLen <= 1) return
      el.innerHTML = el.innerHTML + el.innerHTML
      el.classList.add('css3-animation')
      el.turnBae.interval = parseInt(el.getAttribute('interval')) || 3000
      on(el, 'webkitTransitionEnd', function () {
        binding.def.afterTurn(el, binding)
      })
      binding.def.turn(el, binding)
    },
    // css3效果作完回调
    afterTurn: function (el, binding) {
      if (binding.expression) {
        //that.vm[binding.expression](count - 2)
      }
      binding.def.turn(el, binding)
    },
    turn: function (el, binding) {
      if (el.turnBae.count > el.turnBae.childLen) {
        binding.def.reset(el)
      }
      clearTimeout(el.turnBae.setTimeout_id)
      el.turnBae.setTimeout_id = setTimeout(function () {
        binding.def.calcPos(el)
      }, el.turnBae.interval)
    },
    reset: function (el) {
      el.turnBae.dEl.classList.remove('css3-animation')
      el.turnBae.dEl.style.cssText = ''
      el.clientHeight
      el.turnBae.dEl.classList.add('css3-animation')
      el.turnBae.count = 1
    },
    // 计算当前滑动的位置
    calcPos: function (el) {
      if (!el.turnBae.dHeight) {
        el.turnBae.dHeight = el.turnBae.dEl.clientHeight
      }
      let dis = el.turnBae.count * el.turnBae.dHeight
      el.style.cssText = '-webkit-transform: translate3d(0, ' + -dis + 'px, 0px);transform: translate3d(0, ' + -dis + 'px, 0px)'
      el.turnBae.count++
    },
    unbind (el, binding) {
      off(el, 'transitionend', function () {
        binding.def.afterTurn(el, binding)
      })
      el.turnBae.setTimeout_id && clearTimeout(el.turnBae.setTimeout_id)
    }
  })
}

export default turn

