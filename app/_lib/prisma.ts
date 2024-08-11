// Esse código garante que, em ambientes de desenvolvimento, apenas uma instância de PrismaClient seja criada e reutilizada, evitando problemas de performance e excesso de conexões com o banco de dados. Em produção, uma nova instância é criada cada vez que o código é executado, o que é normalmente desejável.

import { PrismaClient } from "@prisma/client"

declare global {
  // eslint-disable-next-line no-unused-vars
  var cachedPrisma: PrismaClient
}

let prisma: PrismaClient
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient()
  }
  prisma = global.cachedPrisma
}

export const db = prisma
