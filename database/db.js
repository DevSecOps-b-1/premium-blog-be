const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: process.env.PG_DB_USER,
  password: process.env.PG_DB_PASSWORD,
  port: 5432,
  host: process.env.PG_DB_HOST,
  database: process.env.PG_DB_NAME,
});

module.exports = pool;
