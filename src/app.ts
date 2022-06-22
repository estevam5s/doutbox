import { PrismaClient } from '@prisma/client'
import { init } from './server/server'

export const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  init()
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })