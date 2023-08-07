// Importando o PrismaClient do pacote @prisma/client
const { PrismaClient } = require('@prisma/client');

// Criando uma nova instância do PrismaClient e configurando para logar todas as queries
const prisma = new PrismaClient({
    log: ['query']
});

// Exportando a instância configurada para que possa ser usada em outros módulos
module.exports = prisma;
