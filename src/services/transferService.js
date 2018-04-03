import localData from 'localStorage'
import { isObject, isEmptyObject, isArray } from 'Utils'

// localStorage 下用 transfer-k 代替transferData 里的 k
var pre = 'transfer-'

var transferService = {
  set: function (key, val) {
    if (isObject(key)) {
      Object.keys(key).forEach(function (k, v) {
        transferService.set(k, key[k])
      })
      return
    }

    localData.set(pre + key, val)
  },
  // 取值
  get: function (key) {
    return localData.get(pre + key)
  },
  remove: function (key) {
    if (!key) {
      // 从localStorage里取出所有keys
      // 筛选出 transfer- 开头的清除
      let allKeys = localData.getAllKeys()
      allKeys.forEach(function (k) {
        if (/^transfer-/.test(k)) {
          transferService.remove(k)
        }
      })
    } else if (isArray(key)) {
      key.forEach(function (k) {
        transferService.remove(k)
      })
    } else {
      if (!/^transfer-/.test(key)) {
        key = pre + key
      }
      localData.remove(key)
    }
  },
  clear: function () {
    transferService.remove()
  }
}

export default transferService
