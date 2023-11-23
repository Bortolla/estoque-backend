const { ResponseDTO } = require('../dtos/Response')
const productsData    = require('../data/productsData')

exports.postProduct = async (name, description, price, quantity, category) => {
    try {
        if (!name) {
            return new ResponseDTO('Error', 400, 'Nome não preenchido')
        }

        if (await productsData.checkIfProductExists(name)) {
            return new ResponseDTO('Error', 400, 'Nome já foi pego')
        }

        if (!description) {
            return new ResponseDTO('Error', 400, 'Descrição não preenchida')
        }

        if (!price) {
            return new ResponseDTO('Error', 400, 'Preço não preenchido')
        }

        if (!quantity) {
            return new ResponseDTO('Error', 400, 'Quantidade não preenchida')
        }

        if (!category) {
            return new ResponseDTO('Error', 400, 'Categoria não preenchida')
        }
     
        const response = await productsData.postProduct(name, description, price, quantity, category)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Error ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getProducts = async () => {
    try {
        const response = await productsData.getProducts()

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Error ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getProductById = async (id) => {
    try {
        const response = await productsData.getProductById(id)
        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Error: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getProductByCategory = async (category) => {
    try {
        const response = await productsData.getProductByCategory(category)
        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Error: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getProductByFilter = async (key, value) => {
    try {
        if (key && value) {
            const response = await productsData.getProductByFilter(key, value)
            return new ResponseDTO('Success', 200, 'ok', response)
            
        } else {
            const response = await productsData.getProducts()
            return new ResponseDTO('Success', 200, 'ok', response)
        }

    } catch (error) {
        console.log(`Error: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.deleteProductById = async (id) => {
    try {
        const response = await productsData.deleteProductById(id)
        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Error: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.updateProductById = async (id, field, value) => {
    try {
        if (!field) {
            return new ResponseDTO('Error', 400, 'Campo não preenchido')
        }

        if (!value) {
            return new ResponseDTO('Error', 400, 'Valor não preenchido')
        }

        const product = await productsData.getProductById(id)

        if (!product) {
            return new ResponseDTO('Error', 404, 'Produto não encontrado')
        }

        product[field] = value
        await product.validate()
        await product.save()
        
        const response = await productsData.getProductById(id)
        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Error: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.incrementQuantityById = async (id, quantity) => {
    try {
        if (!quantity) {
            return new ResponseDTO('Error', 400, 'Campo não preenchido')
        }

        const product = await productsData.getProductById(id)

        if (!product) {
            return new ResponseDTO('Error', 404, 'Produto não encontrado')
        }

        const result = await productsData.incrementQuantityById(id, quantity)

        if (result.acknowledged == true && result.modifiedCount == 1) {
            const response = await productsData.getProductById(id)
            
            return new ResponseDTO('Success', 200, 'ok', response)
        } else {
            return new ResponseDTO('Error', 500, 'Erro no servidor/banco de dados')
        }

    } catch (error) {
        console.log(`Error: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.decrementQuantityById = async (id, quantity) => {
    try {
        if (!quantity) {
            return new ResponseDTO('Error', 400, 'Campo não preenchido')
        }

        const product = await productsData.getProductById(id)

        if (!product) {
            return new ResponseDTO('Error', 404, 'Produto não encontrado')
        }

        const result = await productsData.decrementQuantityById(id, quantity)

        if (result.acknowledged == true && result.modifiedCount == 1) {
            const response = await productsData.getProductById(id)
            
            return new ResponseDTO('Success', 200, 'ok', response)
        } else {
            return new ResponseDTO('Error', 500, 'Erro no servidor/banco de dados')
        }

    } catch (error) {
        console.log(`Error: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}