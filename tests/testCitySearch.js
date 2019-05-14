/**
 * This file 
 * 1. takes all of the businesses
 * 2. reads the postal code of each business
 * 3. figures out the city of the business from the given postal code
 * 4. saves it in the field called 'citySearch'
 * 5. saves it back to the DB. -> Call updateOne() save each time its
 * updated.
 * That was a mouthful
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const businessController = require('../controllers/business.controller');
const DataMaster = require('../controllers/DataMaster');

// connect to DB
const dataMaster = new DataMaster(process.env.ENVIRONMENT);
dataMaster.connectForMutations(process.env.ENVIRONMENT);