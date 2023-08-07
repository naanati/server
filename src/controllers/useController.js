// Importando as dependências necessárias
const prisma = require('../dataBase/dataBase') // Importa o prisma para permitir acesso ao banco de dados
const encryptPass = require('../utils/encryptPass') // Módulo responsável por criptografar as senhas do usuário antes de serem armazenadas no banco de dados

// Exportando a classe que contém o controlador
module.exports = class useController {
  
    // Controlador para criar um novo usuário (posto)
    static async createUser(request, response){
        // Obtendo os dados do usuário do corpo da requisição
        const { name, email, senha, cpf, telefone, endereco, estado, bairro, cidade, unidade } = request.body

        try { 
            // Criptografando a senha usando a função do módulo "encryptPass"
            const encrypt = await encryptPass(senha)
            
            // Criando um novo usuário (posto) no banco de dados
            const user = await prisma.posto.create({
                data: {
                    name,
                    email,
                    senha: encrypt,
                    cpf,
                    telefone,
                    endereco,
                    estado,
                    bairro,
                    cidade,
                    unidade
                }
            })

            // Retornando a resposta de sucesso com o usuário criado
            return response.status(200).json({ message: 'Usuário cadastrado com sucesso.', user })
        } catch (error) {
            // Caso ocorra algum erro, retorna a resposta de erro
            return response.status(422).json({ error })   
        }
    }

}
