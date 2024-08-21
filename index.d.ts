import type { AxiosResponse, AxiosInstance } from 'axios'

type GlobalAjaxConfig = {
  loading?: boolean // 是否启动全局loading
  failMsg?: boolean // 接口不为成功编码是否弹出失败提示
  failFn?: boolean // 全局失败逻辑是否启动
  errMsg?: boolean // 接口发生错误是否弹出错误提示
  errFn?: boolean // 全局错误处理是否启动
  query?: Record<string, unknown> // url请求参数, 某些奇怪的post接口需要从query取一部分数据
  headers?: Record<string, unknown> // headers
}

export type AjaxConfig = GlobalAjaxConfig & {
  id?: string // 请求id
}

export declare function Get(
  url?: string,
  params?: Record<string, unknown>,
  config?: AjaxConfig
): Promise<AxiosResponse>

export declare function Post(
  url?: string,
  params?: Record<string, unknown>,
  config?: AjaxConfig
): Promise<AxiosResponse>

export declare function lazyAxios(): AxiosInstance

interface ResponseConfig {
  status?: Array<number | string> // 成功状态，可以是数字或字符串
  codeKeys?: Array<string> // 状态key名，字符串数组
  msgKeys?: Array<string> // 状态描述key名，字符串数组
}

interface Options {
  // 等同于axios的baseURL
  baseURL?: string

  // 等同于axios的timeout
  timeout?: number

  // 默认配置
  config?: GlobalAjaxConfig

  // loading启动
  loadingStart?: () => void

  // loading结束
  loadingEnd?: () => void

  // 错误提示
  errToast?: (msg: string) => void

  // 请求配置
  requestConfig?: (config: any) => any

  // 返回配置
  responseConfig?: ResponseConfig

  // 失败统一处理
  ajaxFail?: (res: any) => void

  // 错误统一处理
  ajaxError?: (err: any) => void
}

export declare function init(
  options?: Options
): void
