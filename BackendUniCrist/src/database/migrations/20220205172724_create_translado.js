/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {

    return knex.schema.createTable('translado', function (table) {

        table.increments('id').primary();

        table.date('data_ped').notNullable();
        table.string('turno').notNullable();

        table.integer('id_destino').notNullable();
        table.integer('id_veiculo').notNullable();

        table.foreign('id_destino').references('id').inTable('destinos');
        table.foreign('id_veiculo').references('id').inTable('veiculos');


    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

    return knex.schema.dropTable('translado');

};
