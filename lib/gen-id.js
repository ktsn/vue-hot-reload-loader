const idRegistory = Object.create(null)
let uid = 0

module.exports = filePath => {
  return idRegistory[filePath] || (idRegistory[filePath] = ++uid)
}
