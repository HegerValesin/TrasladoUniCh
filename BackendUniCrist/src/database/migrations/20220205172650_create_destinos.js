/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {

    return knex.schema.createTable('destinos', function (table) {
        table.increments('id').primary();

        table.string('nome').notNullable();
        table.string('sigla').notNullable();
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {

    return knex.schema.dropTable('destinos');

};
