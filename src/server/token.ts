import { JwtPayload, sign, verify } from 'jsonwebtoken'

export function gerarToken(payload: any, expiresIn: number) {
  if (process.env.SEGREDO == null) {
    throw new Error("Não foi possível gerar o token, necessário configurar segredo");
  }

  return sign(payload, process.env.SEGREDO, { expiresIn });
}

export function verificaToken(token: string) {
  if (process.env.SEGREDO == null) {
    throw new Error("Não foi possível verificar o token, necessário configurar segredo");
  }
  return verify(token, process.env.SEGREDO,) as JwtPayload | {
    idUsuario: number
  }
}