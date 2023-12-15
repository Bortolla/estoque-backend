const usersService = require('../services/usersService')

exports.postUser = async (req, res, next) => {
    const { name, email, password, permission } = req.body

    const response = await usersService.postUser(name, email, password, permission)
    response.sendResponse(res)
}

exports.getUsersByFilter = async (req, res, next) => {
    const { key, value } = req.body

    const response = await usersService.getUsersByFilter(key, value)
    response.sendResponse(res)
}

exports.getAllUsers = async (req, res, next) => {
    const response = await usersService.getAllUsers()
    response.sendResponse(res)
}

exports.getUserById = async (req, res, next) => {
    const { id } = req.params
    
    const response = await usersService.getUserById(id)
    response.sendResponse(res)
}

exports.deleteUserById = async (req, res, next) => {
    const { id } = req.params
    
    const response = await usersService.deleteUserById(id)
    response.sendResponse(res)
}

exports.updateUserById = async (req, res, next) => {
    const { id }            = req.params
    const { field, value }  = req.body

    const response = await usersService.updateUserById(id, field, value)
    response.sendResponse(res)
}

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body

    const response = await usersService.loginUser(email, password)
    response.sendResponse(res)
}