const { ResponseDTO } = require('../dtos/Response')
const purchasesData   = require('../data/purchasesData')
const productsData    = require('../data/productsData')
const usersData       = require('../data/usersData')

exports.postPurchase = async (productId, userId, quantity, unitPrice, description) => {
    try {
        if (!productId) {
            return new ResponseDTO('Error', 400, 'Id do produto não preenchido')
        }

        const product = await productsData.getProductById(productId)

        if (!product) {
            return new ResponseDTO('Error', 404, 'Produto não encontrado')
        }

        if (!userId) {
            return new ResponseDTO('Error', 400, 'Id do usuário não preenchido')
        }

        const user = await usersData.getUserById(userId)

        if (!user) {
            return new ResponseDTO('Error', 404, 'Usuário não encontrado')
        }

        if (!quantity) {
            return new ResponseDTO('Error', 400, 'Quantidade não preenchida')
        }

        if (!unitPrice) {
            return new ResponseDTO('Error', 400, 'Preço por unidade do produto comprado não preenchido')
        }

        if (!description) {
            return new ResponseDTO('Error', 400, 'Descrição do produto comprado não preenchido')
        }

        if (await productsData.incrementQuantityById(productId, quantity)) {
            const response = await purchasesData.postPurchase(productId, userId, quantity, unitPrice, description, quantity * unitPrice)

            console.log(`resposta: `+ response)
            return new ResponseDTO('Success', 200, 'ok', response)
        } 

        console.log(`deu ruim `)
        return new ResponseDTO('Error', 400, 'ok', response)


    } catch (error) {
        console.log(`Error ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAllPurchases = async () => {
    try {
        const response = await purchasesData.getAllPurchases()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Error ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
} 

exports.getPurchaseById = async (id) => {
    try {
        const response = await purchasesData.getPurchaseById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Error ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getPurchaseByProductId = async (id) => {
    try {
        const response = await purchasesData.getPurchaseByProductId(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Error ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getPurchaseByFilter = async (key, value) => {
    try {
        if (key && value) {
            const response = await purchasesData.getPurchaseByFilter(key, value)
            return new ResponseDTO('Success', 200, 'ok', response)
            
        } else {
            const response = await purchasesData.getAllPurchases()
            return new ResponseDTO('Success', 200, 'ok', response)
        }

    } catch (error) {
        console.log(`Error: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}