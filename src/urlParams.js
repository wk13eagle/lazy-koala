// 通用的参数解析函数
function getParams(paramString, key = '') {
  const paramsObj = new URLSearchParams(paramString)
  const params = Object.fromEntries(paramsObj.entries())
  if (key) {
    return params[key] || ''
  } else {
    return params
  }
}

// 获取 search 参数
export function searchParams(key = '') {
  return getParams(window.location.search, key)
}

// 获取 hash 参数
export function hashParams(key = '') {
  const hash = window.location.hash || ''
  return getParams(hash.split('?')[1] || '', key)
}

// 获取url参数
export function urlParams(key = '') {
  if (key) {
    return searchParams(key) || hashParams(key)
  }
  return {
    search: searchParams(),
    hash: hashParams()
  }
}
