# LazyKoala 懒考拉

### 使用方式

LazyKoala.init(options)

```javascript
// main.js/ts
import LazyKoala from 'lazy-koala'
LazyKoala.init()

// api.js
import { Get } from 'lazy-koala'

export const getList = (
  params,config
) => Get('http://xxx.com/queryList', params, config)

// api.ts
import { Post } from 'lazy-koala'
import type { ajaxConfig } from 'lazy-koala'

export const postList = (
  params?: Record<string, unknown>,
  config?: ajaxConfig
) => Post('http://xxx.com/queryList', params, config)
```

options为LazyKoala初始化配置，默认options：

```javascript
options = {
  // 等同于axios的baseURL
  baseURL: '',

  // 等同于axios的timeout
  timeout: 60 * 1000,

  // loading启动
  loadingStart() {
    console.log('loading start')
  },

  // loading结束
  loadingEnd() {
    console.log('loading end')
  },

  // 错误提示
  errToast(msg) {
    alert(msg)
  },

  // 请求配置
  requestConfig(config) {
    // axios.interceptors.request.use中的config
    return config
  },

  // 返回配置
  responseConfig: {
    status: [0, '0', '1', '0000', '000000', 'ok', 'success'], // 成功状态
    codeKeys: ['errno', 'code', 'retcode', 'respCode', 'resultCode'], // 状态key名
    msgKeys: ['msg', 'message', 'desc', 'errmsg', 'respMsg'] // 状态描述key名
  },

  // 失败统一处理, 返回code不为成功状态
  failFn() {},

  // 错误统一处理, 程序error
  errFn() {}
}
```

params 为 object，请求数据

config为请求配置，默认config：
```javascript
config = {
  id: null, // 请求id, 默认为方法名称, 防并发, 如果某个接口需要同时发起多个请求, 手动指定唯一id
  loading: true, // 是否启动全局loading
  failMsg: true, // 接口不为成功编码是否弹出失败提示
  failFn: true, // 全局失败逻辑是否启动
  errMsg: true, // 接口发生错误是否弹出错误提示
  errFn: true, // 全局错误处理是否启动
  query: {}, // url请求参数, 某些奇怪的post接口需要从query取一部分数据
  headers: {} // 局部headers, 此header会补全/覆盖全局设置, 拥有最高权重
}
```

