const express         = require('express')
const salesController = require('../controllers/salesController')
const router          = express.Router()

router.post('/', salesController.postSales)

router.get('/', salesController.getAllSales)
router.get('/:id', salesController.getSalesById)
router.get('/category/:category', salesController.getSalesByCategory)
router.get('/product/:id', salesController.getSalesByProductId)

router.patch('/:id', salesController.updateSalesById)

router.delete('/:id', salesController.deleteSalesById)

module.exports = router