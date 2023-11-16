const salesService = require('../services/salesService')

exports.postSales = async (req, res, next) => {
    const { quantity, total_price, productId, userId } = req.body

    const response = await salesService.postSales(quantity, total_price, productId, userId)
    response.sendResponse(res)
}

exports.getAllSales = async (req, res, next) => {
    const response = await salesService.getAllSales()
    response.sendResponse(res)
}

exports.getSalesById = async (req, res, next) => {
    const { id } = req.params
    
    const response = await salesService.getSalesById(id)
    response.sendResponse(res)
}

exports.getSalesByCategory = async (req, res, next) => {
    const { category } = req.params

    const response = await salesService.getSalesByCategory(category)
    response.sendResponse(res)
}

exports.getSalesByProductId = async (req, res, next) => {
    const { id } = req.params

    const response = await salesService.getSalesByProductId(id)
    response.sendResponse(res)
}

exports.updateSalesById = async (req, res, next) => {
    const { id }           = req.params
    const { field, value } = req.body

    const response = await salesService.updateSalesById(id, field, value)
    response.sendResponse(res)
}

exports.deleteSalesById = async (req, res, next) => {
    const { id } = req.params

    const response = await salesService.deleteSalesById(id)
    response.sendResponse(res)
}