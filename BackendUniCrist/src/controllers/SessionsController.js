const connection = require('../database/connection');


//Consulta de login do usurário
module.exports = {

    async create(request, response) {
        const { login, senha } = request.body;

        const isLogin = await connection('users')
            .where({
                'login': login,
                'senha': senha
            })
            .select('name', 'tip_user', 'id')
            .first();

        if (!isLogin) {
            return response.status(408).json({ error: 'Login ou Senha inválidos' });
        }

        return response.json(isLogin);
    }
};