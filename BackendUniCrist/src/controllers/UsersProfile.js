const connection = require('../database/connection');

module.exports = {

    async index(request, response) {

        const usersprofile = await connection('users')
            .select('*');

        return response.json(usersprofile);
    },

    async indexid(request, response) {
        const { id } = request.params;

        const usersprofile = await connection('users')
            .where('id', id)
            .select('*')
            .first();

        return response.json(usersprofile);
    },

    async edit(request, response) {
        const { id, name, login, senha, email, campos, tip_user } = request.body;

        const usersprofile = await connection('users')
            .where('id', id)
            .first();

        if (usersprofile.id != id) {
            return response.status(401).json({ error: 'Operação não Permitida.' });
        }

        await connection('users').where('id', id).update({
            id,
            name,
            login,
            senha,
            email,
            campos,
            tip_user
        });

        return response.status(204).send();
    },

    async delete(request, response) {
        const { id } = request.params;

        const usersprofile = await connection('users')
            .where('id', id)
            .first();

        if (usersprofile.id != id) {
            return response.status(401).json({ error: 'Operação não Permitida.' });
        }

        await connection('users').where('id', id).delete();

        return response.status(204).send();
    }

};