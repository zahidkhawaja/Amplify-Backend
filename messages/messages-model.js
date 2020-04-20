const db = require("../database/dbConfig");

module.exports = {
    find,
    add,
    remove
}

function find() {
    return db("messages");
}

function add(message) {
    return db("messages").insert(message);
}

function remove(id) {
    return db("messages").where("id", id).del();
}
