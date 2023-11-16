const Product = require('../models/ProductModel')

exports.postProduct = async (name, description, price, quantity, category) => {
    const product = new Product({ name, description, price, quantity, category }, '-__v')

    return await product.save()
}

exports.getProducts = async () => {
    return await Product.find({}, '-__v')
}

exports.getProductById = async (id) => {
    return await Product.findOne({ _id: id }, '-__v')
}

exports.getProductByCategory = async (category) => {
    return await Product.find({ category: category }, '-__v')
}

exports.deleteProductById = async (id) => {
    return await Product.deleteOne({ _id: id })
}

exports.checkIfProductExists = async (name) => {
    return await Product.findOne({ name: name }, '-__v')
}

exports.incrementQuantityById = async (id, quantity) => {
    const product = await Product.findOne({ _id: id }, '-__v')

    return await Product.updateOne({ _id: id }, { quantity: (Number(product.quantity) + Number(quantity)) })
}

exports.decrementQuantityById = async (id, quantity) => {
    const product = await Product.findOne({ _id: id }, '-__v')

    return await Product.updateOne({ _id: id }, { quantity: (Number(product.quantity) - Number(quantity)) })
}