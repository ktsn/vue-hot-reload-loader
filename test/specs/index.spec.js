const path = require('path')
const fs = require('fs')
const DefaultLoader = require('../../lib/index')

class Loader extends DefaultLoader {
  callback(err, contents, sourcemap) { this.callbackAnswer = { err, contents, sourcemap } }
}

function test (name) {
  const src = fs.readFileSync(path.resolve(__dirname, '../fixtures', name), 'utf8')
  const expected = fs.readFileSync(path.resolve(__dirname, '../expects', name), 'utf8')

  it(name, () => {
    const loader = new Loader(src)
    expect(loader.callbackAnswer.contents.replace(/if \(module\.hot\)[\s\S]*$/, '').trim()).toBe(expected.trim())
  })
}

describe('vue-hot-reload-loader', () => {
  fs.readdirSync(path.resolve(__dirname, '../fixtures')).forEach(file => {
    test(path.basename(file))
  })
})
