// Importando as dependências necessárias
const prisma = require('../dataBase/dataBase')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// Exportando a classe que contém o controlador
module.exports = class authUserControllers {
  
    // Controlador para realizar o login
    static async login(request, response){
        const { email, senha } = request.body

        // Verificando se o email existe na tabela "posto" no banco de dados
        const emailCheck = await prisma.posto.findFirst({ where: { email } })
        if (!emailCheck) {
            return response.status(422).json({ message: "E-mail inválido" });
        }

        // Verificando se a senha fornecida corresponde à senha armazenada no banco de dados
        const senhaCheck = await bcrypt.compare(senha, emailCheck.senha)
        if (!senhaCheck) {
            return response.status(422).json({ message: "Senha inválida" });
        }

        // Buscando novamente os dados do posto pelo email
        const posto = await prisma.posto.findFirst({ where: { email } })

        try {
            // Gerando um token de autenticação usando o jwt.sign
            const token = jwt.sign( 
                {
                    id: posto.id, 
                    name: posto.name,
                    email: posto.email,
                    senha: posto.senha
                }, 
                process.env.SECRET,
                {
                    expiresIn: '30 days'
                }
            )

            // Retornando a resposta de sucesso com o token gerado
            return response.status(200).json({ message: 'Usuário logado', token })
        } catch (error) {
            // Caso ocorra algum erro, retorna a resposta de erro
            return response.status(422).json({ message: 'Erro ao logar', error })
        }

    }
}
