// 获取url参数
export function urlParams(key) {
  const urlSearchParams = new URLSearchParams(window.location.search)
  const params = Object.fromEntries(urlSearchParams.entries())
  if (key) {
    return params[key]
  } else {
    return params
  }
}
