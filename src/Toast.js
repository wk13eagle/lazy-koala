/**
 * Lazy Toast
 * 使用vant组件
 */
import 'vant/es/toast/style' // Toast
import {
  showToast as VantShowToast,
  showLoadingToast as VantShowLoadingToast,
  allowMultipleToast
} from 'vant'

// 允许多个Toast存在
allowMultipleToast()

export const showToast = msg => {
  VantShowToast(msg)
}

export const showLoadingToast = () => {
  return VantShowLoadingToast({
    duration: 0,
    message: '加载中...',
    forbidClick: true
  })
}
