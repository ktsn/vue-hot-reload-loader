const path = require('path')
const fs = require('fs')
const loader = require('../../lib/index')

function loadCode(data) {
  let callbackAnswer

  loader.call({
    resourcePath: '/path/to/test.html',
    options: {},
    callback: (err, contents, sourcemap) => {
      callbackAnswer = { err, contents, sourcemap }
    }
  }, data)

  return callbackAnswer
}

function test (name) {
  const src = fs.readFileSync(path.resolve(__dirname, '../fixtures', name), 'utf8')
  const expected = fs.readFileSync(path.resolve(__dirname, '../expects', name), 'utf8')

  it(name, () => {
    const callbackAnswer = loadCode(src)
    expect(callbackAnswer.contents.replace(/if \(module\.hot\)[\s\S]*$/, '').trim()).toBe(expected.trim())
  })
}

describe('vue-hot-reload-loader', () => {
  fs.readdirSync(path.resolve(__dirname, '../fixtures')).forEach(file => {
    test(path.basename(file))
  })
})
