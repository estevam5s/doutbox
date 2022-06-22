"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }


var _jsonwebtoken = require('jsonwebtoken');
var _db = require('./db');
var _token = require('./token');

 function userRouter(req, res, next) {
  if (req.method !== 'POST') {
    // next()
    res.status(404).json({
      error: 'Recurso inexistente',
      message: `Método ${req.method} não implementado`
    })
  }

  else {
    const user = req.body
    if (user == null || !user.nome || !user.email || !user.documento) {
      res.status(400).json({
        error: 'Dados insuficientes',
        message: 'Nome, email e documento são obrigatórios'
      })
    }

    else {
      _db.addUsuario.call(void 0, user).then(salvo => {
        if (!!salvo) {
          res.json({
            id: salvo.id,
            token: _token.gerarToken.call(void 0, {
              idUsuario: salvo.id
            }, 3 * 60 * 1000)
          })
        }
      })
        .catch(err => {
          res.status(400).json({ message: err.message });
        })
    }
  }
} exports.userRouter = userRouter;

 function pagamentoRouter(req, res, next) {
  if (req.method !== 'POST') {
    // next()
    res.status(404).json({
      error: 'Recurso inexistente',
      message: `Método ${req.method} não implementado`
    })
  }

  else {
    const token = _optionalChain([req, 'access', _ => _.headers, 'access', _2 => _2.authorization, 'optionalAccess', _3 => _3.replace, 'call', _4 => _4('Bearer ', '')]);
    if (token == null) {
      res.status(401).json({
        error: 'Acesso não autorizado',
        message: 'Necessário estar autenticado'
      });
      return;
    };
    try {
      const tokenValido = _token.verificaToken.call(void 0, token)
      if (tokenValido) {
        const sucesso = Math.random() > 0.5;
        const pagamento = req.body;
        _db.addPagamento.call(void 0, {
          ...pagamento,
          sucesso,
          idUsuario: tokenValido.idUsuario
        })
          .then(data => {
            res.json(data);
          })
      }
    } catch (error) {
      if (error instanceof _jsonwebtoken.JsonWebTokenError) {
        res.status(400).json({
          error: 'Acesso não autorizado',
          message: 'Token inválido'
        });
        return;
      }
      console.error(error)
      res.status(400).json({
        error: 'Error',
        message: 'Ocorreu um erro não catalogado, entre em contato o suporte'
      });
    }
  }
} exports.pagamentoRouter = pagamentoRouter;