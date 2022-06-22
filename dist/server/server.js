"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// parte Express
// const express = require('express')
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _routes = require('./routes');

const app = _express2.default.call(void 0, )

 function init() {
  app.use(_express2.default.json({ limit: '10kb' }))
  app.all('/usuario', _routes.userRouter);
  app.all('/pagamentos', _routes.pagamentoRouter);

  app.get('/', function (req, res) {
    // res.send('Hello World')
    res.json({ message: 'Hello World' })
  })

  app.listen(3000)
  console.log("Server running on port 3000")
} exports.init = init;