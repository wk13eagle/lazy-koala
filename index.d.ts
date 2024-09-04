import type { AxiosResponse, AxiosInstance } from 'axios'

type GlobalAjaxConfig = {
  /**
   * loading - 是否启动全局loading
   */
  loading?: boolean

  /**
   * failMsg - 接口不为成功编码是否弹出失败提示
   */
  failMsg?: boolean

  /**
   * failFn - 全局失败逻辑是否启动
   */
  failFn?: boolean

  /**
   * errMsg - 接口发生错误是否弹出错误提示
   */
  errMsg?: boolean

  /**
   * errFn - 全局错误处理是否启动
   */
  errFn?: boolean

  /**
   * query - 会追加到url请求参数
   */
  query?: Record<string, unknown>

  /**
   * headers - 会追加到headers中
   */
  headers?: Record<string, unknown>
}

export type AjaxConfig = GlobalAjaxConfig & {
  /**
   * id - 请求id, 默认为url, 用来防并发, 如果同一接口同时发起多个, 指定不同id
   */
  id?: string
}

/**
 * Lazy Get 请求
 * @param url - 请求地址
 * @param params - 请求参数
 * @param config - 可选, 请求配置
 * @param config.id - 请求id
 * @param config.loading - 是否启动loading
 * @param config.failMsg - 接口不为成功编码时是否弹出失败提示
 * @param config.failFn - 全局失败逻辑是否启动
 * @param config.errMsg - 接口发生错误时是否弹出错误提示
 * @param config.errFn - 全局错误处理是否启动
 * @param config.query - url 请求参数
 * @param config.headers - 请求头信息
 * @returns Promise<AxiosResponse>
 */
export declare function Get(
  url: string,
  params?: Record<string, unknown>,
  config?: AjaxConfig
): Promise<AxiosResponse>

/**
 * Lazy Post 请求
 * @param url - 请求地址
 * @param params - 请求参数
 * @param config - 可选, 请求配置
 * @param config.id - 请求id
 * @param config.loading - 是否启动loading
 * @param config.failMsg - 接口不为成功编码时是否弹出失败提示
 * @param config.failFn - 全局失败逻辑是否启动
 * @param config.errMsg - 接口发生错误时是否弹出错误提示
 * @param config.errFn - 全局错误处理是否启动
 * @param config.query - url 请求参数
 * @param config.headers - 请求头信息
 * @returns Promise<AxiosResponse>
 */
export declare function Post(
  url: string,
  params?: Record<string, unknown>,
  config?: AjaxConfig
): Promise<AxiosResponse>

/**
 * Lazy Axios
 * @returns AxiosInstance
 */
export declare function lazyAxios(): AxiosInstance

interface ResponseConfig {
  /**
   * status - 成功状态编码
   */
  status?: Array<number | string>

  /**
   * codeKeys - 状态key名
   */
  codeKeys?: Array<string>

  /**
   * msgKeys - 状态描述key名
   */
  msgKeys?: Array<string>
}

interface InitOptions {
  /**
   * baseURL - 等同于axios的baseURL
   */
  baseURL?: string

  /**
   * timeout - 等同于axios的timeout
   */
  timeout?: number

  /**
   * config - 默认配置
   */
  config?: GlobalAjaxConfig

  /**
   * loadingStart - loading启动
   */
  loadingStart?: () => void

  /**
   * loadingEnd - loading结束
   */
  loadingEnd?: () => void

  /**
   * errToast - 错误提示
   */
  errToast?: (msg: string) => void

  /**
   * requestConfig - 请求配置
   */
  requestConfig?: (config: any) => any

  /**
   * responseConfig - 返回配置
   */
  responseConfig?: ResponseConfig


  /**
   * ajaxFail - 失败统一处理
   */
  ajaxFail?: (res: any) => void

  /**
   * ajaxError - 错误统一处理
   */
  ajaxError?: (err: any) => void
}

/**
 * Lazy Koala 初始化
 * @param baseURL - 等同于axios的baseURL
 * @param timeout - 等同于axios的timeout
 * @param config - 默认配置
 * @param loadingStart - loading启动
 * @param loadingStart - loading结束
 * @param errToast - 错误提示
 * @param requestConfig - 请求配置
 * @param responseConfig - 请求配置
 * @param ajaxFail - 请求配置
 * @param ajaxError - 请求配置
 */
export declare function init(
  options?: InitOptions
): void
