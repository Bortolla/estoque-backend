const mongoose = require('mongoose')
const database = require('../infra/database')

const salesSchema = mongoose.Schema(
    { 
        date: {
            type: Date,
            required: true,
            default: Date.now()
        }, 
        quantity: {
            type: Number,
            required: true 
        },
        total_price: {
            type: Number,
            required: true
        },
        productId: {
            type: String, // mongoose.Schema.Types.ObjectId
            required: true
        },
        productCategory: {
            type: String,
            required: true
        },
        userId: {
            type: String, // mongoose.Schema.Types.ObjectId
            required: true
        }
    }
);

module.exports = mongoose.model('Sales', salesSchema)