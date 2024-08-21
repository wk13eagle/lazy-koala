export declare function AES(
  text: string,
  key: string,
  type?: 'base64' | 'hex'
): string
export declare function DAES(
  code: string,
  key: string,
  type?: 'base64' | 'hex'
): string

export declare function UUID(): string

export declare function inMobile(): boolean
export declare function inWX(): boolean
export declare function inZFB(): boolean
export declare function inCMCC(): boolean

export declare function formatTime(
  date: Date,
  format?: string
): string
export declare function formatPrice(
  amount: number | string,
): string

export declare function saveFile(
  fileData: ArrayBuffer | Blob,
  fileName: string
): void

export declare function urlParams(
  key?: string,
): string | Object


export declare function izMobile(
  mobile: string
): boolean
export declare function izSMS(
  sms: string,
  len?: number
): boolean
