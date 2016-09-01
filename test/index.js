var sheetifyPostcss

module.exports = {
  'sheetify-postcss': function (assert) {
    sheetifyPostcss = require('../')
    assert.ok(sheetifyPostcss, 'module is require-able')
  }
}
