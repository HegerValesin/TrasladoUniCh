const connection = require('../database/connection');
//const formatDate = require('../classes/Utils');

//Faz consulta de todos os traslado feito pelo usuario logado
module.exports = {

    async index(request, response) {
        const id_user = request.headers.authorization;
        const { page = 1 } = request.query;

        const traslado = await connection('traslado')
            .leftJoin('users', 'users.id', '=', 'traslado.id_user')
            .leftJoin('veiculos', 'veiculos.id', '=', 'traslado.id_veiculo')
            .leftJoin('destinos', 'destinos.id', '=', 'traslado.id_destino')
            .limit(4)
            .offset((page - 1) * 4)
            .where('id_user', id_user,)
            .orderBy('traslado.data_ped', 'desc')
            .select(
                'traslado.*',
                'users.name',
                'veiculos.descricao',
                'destinos.sigla',
            );

        /**for (let i = 0; i < traslado.length; i++) {

            traslado[i].data_ped = formatDate.dateFormat(traslado[i].data_ped);


        }*/


        return response.json(traslado);
    }
}