const User = require('../models/UserModel')

exports.postUser = async (name, email, password, permission) => {
    const user = new User({ name, email, password, permission })

    return await user.save()
}

exports.getAllUsers = async () => {
    return User.find({}, '-__v -password')
}

exports.getUsersByFilter = async (key, value) => {
    return await User.find({ [key]: [value] }, '-__v')
}
 
exports.getUserById = async (id) => {
    return User.findOne({ _id: id }, '-__v -password')
}

exports.getUserByEmail = async (email) => {
    return User.findOne({ email: email }, '-__v')
}

exports.deleteUserById = async (id) => {
    return User.deleteOne({ _id: id })
}