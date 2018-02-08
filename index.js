const defined = require('defined')
const postcss = require('postcss')
const extend = require('xtend')
const resolve = require('resolve')

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
      // Collect imported files for watchify
      const files = [filename]
      result.messages.forEach(function (msg) {
        if (msg.type === 'dependency') {
          files.push(msg.file)
        }
      })

      done(null, {
        css: result.css,
        files: files
      })
    })
    .catch(function (err) {
      done(err)
    })
}
