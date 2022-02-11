const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const id_user = request.headers.authorization;
        const h_date = request.headers.date;

        const Teste = await connection('traslado')
            .where({
                'id_user': id_user,
                'data_ped': h_date
            })
            .select('*')





        return response.json(Teste);
    }
}