# LazyKoala 懒考拉

### 1. 使用方式

createLazyKoala(options)

options为LazyKoala初始化配置，默认options：

```javascript
options = {
  // 等同于axios的baseURL
  baseURL: '',

  // 等同于axios的timeout
  timeout: 60 * 1000,

  // 默认配置
  config: {
    loading: true, // 是否启动全局loading
    failMsg: true, // 接口不为成功编码是否弹出失败提示
    failFn: true,  // 全局失败逻辑是否启动
    errMsg: true,  // 接口发生错误是否弹出错误提示
    errFn: true,   // 全局错误处理是否启动
    query: {},     // url请求参数, 某些奇怪的post接口需要从query取一部分数据, 优先级: 全局query < 局部query
    headers: {}    // 全局headers 优先级: 全局headers < requestConfig中设置的headers < 局部headers
  },

  // loading启动
  loadingStart() {
    // 默认使用vant 的 showLoadingToast
  },

  // loading结束
  loadingEnd() {
    // 默认使用vant 的 showLoadingToast
  },

  // 错误提示
  errToast(msg) {
    // 默认使用vant 的 showToast
  },

  // 请求配置
  requestConfig(config) {
    // axios.interceptors.request.use中的config
    return config
  },

  // 返回配置
  responseConfig: {
    status:   [0, '0', '1', '0000', '000000', 'ok', 'success'],       // 成功状态
    codeKeys: ['errno', 'code', 'retcode', 'respCode', 'resultCode'], // 状态key名
    msgKeys:  ['msg', 'message', 'desc', 'errmsg', 'respMsg']         // 状态描述key名
  },

  // 失败统一处理, 返回code不为成功状态 ajaxFail: res => {}
  ajaxFail: null,

  // 错误统一处理, 程序error ajaxError: err => {}
  ajaxError: null
}
```

### 2. 示例

```javascript
// 安装依赖
// npm install axios lazy-koala --save
// pnpm add axios lazy-koala

// main.js/ts
import { createLazyKoala } from 'lazy-koala'
createLazyKoala()
```

* 使用javascript
```javascript
// api.js
import { Get, Post, downloadRequest, uploadRequest } from 'lazy-koala'

// get
export const getList = (
  params, config
) => Get('http://xxx.com/queryList', params, config)

// post
export const getList = (
  params, config
) => Post('http://xxx.com/queryList', params, config)

// upload
export const addFile = (
  params, config
) => uploadRequest('http://xxx.com/addFile', params, config)

// <input type="file" @change="upload" />
function upload(e) {
  const formData = new FormData()
  formData.append('file', e.target.files[0])

  addFile(formData).then(res => {
    console.log(res)
  })
}

// download
export const listExport = (
  params, config
) => downloadRequest('http://xxx.com/excelList', params, config)

listExport().then(res => {
  const fileData = res.data
  const fileName = res.headers['content-disposition'].split('filename=')[1]
  // SaveFile(fileData, fileName) // 保存文件
})
```

* 使用typescript
```javascript
// api.ts
import { Get, Post, downloadRequest, uploadRequest } from 'lazy-koala'
import type { AjaxConfig } from 'lazy-koala'

// get
export const getList = (
  params?: Record<string, unknown>,
  config?: AjaxConfig
) => Get('http://xxx.com/queryList', params, config)

// post
export const getList = (
  params?: Record<string, unknown>,
  config?: AjaxConfig
) => Post('http://xxx.com/queryList', params, config)

// upload
export const addFile = (
  params: FormData,
  config?: AjaxConfig
) => uploadRequest('http://xxx.com/addFile', params, config)

// <input type="file" @change="upload" />
function upload(e: any) {
  const formData = new FormData()
  formData.append('file', e.target.files[0])

  addFile(formData).then(res => {
    console.log(res)
  })
}

// download
export const listExport = (
  params?: Record<string, unknown>,
  config?: AjaxConfig
) => downloadRequest('http://xxx.com/excelList', params, config)

listExport().then(res => {
  const fileData = res.data
  const fileName = res.headers['content-disposition'].split('filename=')[1]
  // SaveFile(fileData, fileName) // 保存文件
})
```


params 为 object，请求数据

config为请求配置，默认config：
```javascript
config = {
  id: null,      // 请求id, 默认为方法名称, 防并发, 如果某个接口需要同时发起多个请求, 手动指定唯一id
  loading: true, // 是否启动全局loading
  failMsg: true, // 接口不为成功编码是否弹出失败提示
  failFn: true,  // 全局失败逻辑是否启动
  errMsg: true,  // 接口发生错误是否弹出错误提示
  errFn: true,   // 全局错误处理是否启动
  query: {},     // url请求参数, 某些奇怪的post接口需要从query取一部分数据, 此query会补全/覆盖全局设置, 拥有最高权重
  headers: {}    // 局部headers, 此header会补全/覆盖全局设置, 拥有最高权重
}

downloadRequest 和 uploadRequest 支持第四个参数，值为'GET' 或 'POST'， 默认'POST'
```

