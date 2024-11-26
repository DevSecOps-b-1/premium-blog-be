const fs = require("fs");
const { exit } = require("process");

const getSecret = (envVar, fileEnvVar) => {
  if (process.env[fileEnvVar]) {
    try {
      return fs.readFileSync(process.env[fileEnvVar], "utf8").trim();
    } catch (err) {
      console.error(`Failed to read secret from file (${fileEnvVar}): ${err.message}`);
      exit(1);
    }
  }
  return process.env[envVar] || null;
};

module.exports = getSecret;
