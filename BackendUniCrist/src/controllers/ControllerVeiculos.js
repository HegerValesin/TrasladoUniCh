const connection = require('../database/connection');

module.exports = {
    async index(request, response) {

        const veiculos = await connection('veiculos').select('*');

        return response.json(veiculos);
    },


    async create(request, response) {
        const { descricao, capmax } = request.body;

        await connection('veiculos').insert({
            descricao,
            capmax
        })

        return response.json({ descricao })
    }



};