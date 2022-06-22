// parte Express
// const express = require('express')
import express from 'express'
import { userRouter, pagamentoRouter } from './routes';

const app = express()

export function init() {
  app.use(express.json({ limit: '10kb' }))
  app.all('/usuario', userRouter);
  app.all('/pagamentos/:id', pagamentoRouter);
  app.all('/pagamentos', pagamentoRouter);

  app.get('/', function (req, res) {
    // res.send('Hello World')
    res.json({ message: 'Hello World' })
  })

  app.listen(3000)
  console.log("Server running on port 3000")
}