/**
 * Lazy AES
 * 支持 base64/hex
 */
import CryptoAES from 'crypto-js/aes'
import Utf8 from 'crypto-js/enc-utf8'
import ECB from 'crypto-js/mode-ecb'
import Pkcs7 from 'crypto-js/pad-pkcs7'
import EncUtf8 from 'crypto-js/enc-utf8'
import EncHex from 'crypto-js/enc-hex'

// AES加密
export function AES(text, key, type = 'base64') {
  const encrypted = CryptoAES.encrypt(
    text,
    Utf8.parse(key),
    {
      mode: ECB,
      padding: Pkcs7
    }
  )

  if (type === 'base64') {
    return encrypted.toString() // base64
  }

  if (type === 'hex') {
    return encrypted.ciphertext.toString(EncHex) // 16进制
  }

  return text
}

// AES解密
export function DAES(code, key, type = 'base64') {
  let decrypted
  if (type === 'hex') {
    decrypted = CryptoAES.decrypt(
      { ciphertext: EncHex.parse(code) },
      Utf8.parse(key),
      {
        mode: ECB,
        padding: Pkcs7
      }
    )
  } else {
    decrypted = CryptoAES.decrypt(
      code,
      Utf8.parse(key),
      {
        mode: ECB,
        padding: Pkcs7
      }
    )
  }

  return decrypted.toString(EncUtf8)
}
