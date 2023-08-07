// Importando o módulo 'express' e criando um objeto de roteamento
const router = require('express').Router();

// Importando os controladores
const useController = require('./controllers/useController');
const authUserControllers = require('./controllers/authUserControllers');
const medicamentosControllers = require('./controllers/medicamentosControllers');

// Definindo as rotas e associando aos controladores
router.post('/posto', useController.createUser); // Rota para criar um novo usuário (posto)
router.post('/login', authUserControllers.login); // Rota para realizar o login de um usuário

router.post('/medicamentos', medicamentosControllers.createMedicamentos); // Rota para criar um novo medicamento
router.get('/medicamentos/', medicamentosControllers.getMedicamentos); // Rota para obter todos os medicamentos
router.get('/medicamentos/:id', medicamentosControllers.getMedicamento); // Rota para obter um medicamento específico pelo ID
router.put('/medicamentos/:id', medicamentosControllers.updateMedicamento); // Rota para atualizar um medicamento pelo ID
router.delete('/medicamentos/:id', medicamentosControllers.deleteMedicamento); // Rota para deletar um medicamento pelo ID

// Exportando o objeto de roteamento configurado
module.exports = router;
