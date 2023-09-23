const mongoose = require('mongoose')
const database = require('../infra/database')

const reportSchema = mongoose.Schema(
    { 
        name: {
            type: String,
            required: true 
        },
        description: {
            type: Number,
            required: true
        },
        userId: {
            type: String, // mongoose.Schema.Types.ObjectId
            required: true
        },
        date: {
            type: Date,
            required: true,
            default: Date.now()
        }
    }
);

module.exports = mongoose.model('Report', reportSchema)