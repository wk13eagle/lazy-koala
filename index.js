import axios from 'axios'
import { Loading } from './src/loading'

let lazyKoalaInstance = null

class LazyKoala {
  constructor(options = {}) {
    if (lazyKoalaInstance) {
      return lazyKoalaInstance
    }
    this.options = Object.assign({
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
        return config
      },

      // 返回配置
      responseConfig: {
        status: [0, '0', '1', '0000', '000000', 'ok', 'success'], // 成功状态
        codeKeys: ['errno', 'code', 'retcode', 'respCode', 'resultCode'], // 状态key名
        msgKeys: ['msg', 'message', 'desc', 'errmsg', 'respMsg'] // 状态描述key名
      },

      // 失败统一处理
      failFn() {},

      // 错误统一处理
      errFn() {}
    }, options)

    this.repeatRequest = [] // 重复请求

    this.axios = axios.create({
      baseURL: this.options.baseURL,
      timeout: this.timeout
    })

    this.loading = new Loading({
      loadingStart: this.options.loadingStart,
      loadingEnd: this.options.loadingEnd
    })

    this.init()

    lazyKoalaInstance = this
  }

  init() {
    const that = this

    // 请求拦截器
    this.axios.interceptors.request.use(
      config => {
        const config_  = config.config_ || {}
        const ajaxId_ = config_?.id

        if (ajaxId_) {
          if (that.loading.hasSameRequest(ajaxId_)) {
            // 存在相同请求, 防并发
            that.repeatRequest.push(ajaxId_)
            config.cancelToken = new axios.CancelToken(c => c())
          }
        }

        config = that.options.requestConfig(config) || config
        config.headers = Object.assign(config.headers, config_.headers || {})

        if (config_?.loading && ajaxId_) {
          that.loading.start(ajaxId_)
        }
        return config
      },
      error => {
        throw new Error(error)
      }
    )

    // 响应拦截器
    this.axios.interceptors.response.use(
      response => {
        const config_ = response.config ? response.config.config_ : {}
        if (config_?.loading && config_?.id) {
          that.loading.end(config_.id)
        }

        const { data: res } = response
        const status = this.options.responseConfig.status
        const codeKeys = this.options.responseConfig.codeKeys
        const msgKeys = this.options.responseConfig.msgKeys

        const [code] = codeKeys.filter(item => res[item] !== undefined)
        const [msg] = msgKeys.filter(item => res[item] !== undefined)

        if (status.includes(res[code])) {
          return response.data
        } else {
          if (config_?.failMsg) {
            that.options.errToast(res[msg])
          }

          if (config_?.failFn) {
            this.options.failFn(response)
          }

          return Promise.reject(response.data)
        }
      },
      error => {
        error =  error || {}
        if (error.name === 'CanceledError') {
          // 并发请求
          throw new Error(`拦截重复请求\n${JSON.stringify(that.repeatRequest, null, 2)}`)
        } else {
          // 其它按AxiosError

          const config_ = error.config ? error.config.config_ : {}

          if (config_?.loading) {
            that.loading.end(config_.id)
          }

          if (config_?.errMsg) {
            that.options.errToast('请稍后尝试～')
          }

          if (config_?.errFn) {
            this.options.errFn(error)
          }

          throw new Error(error)
        }
      }
    )
  }

  request(url, params, config, type) {
    const ajaxDefaultConfig = {
      id: null, // 请求id
      loading: true, // 是否启动全局loading
      failMsg: true, // 接口不为成功编码是否弹出失败提示
      failFn: true, // 全局失败逻辑是否启动
      errMsg: true, // 接口发生错误是否弹出错误提示
      errFn: true, // 全局错误处理是否启动
      query: {}, // url请求参数, 某些奇怪的post接口需要从query取一部分数据
      headers: {} // 局部headers, 此header会补全/覆盖全局设置, 拥有最高权重
    }

    const config_ = Object.assign(ajaxDefaultConfig, config)
    config_.id = config_.id || url
    const query_ = []

    for (const key in config_.query) {
      query_.push(`${key}=${config_.query[key]}`)
    }

    const url_ = url + (query_.length > 0 ? `?${query_.join('&')}` : '')

    if (type.toUpperCase() === 'GET') {
      return this.axios.get(url_, {
        params,
        config_
      })
    }

    if (type.toUpperCase() === 'POST') {
      return this.axios.post(url_, params, {
        config_
      })
    }
  }

  get(url, params, config) {
    return this.request(url, params, config, 'GET')
  }

  post(url, params, config) {
    return this.request(url, params, config, 'POST')
  }
}

/**
 * 对外暴露接口
 */
function Get(url, params, config) {
  if (!lazyKoalaInstance) {
    throw new Error('LazyKoala has not been initialized')
  }
  return lazyKoalaInstance.get(url, params, config)
}

function Post(url, params, config) {
  if (!lazyKoalaInstance) {
    throw new Error('LazyKoala has not been initialized')
  }
  return lazyKoalaInstance.post(url, params, config)
}

// TODO: Delete/Put/下载/formdata等

function loadingStart() {
  if (!lazyKoalaInstance) {
    throw new Error('LazyKoala has not been initialized')
  }
  return lazyKoalaInstance.options.loadingStart
}

function loadingEnd() {
  if (!lazyKoalaInstance) {
    throw new Error('LazyKoala has not been initialized')
  }
  return lazyKoalaInstance.options.loadingEnd
}

function lazyAxios() {
  if (!lazyKoalaInstance) {
    throw new Error('LazyKoala has not been initialized')
  }
  return lazyKoalaInstance.axios
}

export { Get, Post, loadingStart, loadingEnd, lazyAxios }

export default {
  init: function(options) {
    new LazyKoala(options)
  }
}
