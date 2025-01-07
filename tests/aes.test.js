import { AES, DAES } from '../src/aes'

// 12345678901 加密后：MQxTXNAfcyQYWUWZsJmBsg==
test('AES 加密', () => {
  expect(AES('12345678901', '9e5702ead4d643fd')).toBe('MQxTXNAfcyQYWUWZsJmBsg==')
})

test('DAES 解密', () => {
  expect(DAES('MQxTXNAfcyQYWUWZsJmBsg==', '9e5702ead4d643fd')).toBe('12345678901')
})
