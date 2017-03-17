const acorn = require('acorn')
const estraverse = require('estraverse')
const genCode = require('escodegen')
const genId = require('./gen-id')

module.exports = function(contents) {
  const id = genId(this.resourcePath)
  let hasComponent = false

  const ast = acorn.parse(contents, {
    sourceType: 'module'
  })

  const res = estraverse.replace(ast, {
    enter (node, parent) {
      if (node.type === 'ExportDefaultDeclaration') {
        hasComponent = true

        const component = node.declaration

        const componentId = {
          type: 'Identifier',
          name: '__component__'
        }

        node.declaration = componentId
        parent.body.push(node)

        return {
          type: 'VariableDeclaration',
          declarations: [{
            type: 'VariableDeclarator',
            id: componentId,
            init: component
          }],
          kind: 'var'
        }
      }
    }
  })

  return genCode.generate(res)
    + (hasComponent ? genHotReload(id) : '')
}

function genHotReload (id) {
  return `
if (module.hot) {(function(options) {
  if (typeof options === 'function') {
    options = __component__.options
  }

  var api = require('vue-hot-reload-api')
  var Vue = require('vue')

  api.install(Vue)

  if (api.compatible) {
    module.hot.accept()
    if (!module.hot.data) {
      api.createRecord(${id}, options)
    } else {
      api.reload(${id}, options)
    }
  }})(__component__)
}`
}
