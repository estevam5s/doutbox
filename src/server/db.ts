import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { resolve } from "path";

const prisma = new PrismaClient()

interface Iusuario {
  nome: string;
  email: string;
  documento: string;
}

interface Ipagamento {
  id?: number;
  valor: number;
  metodoPagamento: string;
  sucesso: boolean;
  idUsuario: number;
}

export async function addPagamento(pagamento: Ipagamento) {
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
    if (err instanceof PrismaClientKnownRequestError) {
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
}

export async function consultaPagamento(id: number) {
  if (id == null) return Promise.reject('Informar um id válido')
  
  return await prisma.pagamento.findFirst({
    where: {
      id,
    }

  }).catch(err => {
    if (err instanceof PrismaClientKnownRequestError) {
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
}

export async function deletaPagamento(id: number) {
  if (id == null) return Promise.reject('Informar um id válido')

  return await prisma.pagamento.delete({
    where: {
      id,
    }
  }).catch(err => {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2025"){
        return Promise.reject({
          message: "Registro excluído não encontrado"
        })
      }
    }
    console.error("Erro não catalogado", {
      code: err.code,
      message: err.message,
    })

    return Promise.reject({
      message: "Erro não catalogado, entre em contato com o suporte"
    })
  })
}

export async function addUsuario(usuario: Iusuario) {
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
    if (err instanceof PrismaClientKnownRequestError) {
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
}