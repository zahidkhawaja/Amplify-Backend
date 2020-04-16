exports.up = function(knex) {
    return knex.schema.createTable('messages', tbl => {
        tbl.increments();
        tbl.string('username', 10).notNullable().defaultTo("Guest");
        tbl.string('message', 140).notNullable();
        tbl.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('messages');
};