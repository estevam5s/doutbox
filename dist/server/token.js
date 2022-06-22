"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _jsonwebtoken = require('jsonwebtoken');

 function gerarToken(payload, expiresIn) {
  if (process.env.SEGREDO == null) {
    throw new Error("Não foi possível gerar o token, necessário configurar segredo");
  }

  return _jsonwebtoken.sign.call(void 0, payload, process.env.SEGREDO, { expiresIn });
} exports.gerarToken = gerarToken;

 function verificaToken(token) {
  if (process.env.SEGREDO == null) {
    throw new Error("Não foi possível verificar o token, necessário configurar segredo");
  }
  return _jsonwebtoken.verify.call(void 0, token, process.env.SEGREDO,) 


} exports.verificaToken = verificaToken;