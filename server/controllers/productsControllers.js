const productsService = require('../services/productsService')

exports.postProduct = async (req, res, next) => {
    const { name, description, price, quantity, category } = req.body

    const response = await productsService.postProduct(name, description, price, quantity, category)

    response.sendResponse(res)
}

exports.getProducts = async (req, res, next) => {
    const response = await productsService.getProducts()

    response.sendResponse(res)
    
}