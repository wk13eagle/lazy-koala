/**
 * Lazy CountDown
 * 倒计时
 */
export const CountDown = ({timer = 59, onTick = () => {}}) => {
  let timer_ = timer

  return new Promise((resolve, reject) => {
    const countdown_ = () => {
      if (timer_ < 1) {
        resolve('倒计时结束')
      } else {
        onTick(timer_)
      }

      try {
        setTimeout(() => {
          timer_ -= 1
          countdown_()
        }, 1000)
      } catch (e) {
        reject(e)
      }
    }

    countdown_()
  })
}
