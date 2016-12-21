var postcss = require('postcss')

module.exports = postcss.plugin('postcss-plugin', function postcssPlugin (options) {
  options = options || {}

  return function (root, result) {
    root.walkRules('.rule', rule => {
      rule.replaceWith(postcss.rule({ selector: options.has ? '.ok-with-options' : '.ok' }))
    })
  }
})