### 3. Leaf 工具包

为方便开发，尽量少引用三方包，减少体积

```javascript
import {
  AES, DAES,
  UUID,
  inMobile, inWX, inZFB, inCMCC,
  FormatTime, FormatPrice,
  SaveFile,
  SearchParams, HashParams, UrlParams,
  izMobile, izSMS,
  CountDown,
  showToast, showLoadingToast, // 使用vant组件
  setStorageType, setStorage, getStorage, removeStorage, clearStorage,
  createThrottle
} from 'lazy-koala/leaf'
```

* ##### AES / DAES （加解密）
```javascript
/**
 * AES加密
 * text(必填): 要加密的字符串 - string
 * key(必填): 密钥 - string
 * type(可选): base64(默认) | hex
 */
AES(text, key, type)

/**
 * AES解密
 * code(必填): 要解密的字符串 - string
 * key(必填): 密钥 - string
 * type(可选): base64(默认) | hex
 */
DAES(code, key, type)
```

* ##### UUID （生成唯一ID）
```javascript
/**
 * 生成UUID  8-4-4-4-12 格式
 * 返回 xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 */
const uuid = UUID()
```

* ##### inMobile / inWX / inZFB / inCMCC （判断环境）
```javascript
/**
 * 判断是否在手机环境
 * 返回 true/false
 */
const inMobile_ = inMobile()

/**
 * 判断是否在微信环境
 * 返回 true/false
 */
const inWX_ = inWX()

/**
 * 判断是否在支付宝环境
 * 返回 true/false
 */
const inZFB_ = inZFB()

/**
 * 判断是否移动集团app环境
 * 返回 true/false
 */
const inCMCC_ = inCMCC()
```

* ##### FormatTime / FormatPrice （格式化数据）
```javascript
/**
 * 格式化时间
 * date(必填): 日期 - Date
 * format(可选): 格式化格式 - string, 默认: 'YYYY-MM-DD HH:mm:ss'
 * 返回 2023-08-19 12:00:00
 */
FormatTime(date, format)

/**
 * 格式化金额
 * amount(必填): 金额 - string | number
 * 返回 10,000.00
 */
FormatPrice(amount)
```

* ##### SaveFile （保存文件）
```javascript
/**
 * 格式化金额
 * fileData(必填): 文件数据 - ArrayBuffer | Blob
 * fileName(必填): 文件名称 - string
 */
SaveFile(fileData, fileName)
```

* ##### SearchParams （URL中search的参数）
```javascript
/**
 * 获取url中search的参数
 * key(可选): 参数名 - string
 * 如果填key返回单个, 类型为string, 不填返回全部, 类型为object
 */
SearchParams() // {}
SearchParams(key) // string
```

* ##### HashParams （URL中hash的参数）
```javascript
/**
 * 获取url中hash的参数
 * key(可选): 参数名 - string
 * 如果填key返回单个, 类型为string, 不填返回全部, 类型为object
 */
HashParams() // {}
HashParams(key) // string
```

* ##### UrlParams （URL参数, 包括search和hash）
```javascript
/**
 * 获取url参数
 * key(可选): 参数名 - string
 * 如果填key返回单个, 类型为string, 优先search中的, 不填返回全部, 类型为object
 */
UrlParams() // { search: {}, hash: {}}
UrlParams(key) // string
```

* ##### izMobile / izSMS （校验）
```javascript
/**
 * 校验手机号
 * mobile(必填): 手机号 - string
 * 返回 true/false
 */
izMobile(mobile)

/**
 * 校验验证码
 * sms(必填): 验证码 - string
 * len(可选): 验证码长度 - number, 默认6
 * 返回 true/false
 */
izSMS(sms, len)
```

* ##### CountDown（倒计时）
```javascript
/**
 * 倒计时
 * options - object
 * options.timer(可选): 计时器 - number
 * options.onTick(可选): 倒计时回调 - function
 * 返回 Promise
 */
CountDown({
  timer: 59,
  onTick: remainingTime => {}
})
```

* ##### Toast（提示）
```javascript
Toast('hello') // 提示

// loading
const loadintId = showLoadingToast()
setTimeout(() => {
  loadintId.close()
}, 2000)
```


* ##### Storage（缓存）
```javascript
setStorageType('local') // 使用localStorage

setStorage('a', 123) // 存储a, 值为数字123
getStorage('a') // 读取a
removeStorage('a') // 删除a
clearStorage() // 清空lazy Storage 创建的数据
```


* ##### Throttle（节流）
```javascript
const log = v => {
  console.log(v)
}

const logThrottle = createThrottle(log, 10 * 1000)

setInterval(() => {
  logThrottle('10秒输出一次')
}, 1000)

```
