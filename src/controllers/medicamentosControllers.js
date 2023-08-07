// Importando as dependências necessárias
const prisma = require('../dataBase/dataBase')
const jwt = require('jsonwebtoken')
const encryptPass = require('../utils/encryptPass')

// Exportando a classe que contém os controladores
module.exports = class medicamentosControllers {
  
    // Controlador para criar um novo medicamento
    static async createMedicamentos(request, response){
        // Obtendo os dados do medicamento a partir do corpo da requisição
        const { name, data, quantidade, descricao } = request.body

        // Obtendo o token de autorização do cabeçalho da requisição
        const token = request.headers.authorization;

        try {
            // Verificando a autenticidade do token
            const decodedToken = jwt.verify(token, process.env.SECRET);
            const userId = decodedToken.id;

            // Verificando se o usuário está autenticado
            if (!userId) {
                return response.status(401).send({ message: "Unauthorized. Please log in." });
            }

            // Criando um novo medicamento associado ao usuário autenticado
            const medicamentos = await prisma.medicamentos.create({  
                data: {
                    name,
                    data,
                    quantidade,
                    descricao,
                    postoId: userId
                }
            })

            // Retornando a resposta de sucesso com o medicamento criado
            return response.status(200).json({ message: 'Medicamento cadastrado', medicamentos })
        } catch (error) {
            // Caso ocorra algum erro, retorna a resposta de erro
            return response.status(422).json({ message: 'error', error })
        }
    }

    // Controlador para obter todos os medicamentos
    static async getMedicamentos(request, response){              
        try {       
            // Obtendo todos os medicamentos do banco de dados
            const medicamentos = await prisma.medicamentos.findMany({})

            // Retornando a resposta com a lista de medicamentos encontrados
            return response.status(200).json({ message: 'Medicamento encontrado', medicamentos })
        } catch (error) {
            // Caso ocorra algum erro, retorna a resposta de erro
            return response.status(422).json({ message: 'error', error })
        }
    }

    // Controlador para obter um medicamento pelo seu ID
    static async getMedicamento(request, response){  
        const { id } = request.params
        try {
            // Obtendo o medicamento pelo seu ID do banco de dados
            const medicamentos = await prisma.medicamentos.findUnique({ where: { id } })
          
            // Retornando a resposta com o medicamento encontrado
            return response.status(200).json({ message: 'Medicamento encontrado', medicamentos })
        } catch (error) {
            // Caso ocorra algum erro, retorna a resposta de erro
            return response.status(422).json({ message: 'error', error })
        }
    }

    // Controlador para atualizar um medicamento pelo seu ID
    static async updateMedicamento(request, response){
        const { id } = request.params
        const { name, data, quantidade, descricao } = request.body

        // Obtendo o token de autorização do cabeçalho da requisição
        const token = request.headers.authorization;

        try {
            // Verificando a autenticidade do token
            const decodedToken = jwt.verify(token, process.env.SECRET);
            const userId = decodedToken.id;

            // Verificando se o usuário está autenticado
            if (!userId) {
                return response.status(401).send({ message: "Não autorizado. Por favor, tente novamente." });
            }

            // Buscando o medicamento no banco de dados
            let medicamento = await prisma.medicamentos.findUnique({ where: { id } })

            // Verificando se o medicamento foi encontrado
            if (!medicamento) {
                return response.status(404).send({ message: "Medicamento não encontrado" })
            }

            // Atualizando os campos do medicamento
            if (name !== undefined && name !== '') {
                medicamento.name = name
            }
            if (data !== undefined && data !== '') {
                medicamento.data = data
            }
            if (quantidade !== undefined && quantidade !== '') {
                medicamento.quantidade = quantidade
            }
            if (descricao !== undefined && descricao !== '') {
                medicamento.descricao = descricao
            }

            // Realizando a atualização do medicamento no banco de dados
            medicamento = await prisma.medicamentos.update({ 
                where: {
                    id
                },
                data: {
                    name: medicamento.name,
                    data: medicamento.data,
                    quantidade: medicamento.quantidade,
                    descricao: medicamento.descricao,
                    postoId: userId               
                }
            })

            // Retornando a resposta de sucesso com o medicamento atualizado
            return response.status(200).json({ message: "Medicamento editado com sucesso", medicamento })
        } catch (error) {
            // Caso ocorra algum erro, retorna a resposta de erro
            return response.status(422).json({ message: 'error', error })
        }
    }

    // Controlador para deletar um medicamento pelo seu ID
    static async deleteMedicamento(request, response){
        const { id } = request.params 
        
        try {
            // Buscando o medicamento no banco de dados
            const medicamento = await prisma.medicamentos.findFirstOrThrow({ where: { id } })
            
            // Deletando o medicamento do banco de dados
            await prisma.medicamentos.delete({ where: { id } })

            // Retornando a resposta de sucesso com o medicamento deletado
            return response.status(200).json({ message: 'Medicamento deletado com sucesso', medicamento })
        } catch (error) {
            // Caso ocorra algum erro, retorna a resposta de erro
            return response.status(422).json({ error })
        }
    }
}
