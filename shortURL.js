function createShortURL() {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const number = '0123456789'
  const allWord = [...lowerCaseLetters, ...upperCaseLetters, ...number]
  let result = ''
  for (let i = 0; i < 5; i++) {
    result += allWord[Math.floor(Math.random() * allWord.length)]
  }
  return result
}
module.exports = createShortURL