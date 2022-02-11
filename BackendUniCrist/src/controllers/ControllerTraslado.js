const connection = require('../database/connection');

module.exports = {

    async index(request, response) {

        const traslado = await connection('traslado')
            .join('users', 'users.id', '=', 'traslado.id_user')
            .join('veiculos', 'veiculos.id', '=', 'traslado.id_veiculo')
            .join('destinos', 'destinos.id', '=', 'traslado.id_destino')
            .select(
                'traslado.*',
                'users.name',
                'veiculos.descricao',
                'destinos.sigla',
            );

        return response.json(traslado);
    },

    async create(request, response) {
        const { data_ped, turno, id_destino, id_veiculo, ativo } = request.body;
        const id_user = request.headers.authorization;

        const qtd_veiculo = await connection('veiculos')
            .where('id', id_veiculo)
            .select('*')

        //verifica se tem algum programação ativa
        const isAtivo = await connection('traslado')
            .where({
                'data_ped': data_ped,
                'id_destino': id_destino,
                'id_veiculo': id_veiculo,
                'turno': turno,
            })
            .count('* as count')

        console.log(isAtivo);


        //Não permite o usuario agendar viagems para o mesmo dia, turno e destino
        const isAtivoUser = await connection('traslado')
            .where({
                'data_ped': data_ped,
                'id_user': id_user,
                'id_destino': id_destino,
                'turno': turno,
            })
            .count('* as count')

        console.log(isAtivoUser);

        const isAtivoUserT = await connection('traslado')
            .where({
                'data_ped': data_ped,
                'id_user': id_user,
                'turno': turno,
            })
            .count('* as count')


        let capacidade = parseInt(JSON.stringify(qtd_veiculo[0].capmax));
        let qtdMovim = JSON.stringify(isAtivo[0].count);
        let AtivoUser = JSON.stringify(isAtivoUser[0].count);
        let AtivoUserT = JSON.stringify(isAtivoUserT[0].count);

        //se tiver alguma programação ativa, não permite criar outra
        if (AtivoUser != 0) {
            return response.status(401).json({ error: 'Exedido o limite de viagens agendadar por Turno.' });
        };



        if (qtdMovim >= capacidade) {
            return response.status(401).json({ error: 'Capacidade do veiculo atingida.' });
        };

        const [id] = await connection('traslado').insert({
            id_user,
            data_ped,
            turno,
            id_destino,
            id_veiculo,
            ativo
        });

        return response.json({ id, data_ped, turno, id_destino, id_veiculo, ativo });
    },

    async delete(request, response) {
        const { id } = request.params;
        const id_user = request.headers.authorization;

        const traslado = await connection('traslado')
            .where('id', id)
            .select('id_user')
            .first();

        if (traslado.id_user != id_user) {
            return response.status(401).json({ error: 'Operação não Permitida.' });
        }

        await connection('traslado').where('id', id).delete();

        return response.status(204).send();
    }

};