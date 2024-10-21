/**
 * Lazy SaveFile
 * 保存文件
 */
export function SaveFile(fileData, fileName) {
  const blob = new Blob([fileData])
  const elink = document.createElement('a')
  elink.download = decodeURIComponent(fileName)
  elink.style.display = 'none'
  elink.href = URL.createObjectURL(blob)
  document.body.appendChild(elink)
  elink.click()
  URL.revokeObjectURL(elink.href)
  document.body.removeChild(elink)
}
