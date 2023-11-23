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

exports.getProductByCategory = async (req, res, next) => {
    const { category } = req.params

    const response = await productsService.getProductByCategory(category)
    response.sendResponse(res)
}

exports.getProductByFilter = async (req, res, next) => {
    const { key, value } = req.body

    const response = await productsService.getProductByFilter(key, value)
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

exports.incrementQuantityById = async (req, res, next) => {
    const { id }       = req.params
    const { quantity } = req.body

    const response = await productsService.incrementQuantityById(id, quantity)
    response.sendResponse(res)
}

exports.decrementQuantityById = async (req, res, next) => {
    const { id }       = req.params
    const { quantity } = req.body

    const response = await productsService.decrementQuantityById(id, quantity)
    response.sendResponse(res)
}