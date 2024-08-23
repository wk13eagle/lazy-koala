// 格式化时间 YYYY-MM-DD HH:mm:ss
export function formatTime(date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (!(date instanceof Date)) {
    throw new TypeError('date must be a Date object')
  }

  const o = {
    'Y+': date.getFullYear(), // 年
    'M+': (date.getMonth() + 1).toString().padStart(2, '0'), // 月
    'D+': date.getDate().toString().padStart(2, '0'), // 日
    'H+': date.getHours().toString().padStart(2, '0'), // 时
    'm+': date.getMinutes().toString().padStart(2, '0'), // 分
    's+': date.getSeconds().toString().padStart(2, '0') // 秒
  }

  // 处理占位符
  let tempFormat = format // 临时变量
  for (let k in o) {
    const reg = new RegExp(k, 'g')
    tempFormat = tempFormat.replace(reg, o[k])
  }

  return tempFormat
}

// 格式化金额  11,111.00
export function formatPrice(amount) {
  const amount_ = Number(amount)
  if (isNaN(amount_)) return amount
  return amount_.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d+)?$)/g, '$&,')
}
