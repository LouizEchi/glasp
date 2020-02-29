export const hash = (input: string): string => {
  return require('crypto')
    .createHmac('sha256', input)
    .update(process.env.APP_SECRET)
    .digest('base64')
}

export const generateKey = (length = 30): string => {
  let result = ''
  const upcases = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowcases = 'abcdefghijklmnopqrstuvwxyz'
  const nums = '0123456789'
  const characters = [upcases, lowcases, nums].join('')
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result
}
