const defined = require('defined')
const postcss = require('postcss')
const extend = require('xtend')
const resolve = require('resolve')
const postcssrc = require('postcss-load-config')

module.exports = transform

function transform (filename, source, options, done) {
  options = defined(options, {})

  const basedir = options.basedir

  const plugins = defined(options.plugins, [])
    .map(plugin => {
      if (typeof plugin === 'string') {
        plugin = [ plugin ]
      }

      return {
        path: resolve.sync(plugin[0], { basedir }),
        options: plugin[1]
      }
    })
    .map(plugin => require(plugin.path)(plugin.options))

  const ctx = extend({
    sourcemap: true,
    from: filename,
    messages: {
      browser: true,
      console: false
    }
  }, options, {plugins: plugins})

  postcssrc(ctx, basedir).then(compile, function () {
    return compile(ctx)
  }).then(function (result) {
    done(null, result.css)
  }, done)

  function compile (config) {
    return postcss(config.plugins).process(source, config)
  }
}
