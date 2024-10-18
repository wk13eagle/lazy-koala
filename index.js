import axios from 'axios'
import { Loading } from './src/loading'
import { showToast, showLoadingToast } from './src/Toast'

let loadingId = null
let lazyKoalaInstance = null

class LazyKoala {
  constructor(options = {}) {
    if (lazyKoalaInstance) {
      return lazyKoalaInstance
    }

    const defaultOptions = {
      // 等同于axios的baseURL
      baseURL: '',

      // 等同于axios的timeout
      timeout: 60 * 1000,

      config: { // 默认配置
        loading: true, // 是否启动全局loading
        failMsg: true, // 接口不为成功编码是否弹出失败提示
        failFn: true, // 全局失败逻辑是否启动
        errMsg: true, // 接口发生错误是否弹出错误提示
        errFn: true, // 全局错误处理是否启动
        query: {}, // url请求参数, 某些奇怪的post接口需要从query取一部分数据
        headers: {} // 全局headers
      },

      // loading启动
      loadingStart() {
        loadingId = showLoadingToast()
      },

      // loading结束
      loadingEnd() {
        loadingId && loadingId.close()
      },

      // 错误提示
      errToast(msg) {
        showToast(msg)
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
      ajaxFail: null,

      // 错误统一处理
      ajaxError: null
    }

    this.options = Object.assign({}, defaultOptions, options)
    this.options.config = Object.assign({}, defaultOptions.config, options.config || {})
    this.options.responseConfig = Object.assign({}, defaultOptions.responseConfig, options.responseConfig || {})

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
    that.axios.interceptors.request.use(
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
        config.headers = Object.assign({}, that.options.config.headers, config.headers, config_.headers || {})

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
    that.axios.interceptors.response.use(
      response => {
        const config_ = response.config ? response.config.config_ : {}

        // 结束loading
        if (config_?.loading && config_?.id) {
          that.loading.end(config_.id)
        }

        /* 流文件类型 */
        const contentDisposition = response.headers['content-disposition']

        // 接口指定附件形式
        if (contentDisposition && contentDisposition.startsWith('attachment')) {
          return response
        }

        // 接口未指定 通过content-type 判断
        const contentType = response.headers['content-type']

        if (contentType && (
          contentType.startsWith('application/pdf') ||
          contentType.startsWith('application/zip') ||
          contentType.startsWith('application/x-tar') ||
          contentType.startsWith('application/gzip') ||
          contentType.startsWith('application/vnd.ms-excel') ||
          contentType.startsWith('application/csv') ||
          contentType.startsWith('application/octet-stream')
        )) {
          return response
        }

        // 非流文件类型
        const { data } = response

        // 非json格式
        if (!contentType.startsWith('application/json')) {
          return data
        }

        // JSON格式
        const status = that.options.responseConfig.status
        const codeKeys = that.options.responseConfig.codeKeys
        const msgKeys = that.options.responseConfig.msgKeys

        // 针对流文件未正确设置 contentType 的兼容
        if (data instanceof Blob) {
          return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = e => {
              let res
              try {
                res = JSON.parse(e.target.result)
              } catch {
                res = data
              }

              const [code] = codeKeys.filter(item => res[item] !== undefined)
              const [msg] = msgKeys.filter(item => res[item] !== undefined)

              if (status.includes(res[code])) {
                return resolve(res)
              } else {
                if (config_?.failMsg) {
                  that.options.errToast(res[msg])
                }

                if (config_?.failFn && that.options.ajaxFail) {
                  that.options.ajaxFail(response)
                }

                return reject(res)
              }
            }
            reader.readAsText(data)
          })
        } else {
          const [code] = codeKeys.filter(item => data[item] !== undefined)
          const [msg] = msgKeys.filter(item => data[item] !== undefined)

          if (status.includes(data[code])) {
            return data
          } else {
            if (config_?.failMsg) {
              that.options.errToast(data[msg])
            }

            if (config_?.failFn && that.options.ajaxFail) {
              that.options.ajaxFail(response)
            }

            return Promise.reject(data)
          }
        }
      },
      error => {
        error =  error || {}
        if (error.name === 'CanceledError') {
          // 并发请求
          const repeatRequest = JSON.stringify(that.repeatRequest, null, 2)
          that.repeatRequest = [] // 重置统计
          throw new Error(`拦截重复请求\n${ repeatRequest }`)
        } else {
          // 其它按AxiosError
          const config_ = error.config ? error.config.config_ : {}

          if (config_?.loading) {
            that.loading.end(config_.id)
          }

          if (config_?.errMsg) {
            that.options.errToast('请稍后尝试～')
          }

          if (config_?.errFn && that.options.ajaxError) {
            that.options.ajaxError(error)
          }

          throw new Error(error)
        }
      }
    )
  }

  request(url, params, config, method, type) {
    const ajaxDefaultConfig = JSON.parse(JSON.stringify(this.options.config))
    const config_ = Object.assign({}, ajaxDefaultConfig, config)
    config_.query = Object.assign({}, ajaxDefaultConfig.query || {}, config_.query || {})
    config_.id = config_.id || url
    const urlParams = new URLSearchParams(url.split('?')[1] || '')

    Object.keys(config_.query || {}).forEach(key => {
      urlParams.append(key, config_.query[key])
    })

    if (method.toUpperCase() === 'GET') {
      Object.keys(params || {}).forEach(key => {
        urlParams.append(key, params[key])
      })
    }

    let url_ = url.split('?')[0]

    const query_ = urlParams.toString()
    if (query_) {
      url_ = url_ + '?' + query_
    }

    if (type === 'upload') {
      return this.axios.request({
        url: url_,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        method,
        data: params,
        config_
      })
    }

    if (type === 'download') {
      return this.axios.request({
        url: url_,
        method,
        responseType: 'blob',
        data: params,
        config_
      })
    }

    if (method.toUpperCase() === 'GET') {
      return this.axios.get(url_, {
        config_
      })
    }

    if (method.toUpperCase() === 'POST') {
      return this.axios.post(url_, params, {
        config_
      })
    }
  }
}

/**
 * 对外暴露接口
 */

function checkLazyKoalaInstance() {
  if (!lazyKoalaInstance) {
    throw new Error('LazyKoala has not been initialized')
  }
}

function Get(url, params, config) {
  checkLazyKoalaInstance()
  return lazyKoalaInstance.request(url, params, config, 'GET')
}

function Post(url, params, config) {
  checkLazyKoalaInstance()
  return lazyKoalaInstance.request(url, params, config, 'POST')
}

function uploadRequest(url, params, config, method = 'POST') {
  checkLazyKoalaInstance()
  return lazyKoalaInstance.request(url, params, config, method, 'upload')
}

function downloadRequest(url, params, config, method = 'POST') {
  checkLazyKoalaInstance()
  return lazyKoalaInstance.request(url, params, config, method, 'download')
}

function lazyAxios() {
  checkLazyKoalaInstance()
  return lazyKoalaInstance.axios
}

function createLazyKoala(options) {
  new LazyKoala(options)
}

export {
  Get,
  Post,
  uploadRequest,
  downloadRequest,
  lazyAxios,
  createLazyKoala
}
