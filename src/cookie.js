/**
 * Lazy Cookie
 * 支持 增/删/改/查
 */
export const Cookie = {
  // 设置cookie, 支持过期时间(以毫秒为单位), 默认永久有效
  setItem(name, value, milliseconds) {
    let expires = ''

    if (milliseconds) {
      const date = new Date()
      date.setTime(date.getTime() + milliseconds)
      expires = '; expires=' + date.toGMTString()
    } else {
      expires = '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
    }

    document.cookie = `${name}=${value || ''}${expires}; path=/`
  },

  // 获取cookie
  getItem(name) {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';').map(cookie => cookie.trim())
    const foundCookie = cookies.find(cookie => cookie.startsWith(nameEQ))

    return foundCookie ? foundCookie.substring(nameEQ.length) : null
  },

  // 删除cookie
  removeItem(name) {
    document.cookie = `${name}=; Max-Age=-99999999; path=/`
  },

  // 返回所有cookie
  all() {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim())
    const cookieObject = {}

    cookies.forEach(cookie => {
      const [key, value] = cookie.split('=')
      cookieObject[key] = value
    })

    return cookieObject
  },

  clear() {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim())
    cookies.forEach(cookie => {
      const [name] = cookie.split('=');
      document.cookie = `${name}=; Max-Age=-99999999; path=/`
    })
  }
}
