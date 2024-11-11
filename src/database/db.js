const Pool = require("pg").Pool;
const  getSecret  = require("../utils/server/secret");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PG_DB_USER,
  password: getSecret("PG_DB_PASSWORD", "PG_DB_PASSWORD_FILE"),
  port: 5432,
  host: process.env.PG_DB_HOST,
  database: process.env.PG_DB_NAME,
});

module.exports = pool;
