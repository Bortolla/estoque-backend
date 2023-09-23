require('dotenv').config()
const mongoose = require('mongoose')

const DB = process.env.DATABASE_URL;

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(DB)
        .then(() => {
            console.log("Banco de dados conectado")
        })
        .catch(error => {
            console.log(`Erro ao conectar com o banco: ${error}`)
        })
    }
}

module.exports = new Database()