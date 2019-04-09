/**
 * This file selects the environment based of npm start, 
 * npm run start or npm run dev. 
 * RULES: 
 * 1. npm start, npm run start or npm run dev -> all
 * without arguments default to production environment.
 * 2. npm start local, npm run start local and 
 * npm run dev local -> all has 'local' parameter
 * will select the development environment.
 * NOTHING RETURNED. Mutates the .env directly
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });

selectEnvironment = (environment) => {
    if(environment === 'local') {
        process.env.ENVIRONMENT = process.env.DB_NAME_TEST;
        return;
    } else if(environment !== undefined) { 
        // catch errors
        process.env.ENVIRONMENT = 'invalid';
        return;
    }
    // undefined or no parameters is the production environment.
    process.env.ENVIRONMENT = process.env.DB_NAME;
    return;
}

module.exports = selectEnvironment;