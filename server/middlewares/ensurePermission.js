const usersData = require('../data/usersData')

exports.ensurePermission = async (req, res, next) => {
    try {
        const userId = req.userId
        const user   = await usersData.getUserById(userId)

        if (!user) {
            res.status(404).json({
                status: 404,
                msg:    'Error',
                data:   'Usuário não encontrado'
            })
        }

        if (user.permission == 'admin') {
            next()
        } else {
            res.status(400).json({
                status: 400,
                msg:    'Error',
                data:   'Usuário não tem permissão'
            })
        }

    } catch (error) {
        console.log(`Erro: ${error}`)
        return new ResponseDTO('Error', 500, 'Erro no servidor')
    }
}