export function clipboard(text) {
  return new Promise((resolve, reject) => {
    if (navigator.clipboard) {
      // 使用 Clipboard API
      navigator.clipboard.writeText(text).then(() => {
        resolve('Text copied to clipboard: ' + text)
      }).catch(err => {
        reject('Failed to copy text: ' + err)
      })
    } else {
      // 兼容旧浏览器
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'absolute'
      textArea.style.left = '-9999px'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        const successful = document.execCommand('copy')
        if (successful) {
          resolve('Text copied to clipboard: ' + text)
        } else {
          reject('Failed to copy text')
        }
      } catch (err) {
        reject('Failed to copy text: ' + err)
      }
      document.body.removeChild(textArea)
    }
  })
}

