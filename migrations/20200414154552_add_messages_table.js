exports.up = function(knex) {
    return knex.schema
    
    // Messages table
    .createTable("messages", tbl => {
        tbl.increments();
        tbl.string('username', 10).notNullable().defaultTo("Guest");
        tbl.string('message', 140).notNullable();
        tbl.timestamp('created_at').defaultTo(knex.fn.now());
    })

    // Users table
    .createTable("users", tbl => {
        tbl.increments();
        tbl.string("username", 128).notNullable().unique();
        tbl.string("password", 128).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("messages");
};