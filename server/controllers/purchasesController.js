const purchasesController = require('../services/purchasesService')

exports.postPurchase = async (req, res, next) => {
    const { productId, userId, quantity, unitPrice, description } = req.body

    const response = await purchasesController.postPurchase(productId, userId, quantity, unitPrice, description)

    response.sendResponse(res)    
}

exports.getAllPurchases = async (req, res, next) => {
    const response = await purchasesController.getAllPurchases()

    response.sendResponse(res)
}

exports.getPurchaseById = async (req, res, next) => {
    const { id }   = req.params
    const response = await purchasesController.getPurchaseById(id)

    response.sendResponse(res)
}

exports.getPurchaseByProductId = async (req, res, next) => {
    const { id }   = req.params
    const response = await purchasesController.getPurchaseByProductId(id)

    response.sendResponse(res)
}