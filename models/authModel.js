const pool = require("../database/db");

// Register User
module.exports.registerUser = async (username, email, password) => {
  try {
    const query = `
          INSERT INTO users (username, email, password, is_premium)
          VALUES ($1, $2, $3, FALSE)
          RETURNING id;
        `;
    const result = await pool.query(query, [username, email, password]);
    return result.rows[0];
  } catch (error) {
    console.log("register failed");
    console.log(error);
  }
};

// Login (Vulnerable to SQL Injection)
module.exports.loginUser = async (username, password) => {
  try {
    const query = `
          SELECT * FROM users 
          WHERE username = '${username}' 
          AND password = '${password}';
        `;
    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    console.log("login failed");
    console.log(error);
  }
};
