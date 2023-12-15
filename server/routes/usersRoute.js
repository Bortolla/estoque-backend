const express         = require('express')
const usersController = require('../controllers/usersController')
const router          = express.Router()

router.post('/', usersController.postUser)
router.post('/filter', usersController.getUsersByFilter)

router.get('/', usersController.getAllUsers)
router.get('/:id', usersController.getUserById)

router.patch('/:id', usersController.updateUserById)

router.delete('/:id', usersController.deleteUserById)
router.delete('/', usersController.cleanDatabase)

router.post('/login', usersController.loginUser)

module.exports = router