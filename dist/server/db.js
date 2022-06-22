"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _client = require('@prisma/client');
var _runtime = require('@prisma/client/runtime');

const prisma = new (0, _client.PrismaClient)()















 async function addPagamento(pagamento) {
  if (pagamento == null || !pagamento.valor || !pagamento.metodoPagamento || pagamento.sucesso === null || !pagamento.idUsuario) return Promise.reject('Dados inválidos para pagamento')
  const {
    valor,
    metodoPagamento,
    sucesso,
    idUsuario
  } = pagamento;

  return await prisma.pagamento.create({
    data: {
      valor,
      metodoPagamento,
      sucesso,
      idUsuario
    }
  }).catch(err => {
    if (err instanceof _runtime.PrismaClientKnownRequestError) {
      return Promise.reject({
        message: err.message
      })
    }

    console.error("Erro não catalogado", {
      code: err.code,
      message: err.message,
    })

    return Promise.reject({
      message: "Erro não catalogado, entre em contato com o suporte"
    })
  })
} exports.addPagamento = addPagamento;

 async function addUsuario(usuario) {
  if (usuario == null || !usuario.nome || !usuario.email || !usuario.documento) return Promise.reject('Nome, email e documento são obrigatórios');

  const {
    nome,
    email,
    documento
  } = usuario;

  return await prisma.user.create({
    data: {
      nome,
      email,
      documento
    }

  }).catch(err => {
    if (err instanceof _runtime.PrismaClientKnownRequestError) {
      if (err.code == 'P2002') return Promise.reject({
        message: "Usuario já existe com estas informações, solicite recuperação de token"
      })
    }

    console.error("Erro não catalogado", {
      code: err.code,
      message: err.message,
    })

    return Promise.reject({
      message: "Erro não catalogado, entre em contato com o suporte"
    })
  })
} exports.addUsuario = addUsuario;