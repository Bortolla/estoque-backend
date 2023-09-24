const express            = require('express')
const productsController = require('../controllers/productsControllers')
const router             = express.Router()

router.post('/', productsController.postProduct)

router.get('/', productsController.getProducts)
router.get('/:id', productsController.getProductById)

router.patch('/:id', productsController.updateProductById)

router.delete('/:id', productsController.deleteProductById)

module.exports = router