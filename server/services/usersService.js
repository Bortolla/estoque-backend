const bcrypt          = require('bcrypt')
const { ResponseDTO } = require('../dtos/Response')
const usersData       = require('../data/usersData')

exports.postUser = async (name, email, password, permission) => {
    try {
        if (!name) {
            return new ResponseDTO('Error', 400, 'Nome não preenchido')
        }

        if (!email) {
            return new ResponseDTO('Error', 400, 'Email não preenchido')
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

        if (password.length < 5) {
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

        const response = await usersData.updateUserById(id, field, value)
        return new ResponseDTO('Success', 200, 'ok', response)

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

exports.updateUserById = async (id, value, field) => {
    try {
        if (!field) {
            return new ResponseDTO('Error', 400, 'Campo que deseja ser atualizado não preenchido.')
        }

        if (!value) {
            return new ResponseDTO('Error', 400, 'Valor do campo que deseja ser atualizado não preenchido.')
        }

        const user = await usersData.getUserById(id)

        if (!user) {
            return new ResponseDTO('Error', 404, 'Usuário não encontrado.')
        }

        user.field = value

        await user.validate()
        await user.save()

        const response = await usersData.getUserById(id)

        return new ResponseDTO('Success', 200, 'ok', response)

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}