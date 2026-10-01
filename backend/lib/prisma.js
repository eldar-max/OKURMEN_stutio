import { PrismaClient } from '@prisma/client';

// Создаем единственный экземпляр Prisma Client
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ['query', 'error', 'warn'],
  });
};

// Используем глобальную переменную для предотвращения создания множественных клиентов
const globalForPrisma = global;

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
