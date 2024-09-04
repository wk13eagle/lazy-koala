/**
 * Lazy Random
 * 1. 生成区间随机数
 * 2. 从集合随机抽取元素
 */
export const Random = {
  // 生成指定区间随机整数
  gen(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },

  // 抽取元素
  ext(array = []) {
    if (array.length < 1) {
      return null
    }
    const randomIndex = Math.floor(Math.random() * array.length)
    return {
      name: array[randomIndex],
      index: randomIndex
    }
  }
}
