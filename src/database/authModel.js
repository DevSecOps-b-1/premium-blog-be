const pool = require("./db");

// Register User
module.exports.registerUser = async (username, email, password) => {
  try {
    const query = `
          INSERT INTO users (username, email, password, is_premium)
          VALUES ($1, $2, $3, FALSE)
          RETURNING id, username, email;
        `;
    const result = await pool.query(query, [username, email, password]);
    return result.rows[0];
  } catch (error) {
    console.log("register failed");
    console.log(error);
    return error;
  }
};

// Login (Vulnerable to SQL Injection)
module.exports.loginUser = async (email, password) => {
  try {
    const query = `
          SELECT id, username, email, password FROM users 
          WHERE email = '${email}' 
          AND password = '${password}';
        `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.log("Failed to querying database");
    console.log(error);
    return error;
  }
};
