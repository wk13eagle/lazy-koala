// 验证手机号
export function izMobile(mobile) {
  return /^1\d{10}$/.test(mobile)
}

// 验证数字验证码
export function izSMS(sms, len = 6) {
  const reg = new RegExp(`^\\d{${len}}$`)
  return reg.test(sms)
}
