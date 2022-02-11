const connection = require('../database/connection');

module.exports = {
    async index(request, response) {

        const destino = await connection('destinos').select('*');

        return response.json(destino);
    },


    async create(request, response) {
        const { nome, sigla } = request.body;

        await connection('destinos').insert({
            nome,
            sigla,
        })

        return response.json({ nome })
    }

};