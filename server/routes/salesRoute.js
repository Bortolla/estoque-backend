const express         = require('express')
const salesController = require('../controllers/salesController')
const router          = express.Router()

router.post('/', salesController.postSales)

// router.get('/', salesController.getAllSales)
// router.get('/:id', salesController.getSalesById)

// router.patch('/:id', salesController.updateSalesById)

// router.delete('/:id')

module.exports = router