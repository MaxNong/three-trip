/**
 * Created by xuxin on 16/4/28.
 */
import { on, off, trigger } from 'dom'

let limitEvents = {
  //如92.22这种格式
  money: {
    'keydown': function (e) {
      let keyCode = e.keyCode,
        val = this.value.trim(),
        decimal = val.split('.')[1] || '',
        decimalLength = decimal.length,
        decimalSepLen = val.split('.').length,
        con1 = val === '' && keyCode === 190, //为空,且输入.
        con2 = keyCode !== 190 && (keyCode < 48 || keyCode > 57),  //不为点,且不在0~9之内
        con3 = !con2 && decimalLength === 2 //小数位数是否等于2,等于2忽略输入
      if (keyCode !== 8 && (con1 || con2 || con3) || decimalSepLen == 2 && keyCode == 190) {
        e.preventDefault()
      }
    },
    //防止输入手机键盘上方的中文, 那种输入不会触发keydown
    'input': function (e) {
      var oldVal = this.value,
        newVal = oldVal,
        reg = /^(0|[1-9][0-9]*)(\.[0-9]{0,2})?$/
      if (!reg.test(newVal)) {
        newVal = newVal.slice(0, -1)
      }
      // 去掉非数字和.
      newVal = newVal.replace(/[^\d.]/g, '')
      if (oldVal !== newVal) {
        this.value = newVal
        // 触发input事件。this.input()触发不了
        // 这样vue才可以再次更新数据
        trigger(this, 'input')
      }
    }
  },
  number: {
    'keydown': function (e) {
      let keyCode = e.keyCode
      if (keyCode !== 8 && (keyCode < 48 || keyCode > 57)) {
        e.preventDefault()
      }
    },
    'input': function (e) {
      var oldVal = String(this.value),
        newVal = oldVal,
        reg = /[^0-9]/g
      if (reg.test(newVal)) {
        newVal = newVal.replace(reg, '')
      }
      if (oldVal !== newVal) {
        this.value = newVal
        // 触发input事件。this.input()触发不了
        // 这样vue才可以再次更新数据
        trigger(this, 'input')
      }
    }
  }
}

function getInput (el) {
  if (el.tagName.toLowerCase() === 'input') {
    return el
  } else {
    return el.querySelector('input')
  }
}

let inputLimit = {}
inputLimit.install = function (vue) {
  // fzc: inputX组件用到。 指令的优先级高
  // 所以第一次input_type就直接传过来了
  // 当数据初始化完成后值会改变这时候update监控到变化再bind一次
  vue.directive('inputLimit', {
    bind (el, binding, vnode) {
      if (!binding.args) {
        let args = binding.arg.split(':')
        args.forEach(function (arg) {
          let event = limitEvents[arg]
          if (event) {
            let input = getInput(el)
            for (let o in event) {
              if (event.hasOwnProperty(o)) {
                on(input, o, event[o])
              }
            }
          }
        })
      }
    },
    update () {},
    unbind (el, binding) {
      if (!binding.args) {
        let args = binding.arg.split(':')
        args.forEach(function (arg) {
          let event = limitEvents[arg]
          if (event) {
            let input = getInput(el)
            for (let o in event) {
              if (event.hasOwnProperty(o)) {
                off(input, o)
              }
            }
          }
        })
      }
    }
  })
}

export default inputLimit

