export function InputFile(options) {
  options = Object.assign(
    {
      accept: 'image/*', // 仅图片: 'image/*'; 仅视频: 'video/*'; 图片和视频: 'image/*,video/*'
      multiple: false,
      capture: null // user 前置摄像头 environment 后置摄像头
    },
    options
  )

  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = options.accept
    input.multiple = options.multiple
    input.style.width = '0'
    input.style.height = '0'
    input.style.opacity = '0'
    input.style.overflow = 'hidden'

    input.onchange = event => {
      if (event.target.files && event.target.files.length > 0) {
        if (options.multiple) {
          resolve(event.target.files)
        } else {
          resolve(event.target.files[0])
        }
      } else {
        reject('no file')
      }
    }

    // 文件对话框点击取消
    input.oncancel = () => {
      reject('onCancel')
    }

    document.body.appendChild(input)
    input.click()

    // 删除
    const parent = input.parentNode
    if (parent) {
      parent.removeChild(input)
    }
  })
}
