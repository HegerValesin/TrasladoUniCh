/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {

    return knex.schema.createTable('veiculos', function (table) {
        table.increments('id').primary();

        table.string('descricao').notNullable();
        table.string('capmax').notNullable();
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

    return knex.schema.dropTable('veiculos');

};
