import { UUID } from '../src/UUID'

test('UUID', () => {
  const uuid = UUID()
  // UUID v4 正则表达式
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  expect(uuid).toMatch(uuidRegex)
})
