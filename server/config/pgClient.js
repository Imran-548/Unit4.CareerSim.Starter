const pg = require("pg");
const client = new pg.Client({
  user: "capston_backend_user",
  host: "dpg-co9jaltjm4es73b092m0-a.oregon-postgres.render.com",
  database: "capston_backend",
  password: "DBSBZiBfQ2ZwseMr3wZ39qx7dC2nKc0r",
  port: "5432",
  ssl: "true",
});

module.exports = client;
