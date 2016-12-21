const test = require('tape')
const sheetifyPostcss = require('../')

test(function (t) {
  t.test('module should work with postcss plugins without options', function (t) {
    t.plan(2)

    sheetifyPostcss('test.css', '.rule {}', { basedir: __dirname, plugins: [ './stubs/postcss-plugin' ] }, (err, css) => {
      t.equal(err, null)
      t.equal(css, '.ok {}')
    })
  })

  t.test('module should work with postcss plugins and their options', function (t) {
    t.plan(2)

    sheetifyPostcss('test.css', '.rule {}', { basedir: __dirname, plugins: [ [ './stubs/postcss-plugin', { has: true } ] ] }, (err, css) => {
      t.equal(err, null)
      t.equal(css, '.ok-with-options {}')
    })
  })
})

