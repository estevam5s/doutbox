import { prisma } from "@prisma/client";
import { resolveSoa } from "dns";
import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { addPagamento, addUsuario, consultaPagamento, deletaPagamento } from "./db";
import { gerarToken, verificaToken } from "./token";

export function userRouter(req: Request, res: Response, next: NextFunction) {
  if (req.method !== "POST") {
    // next()
    res.status(404).json({
      error: "Recurso inexistente",
      message: `Método ${req.method} não implementado`,
    });
  } else {
    const user = req.body;
    if (user == null || !user.nome || !user.email || !user.documento) {
      res.status(400).json({
        error: "Dados insuficientes",
        message: "Nome, email e documento são obrigatórios",
      });
    } else {
      addUsuario(user)
        .then((salvo) => {
          if (!!salvo) {
            res.json({
              id: salvo.id,
              token: gerarToken(
                {
                  idUsuario: salvo.id,
                },
                3 * 60 * 1000
              ),
            });
          }
        })
        .catch((err) => res.status(400).json({ message: err.message }));
    }
  }
}

export function pagamentoRouter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    req.method !== "POST" &&
    req.method !== "DELETE" &&
    req.method !== "GET"
  ) {
    // next()
    res.status(404).json({
      error: "Recurso inexistente",
      message: `Método ${req.method} não implementado`,
    });
  } else {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (token == null) {
      res.status(401).json({
        error: "Acesso não autorizado",
        message: "Necessário estar autenticado",
      });
      return;
    }
    try {
      const tokenValido = verificaToken(token);
      if (tokenValido) {
        const sucesso = Math.random() > 0.5;
        const pagamento = req.body;
        if (req.method === "POST") {
          addPagamento({
            ...pagamento,
            sucesso,
            idUsuario: tokenValido.idUsuario,
          }).then((data) => res.json(data)
          );
        }
        else if (req.method === "GET") {
          if (req.params.id == null || Number.isNaN(req.params.id)){
            res.status(404).json({sucesso: false, error: "Parâmetro inválido", message: "Necessário informar id válido para esta consulta"});
            return;
          }
          consultaPagamento(+req.params.id).then((data) => {
            if (!(data == null)){
              const sucesso = Math.random() > 0.5;
              if (sucesso) res.json({sucesso, pagamento: data});
              else res.status(500).json({sucesso, error: "Erro interno", message: "Ocorreu um erro inesperado, realize uma nova consulta"})
              return;
            }
            res.status(404).json({sucesso: false, error: "Não encontrado", message: `Não foi possível encontrar pagamento com o id: ${req.params.id}`});
            return;
          });
        }
        else if (req.method === "DELETE") {
          if (req.params.id == null || Number.isNaN(req.params.id)){
            res.status(404).json({sucesso: false, error: "Parâmetro inválido", message: "Necessário informar id válido para excluir uma transação"});
            return;
          }
          const sucesso = Math.random() > 0.5;
          if (sucesso){
            deletaPagamento(+req.params.id).then((data) => {
              if (!(data == null)) res.json({sucesso, pagamento: data});
              else res.status(404).json({sucesso, error: "Não encontrado", message: `id ${req.params.id} já deletado, realize uma nova transação para deletar respectivos novos dados`})
              return;
            }).catch(error => {
              if (error.message){
                res.status(404).json({
                  sucesso: false,
                  error: "Não encontrado",
                  message: `id ${req.params.id} já deletado, realize uma nova transação para deletar respectivos novos dados`
                });
              }
            })
          }
          else res.status(500).json({sucesso, error: "Erro interno", message: "Ocorreu um erro no servidor"})
          return;
        }
      }
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        res.status(400).json({
          error: "Acesso não autorizado",
          message: "Token inválido",
        });
        return;
      }
      console.error(error);
      res.status(400).json({
        error: "Error",
        message: "Ocorreu um erro não catalogado, entre em contato o suporte",
      });
    }
  }
}
