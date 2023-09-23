const mongoose = require('mongoose')
const database = require('../infra/database')

const userSchema = mongoose.Schema(
    { 
        name: {
            type: String,
            required: true
        }, 
        email: {
            type: String,
            required: true 
        },
        password: {
            type: String,
            required: true
        },
        permission: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('User', userSchema)