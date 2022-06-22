"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _client = require('@prisma/client');
var _server = require('./server/server');

 const prisma = new (0, _client.PrismaClient)(); exports.prisma = prisma

async function main() {
  // ... you will write your Prisma Client queries here
  _server.init.call(void 0, )
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await exports.prisma.$disconnect()
  })