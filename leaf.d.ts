/**
 * Lazy AES加密
 * 仅支持 'base64' | 'hex'
 * @param text - 待加密文本
 * @param key - 密钥
 * @param type - 可选, 加密方式, 默认 'base64'
 * @returns 加密后字符串
 */
export declare function AES(
  text: string,
  key: string,
  type?: 'base64' | 'hex'
): string

/**
 * Lazy AES解密
 * 仅支持 'base64' | 'hex'
 * @param code - 加密后字符串
 * @param key - 密钥
 * @param type - 可选, 加密方式, 默认 'base64'
 * @returns 解密后文本
 */
export declare function DAES(
  code: string,
  key: string,
  type?: 'base64' | 'hex'
): string


/**
 * Lazy UUID 生成唯一ID
 * @returns xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 */
export declare function UUID(): string


/**
 * Lazy Clipboard 复制到剪贴板
 * @param text - 文本内容
 * @returns Promise
 */
export declare function Clipboard(
  text: string
): Promise<string>


/**
 * Lazy Cookie
 * 为方便使用, 默认永久有效，如需会话关闭失效, 设置1000或更小数字
 */
export declare const Cookie: {
  /**
   * 设置 cookie
   * @param name - cookie 的名称
   * @param value - cookie 的值
   * @param milliseconds - 可选, cookie 过期时间（以毫秒为单位）, 默认永久有效
   */
  setItem(name: string, value: string, milliseconds?: number): void

  /**
   * 获取 cookie 的值
   * @param name - cookie 的名称
   * @returns cookie 的值，如果不存在则返回 null
   */
  getItem(name: string): string | null

  /**
   * 删除指定名称的 cookie
   * @param name - cookie 的名称
   */
  removeItem(name: string): void

  /**
   * 返回所有 cookie
   * @returns 包含所有 cookies 的对象，其中键是 cookie 名称，值是 cookie 的值
   */
  all(): Record<string, string>

  /**
   * 清空所有 cookie
   */
  clear(): void
}


/**
 * Lazy inMobile 是否在手机环境
 * @returns boolean
 */
export declare function inMobile(): boolean

/**
 * Lazy inWX 是否在微信环境
 * @returns boolean
 */
export declare function inWX(): boolean

/**
 * Lazy inZFB 是否在支付宝环境
 * @returns boolean
 */
export declare function inZFB(): boolean

/**
 * Lazy inCMCC 是否在移动app环境
 * @returns boolean
 */
export declare function inCMCC(): boolean


/**
 * Lazy FormatTime 格式化时间
 * @param date - 待格式化Date
 * @param format - 可选, 默认 'YYYY-MM-DD HH:mm:ss'
 * @returns 2024-08-20 12:00:00
 */
export declare function FormatTime(
  date: Date,
  format?: string
): string

/**
 * Lazy FormatPrice 格式化金额
 * @param amount - 待格式化金额
 * @returns 10,000.00
 */
export declare function FormatPrice(
  amount: number | string,
): string


/**
 * Lazy Random 随机数
 */
export declare const Random: {
  /**
   * 生成指定区间的随机整数
   * @param min - 随机数的最小值（包含）
   * @param max - 随机数的最大值（包含）
   * @returns 在 min 和 max 之间的随机整数
   */
  gen(min: number, max: number): number

  /**
   * 从数组中随机抽取一个元素
   * @param array - 要抽取元素的数组
   * @returns 一个对象，包含随机抽取的元素和其索引
   * @remarks 如果传入的数组为空，返回null
   */
  ext(array?: any[]): {
    name: unknown
    index: number
  } | null
}


/**
 * Lazy SaveFile 保存文件
 * @param fileData - 文件流
 * @param fileName - 文件名称
 */
export declare function SaveFile(
  fileData: ArrayBuffer | Blob,
  fileName: string
): void


/**
 * Lazy SerachParams 获取url参数
 * @param key - 可选, 键名
 * @returns 如果传入 key, 返回对应的 string 值；如果未传入 key，返回包含所有 search 参数的对象
 */
export declare function SearchParams(key?: string): string | Record<string, string>

/**
 * Lazy HashParams 获取url参数
 * @param key - 可选, 键名
 * @returns 如果传入 key, 返回对应的 string 值；如果未传入 key，返回包含所有 hash 参数的对象
 */
export declare function HashParams(key?: string): string | Record<string, string>

/**
 * Lazy UrlParams 获取url参数
 * @param key - 可选, 键名
 * @returns 如果传入 key, 返回 search 或 hash 中对应的 string 值，如果未传入 key 返回一个包含 search 和 hash 参数的对象
 * @remarks 如果传入 key, 优先返回 search 中对应的值，如果 search 中不存在，则返回 hash 中对应的值
 */
export declare function UrlParams(
  key?: string
): string | { search: Record<string, string>, hash: Record<string, string> }


/**
 * Lazy izMobile 判断手机号
 * @param mobile - 手机号
 * @returns boolean
 */
export declare function izMobile(
  mobile: string
): boolean

/**
 * Lazy urlParams 获取url参数
 * @param sms - 验证码
 * @param len - 可选, 长度, 默认 5
 * @returns boolean
 */
export declare function izSMS(
  sms: string,
  len?: number
): boolean


interface CountDownOptions {
  /**
   * timer - 计时器, 单位秒, 默认 59
   */
  timer?: number

  /**
   * onTick - 倒计时回调
   */
  onTick?: (remainingTime: number) => void
}

/**
 * Lazy CountDown 倒计时
 * @param options - 可选参数
 * @returns Promise
 */
declare function CountDown(
  options: CountDownOptions
): Promise<string>


/**
 * Lazy Toast
 * @param msg - 提示文字
 */
declare function showToast(
  msg: string
): void


/**
 * Lazy Loading
 */
declare function showLoadingToast(): { close(): void }


/**
 * Lazy Storage - setStorageType 设置类型
 * @param type - Storage 类型 'session' | 'local'
 */
declare function setStorageType(
  type: 'session' | 'local'
): void


/**
 * Lazy Storage - setStorage 保存
 * @param name - 键名
 * @param value - 值
 */
declare function setStorage(
  name: string,
  value: any
): void


/**
 * Lazy Storage - getStorage 获取
 * @param name - 键名
 */
declare function getStorage(
  name: string
): any


/**
 * Lazy Storage - removeStorage 删除
 * @param name - 键名
 */
declare function removeStorage(
  name: string
): void


/**
 * Lazy Storage - clearStorage 清空
 * @param name - 键名
 */
declare function clearStorage(): void


/**
 * Lazy Throttle 节流
 * @param func - 函数名
 * @param delay - 可选 - 间隔时间, 单位毫秒, 默认1000
 */
declare function createThrottle<T extends (...args: any[]) => any>(func: T, delay?: number): (
 ...args: Parameters<T>
) => void


/**
 * Lazy InputFile 上传文件
 */
interface InputFileOptions {
  /**
   * accept - 文件类型, 仅图片: 'image/*'; 仅视频: 'video/*'; 图片和视频: 'image/*,video/*'
   */
  accept?: string
  /**
   * multiple - 允许多文件上传, 默认false
   */
  multiple?: boolean
  /**
   * capture - 使用摄像头, 默认null, user: 前置摄像头, environment: 后置摄像头
   */
  capture?: 'user' | 'environment' | null
}
declare function InputFile(
  options?: InputFileOptions
): Promise<File | FileList | string>
