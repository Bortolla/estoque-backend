const Product = require('../models/ProductModel')

exports.postProduct = async (name, description, price, quantity, category) => {
    const product = new Product({ name, description, price, quantity, category }, '-__v')

    return await product.save()
}

exports.getProducts = async () => {
    return await Product.find({}, '-__v')
}