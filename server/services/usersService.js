const secret          = process.env.SECRET
const bcrypt          = require('bcrypt')
const jwt             = require('jsonwebtoken')
const { ResponseDTO } = require('../dtos/Response')
const usersData       = require('../data/usersData')

exports.postUser = async (name, email, password, permission) => {
    try {
        if (!name) {
            return new ResponseDTO('Error', 400, 'Nome não preenchido')
        }

        if (name.length <= 4) {
            return new ResponseDTO('Error', 400, 'Nome curto')
        }

        if (!email) {
            return new ResponseDTO('Error', 400, 'Email não preenchido')
        }

        if (email.length <= 4) {
            return new ResponseDTO('Error', 400, 'Email curto')
        }

        if (await usersData.getUserByEmail(email)) {
            return new ResponseDTO('Error', 400, 'Email já está sendo utilizado')
        }

        if (!permission) {
            return new ResponseDTO('Error', 400, 'Permissão não preenchida')
        }

        if (!password) {
            return new ResponseDTO('Error', 400, 'Senha não preenchida')
        }

        if (password.length <= 4) {
            return new ResponseDTO('Error', 400, 'Senha curta')
        }

        const salt      = await bcrypt.genSalt(12)
        const hashedPwd = await bcrypt.hash(password, salt)
        const response  = await usersData.postUser(name, email, hashedPwd, permission)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getAllUsers = async () => {
    try {
        const response = await usersData.getAllUsers()
        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.getUserById = async (id) => {
    try {
        const response = await usersData.getUserById(id)
        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.updateUserById = async (id, field, value) => {
    try {
        if (!field) {
            return new ResponseDTO('Error', 400, 'Campo não preenchido')
        }

        if (!value) {
            return new ResponseDTO('Error', 400, 'Valor não preenchido')
        }

        const user = await usersData.getUserById(id)

        if (!user) {
            return new ResponseDTO('Error', 404, 'Usuário não encontrado')
        }

        user[field]= value 

        await user.validate()
        await user.save()

        const response = await usersData.getUserById(id)

        return new ResponseDTO('Success', 200, 'aqui', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.deleteUserById = async (id) => {
    try {
        const response = await usersData.deleteUserById(id)
        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}

exports.loginUser = async (email, password) => {
    try {
        if (!email) {
            return new ResponseDTO('Error', 422, 'Email não preenchido')
        }

        if (!password) {
            return new ResponseDTO('Error', 422, 'Senha não preenchida')
        }

        const user = await usersData.getUserByEmail(email)

        if (!user) {
            return new ResponseDTO('Error', 422, 'Usuário não encontrado')
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return new ResponseDTO('Error', 400, 'Senha inválida')
        }

        const token = jwt.sign({
            id: user._id
        }, secret)

        const { userName, userEmail } = user

        return new ResponseDTO('Success', 200, 'Usuário logado', { token, userName, userEmail })

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}