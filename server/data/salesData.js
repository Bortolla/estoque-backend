const Sales = require('../models/SalesModel')

exports.postSales = async (quantity, total_price, productId, productCategory, userId) => {
    const sales = new Sales({ quantity, total_price, productId, productCategory, userId }, '-__v')

    return await sales.save()
}

exports.getAllSales = async () => {
    return await Sales.find({}, '-__v')
}

exports.getSalesById = async (id) => {
    return await Sales.findOne({ _id: id }, '-__v')
}

exports.getSalesByCategory = async (category) => {
    return await Sales.find({ category: category}, '-__v')
}

exports.getSalesByProductId = async (productId) => {
    return await Sales.find({ productId: productId }, '-__v')
}

exports.getSalesByUserId = async (userId) => {
    return await Sales.findOne({ userId: userId }, '-__v')
}

exports.deleteSalesById = async (id) => {
    return await Sales.deleteOne({ _id: id })
}