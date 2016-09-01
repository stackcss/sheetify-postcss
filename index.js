const defined = require('defined')
const postcss = require('postcss')
const extend = require('xtend')
const resolve = require('resolve')

module.exports = transform

function transform (filename, source, options, done) {
  options = defined(options, {})

  const basedir = options.basedir

  const plugins = defined(options.plugins, [])
    .map(plugin => resolve.sync(plugin, { basedir }))
    .map(require)

  postcss(plugins)
    .process(source, extend({
      sourcemap: true,
      from: filename,
      messages: {
        browser: true,
        console: false
      }
    }, options))
  .then(function (result) {
    done(null, result.css)
  })
  .catch(function (err) {
    done(err)
  })
}
