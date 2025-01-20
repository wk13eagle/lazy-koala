/**
 * Lazy Storage
 */
let storageType = 'session'
let storageComponent = sessionStorage

// 打包数据
const pack = value => {
  return JSON.stringify({
    value,
    from: 'lazyStorage'
  })
}

// 解包数据
const unpack = data => {
  return JSON.parse(data).value
}

// 设置 StorageType
const setStorageType = type => {
  if (type === 'session') {
    storageType = 'session'
    storageComponent = sessionStorage
  }

  if (type === 'local') {
    storageType = 'local'
    storageComponent = localStorage
  }
}

// 保存
const setStorage = (name, value) => {
  storageComponent.setItem(name, pack(value))
}

// 获取
const getStorage_ = name => {
  return storageComponent.getItem(name)
}

// 获取
const getStorage = name => {
  return unpack(getStorage_(name))
}

// 删除
const removeStorage = name => {
  storageComponent.removeItem(name)
}

// 清空
const clearStorage = () => {
  try {
    for (const name in storageComponent) {
      if (typeof storageComponent[name] === 'string') {
        const value = JSON.parse(getStorage_(name))
        if (value.from === 'lazyStorage') {
          removeStorage(name)
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}

export { setStorageType, setStorage, getStorage, removeStorage, clearStorage }
