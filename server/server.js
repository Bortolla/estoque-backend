require('dotenv').config()
const express = require('express')
const cors    = require('cors')
const app     = express()
const PORT    = Number(process.env.PORT) || 3000

app.use(cors())
app.use(express.json())

app.use('/products', require('./routes/productsRoute'))

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Rodando na porta: ${PORT}`) 
})