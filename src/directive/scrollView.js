/**
 * 当滑动在底/顶时会触发bus的两个事件
 * Bus.$emit('IScroll:inBottom') 到底的时候触发
 * Bus.$emit('IScroll:inTop') 到顶时触发
 */
import Bus from 'bus'
import IScroll from '../lib/iscroll'
import { addClass, removeClass } from '../common/dom'
import Vue from 'vue'
import {functions} from 'functions'
import {wap} from 'interaction'
import Conf from 'config'

function preventDefault (e) {
  // e.preventDefault()
}

let scrollView = {}, savePositionObj

// 记录config.savePosition对象元素的位置
function checkSavePosition (dis) {
  if (!savePositionObj) {
    savePositionObj = Conf.savePosition[wap.vm.$route.name] || {}
  }
  if (!savePositionObj.from) return
  savePositionObj.dis = dis
}

scrollView.install = function (Vue) {
  Vue.directive('scrollView', {
    acceptStatement: true,
    bind (el, binding, vnode) {
      // 初始化重置
      savePositionObj = null
      let scrollBar = el.firstElementChild
      addClass(el, 'base-view')
      addClass(scrollBar, 'scrollNode')
      // 有时内容元素有浮动，要清理掉，否则不能撑开
      addClass(scrollBar, 'clearfix')
      //debugger
      var scroll = vnode.scroll = new IScroll(el, {
        onScrollEnd: function () {
          Bus.$emit('IScroll:end')
          if (scroll.y < 0 && scroll.scrollerH <= -scroll.y + scroll.wrapperH) {
            Bus.$emit('IScroll:inBottom')
          }
          if (scroll.y == 0) {
            Bus.$emit('IScroll:inTop')
          }
        },
        // 头部下拉刷新
        onTouchEnd: function (e) {
          // startY: 开始滑动时位置  absDisY: Y轴方向上滑过的距离
          var diff = this.startY + this.absDistY
          // diY小于0说明页面向上滑动
          if (this.dirY < 0) {
            Bus.$emit('IScroll:end')
          }
          if (Math.abs(this.distY) / scroll.wrapperH > 0.4 && this.distY < 0) {
            Bus.$emit('IScroll:upDrag')
          }
        },
        onScrollMove: function (e) {
        },
        onScrollChange: function (x, y) {
          //console.log('onScrollChange')
          //操作scrollTop组件
          functions.scrollTopChange(this.y)
          //floatButton组件
          Bus.$emit('IScroll:scrollChange', {'scrollLeft': x, 'scrollTop': y, 'element': el})
          checkSavePosition(y)
        }
        //checkDOMChanges: true,
        //checkOnce: true
      })
      // 解决红米点文字无法滑动的问题
      scroll.scroller.addEventListener('click', function () {}, false)

      //document.addEventListener('touchmove', preventDefault, false)

      Vue.nextTick(function () {
        scroll.refresh()
      })

      let myEvents = {
        // time 必须为数字格式
        'IScroll:top': function (time) {
          if (!scroll) return false
          scroll.scrollTo(0, 0, parseInt(time) || 0)
        },
        'IScroll:move': function (x, y, time) {
          if (!scroll) return false
          scroll.scrollTo(x, y, parseInt(time) || 0)
        },
        'IScroll:elem': function (elem, time) {
          if (!scroll) return false
          if (!elem) {
            this.$emit('IScroll:top', time)
          } else {
            this.$nextTick(function () {
              //此处从新计算
              scroll.refresh()
              scroll.scrollToElement(elem, parseInt(time) || 0)
            })
          }
        },
        // 因为要重新计算滑动宽高等属性
        // 所以要把当前tick才可以，否则计算的还是老的
        'IScroll:refresh': function () {
          if (!scroll) return false
          this.$nextTick(function () {
            scroll.refresh()
          })
        }
      }

      Object.keys(myEvents).forEach(function (e) {
        Bus.$on(e, myEvents[e])
      })
    },
    unbind (el, binding, vnode, oldVnode) {
      vnode.scroll && vnode.scroll.destroy()
      document.removeEventListener('touchmove', preventDefault, false)
    }
  })
}

export default scrollView

