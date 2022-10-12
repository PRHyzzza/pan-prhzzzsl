export function randomString(length = 8) {
  const result = ref<string>('')
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let i = length; i > 0; --i) result.value += chars[Math.floor(Math.random() * chars.length)]
  return result
}
