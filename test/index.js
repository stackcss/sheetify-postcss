const path = require('path')
const test = require('tape')
const sheetifyPostcss = require('../')

test(function (t) {
  t.test('module should work with postcss plugins without options', function (t) {
    t.plan(2)

    sheetifyPostcss('test.css', '.rule {}', { basedir: __dirname, plugins: ['./stubs/postcss-plugin'] }, (err, result) => {
      t.equal(err, null)
      t.equal(result.css, '.ok {}')
    })
  })

  t.test('module should work with postcss plugins and their options', function (t) {
    t.plan(2)

    sheetifyPostcss('test.css', '.rule {}', { basedir: __dirname, plugins: [['./stubs/postcss-plugin', { has: true }]] }, (err, result) => {
      t.equal(err, null)
      t.equal(result.css, '.ok-with-options {}')
    })
  })

  t.test('module should respect postcssrc config file', function (t) {
    t.plan(2)

    sheetifyPostcss('test.css', '.rule {}', { basedir: path.join(__dirname, 'stubs') }, (err, result) => {
      t.equal(err, null)
      t.equal(result.css, '.ok-with-postcssrc {}')
    })
  })

  t.test('should report imported files if postcss-import is used', function (t) {
    t.plan(3)

    sheetifyPostcss(path.join(__dirname, 'test.css'), '@import "./stubs/dep.css"', { basedir: __dirname, plugins: ['postcss-import'] }, (err, result) => {
      t.equal(err, null)
      t.equal(result.css, '.dependency {}')
      t.deepEqual(result.files, [
        path.join(__dirname, 'test.css'),
        path.join(__dirname, 'stubs/dep.css')
      ])
    })
  })
})
