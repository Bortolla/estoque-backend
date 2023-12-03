const Purchase = require('../models/PurchaseModel')

exports.postPurchase = async (productId, userId, quantity, unitPrice, description, totalPrice) => {
    const purchase = new Purchase({ productId, userId, quantity, unitPrice, description, totalPrice }, '-__v')

    return await purchase.save()
}

exports.getAllPurchases = async () => {
    return await Purchase.find({}, '-__v')
}

exports.getPurchaseById = async (id) => {
    return await Purchase.find({ _id: id }, '-__v')
}

exports.getPurchaseByProductId = async (id) => {
    return await Purchase.find({ productId: id })
}