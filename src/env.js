const ua = navigator.userAgent.toLowerCase()

// 手机环境
export function inMobile() {
  return ua.includes('iphone') || ua.includes('android')
}

// 微信环境
export function inWX() {
  return ua.includes('micromessenger')
}

// 支付宝环境
export function inZFB() {
  return ua.includes('alipay')
}

// 移动集团app环境
export function inCMCC() {
  return ua.includes('leadeon')
}
