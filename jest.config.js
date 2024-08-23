export default {
  transform: {},
  testMatch: ['**/tests/**/*.test.js'],  // 匹配 `tests` 目录下的所有 `.test.js` 文件
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],  // 忽略 `node_modules` 和 `dist` 目录
  moduleFileExtensions: ['js', 'json', 'mjs'], // 支持的文件扩展名
  testEnvironment: 'jest-environment-jsdom'
}
