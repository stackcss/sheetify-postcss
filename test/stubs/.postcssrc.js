var postcss = require('postcss')

var plugin = postcss.plugin('postcss-plugin', function postcssPlugin () {
  return function (root, result) {
    root.walkRules('.rule', rule => {
      rule.replaceWith(postcss.rule({ selector: '.ok-with-postcssrc' }))
    })
  }
})

module.exports = function (ctx) {
  return Object.assign({}, ctx, {
    plugins: [plugin]
  })
}
