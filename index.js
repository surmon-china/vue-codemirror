var es5 = require('./es5.js')
var es6 = require('./es6.js')

var codemirror = {
  es5: es5,
  es6: es6,
  install: es5.install
}

module.exports = codemirror