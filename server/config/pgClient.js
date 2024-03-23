const pg = require("pg");
const client = new pg.Client("postgres://localhost/ecommerce_db");

module.exports = client;
