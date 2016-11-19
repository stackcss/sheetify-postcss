const defined = require('defined')
const postcss = require('postcss')
const extend = require('xtend')
const resolve = require('resolve')
const loadConfig = require('postcss-load-config')

module.exports = transform

function transform (filename, source, options, done) {
  options = defined(options, {})

  const basedir = options.basedir

  loadConfig().then(function (result) {
    plugins = result.plugins
    options = extend({}, options, result.options)

    if (!plugins.length) {
      plugins = defined(options.plugins, [])
        .map(plugin => resolve.sync(plugin, { basedir }))
        .map(require)
    }

    return postcss(plugins)
      .process(source, extend({
        sourcemap: true,
        from: filename,
        messages: {
          browser: true,
          console: false
        }
      }, options))
  })
  .then(function (result) {
    done(null, result.css)
  })
  .catch(function (err) {
    done(err)
  })
}
