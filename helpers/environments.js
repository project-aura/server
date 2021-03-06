const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });

/**
 * Use this for choosing between environments.
 */
const environments = {
  development: process.env.DB_NAME_TEST,
  production: process.env.DB_NAME,
};

module.exports = environments;
