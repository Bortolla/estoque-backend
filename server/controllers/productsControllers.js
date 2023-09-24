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

exports.getProductById = async (req, res, next) => {
    const { id } = req.params

    const response = await productsService.getProductById(id)
    response.sendResponse(res)
}

exports.deleteProductById = async (req, res, next) => {
    const { id } = req.params

    const response = await productsService.deleteProductById(id)
    response.sendResponse(res)
}

exports.updateProductById = async (req, res, next) => {
    const { id }           = req.params
    const { field, value } = req.body

    const response = await productsService.updateProductById(id, field, value)
    response.sendResponse(res)
}