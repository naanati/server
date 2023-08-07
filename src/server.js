// Importando o módulo 'express'
const express = require('express');
const cors = require('cors');

// Importando o roteador de usuários (ou outras rotas) do arquivo 'routes.js'
const userRouter = require('./routes');

// Criando uma instância do aplicativo Express
const app = express();

// Definindo o uso do middleware para interpretar o corpo da requisição como JSON
app.use(express.json());
app.use(cors());

// Definindo o uso do roteador de usuários (ou outras rotas) no aplicativo
app.use(userRouter);

// Iniciando o servidor na porta 
app.listen(8080, () => {
    console.log('ok');
});
