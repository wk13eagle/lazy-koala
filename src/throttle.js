export const createThrottle = (func, delay = 1000) => {
  let timer = null
  return function(...args) {
    if (!timer) {
      func.apply(this, args)
      timer = setTimeout(() => {
        timer = null
      }, delay)
    }
  }
}
