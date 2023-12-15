const express            = require('express')
const productsController = require('../controllers/productsControllers')
const router             = express.Router()

router.post('/', productsController.postProduct)
router.post('/filter', productsController.getProductByFilter)

router.get('/', productsController.getProducts)
router.get('/category/:category', productsController.getProductByCategory)
router.get('/:id', productsController.getProductById)

router.patch('/:id', productsController.updateProductById)
router.patch('/inventory/increment/:id', productsController.incrementQuantityById)
router.patch('/inventory/decrement/:id', productsController.decrementQuantityById)

router.delete('/:id', productsController.deleteProductById)
router.delete('/', productsController.cleanDatabase)

module.exports = router