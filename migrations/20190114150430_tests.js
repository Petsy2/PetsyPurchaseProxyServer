
exports.up = function(knex, Promise) {
    return knex.schema.createTable('petsTests', function(table) {
        table.increments('pet_id').primary();
        table.string('class').notNullable();
        table.string('family').notNullable();
        table.string('genus').notNullable();
        table.string('species').notNullable();
        table.integer('price').notNullable();
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('petsTests');
};
