const mongoose = require('mongoose')
const database = require('../infra/database')

const purchaseSchema = mongoose.Schema(
    { 
        productId: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        quantity: {
            type: Number, 
            required: true
        },
        unitPrice: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true 
        },
        totalPrice: {
            type: Number,
            required: true
        }
    }
);

module.exports = mongoose.model('Purchase', purchaseSchema)