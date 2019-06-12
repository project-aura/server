/**
 * Poll populator populates the poll based of aura 
 * from the webscraper and the categorySearch field.
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const DataMaster = require('../controllers/DataMaster');
const businessController = require('../controllers/business.controller');

const dataMaster = new DataMaster(process.env.ENVIRONMENT);
dataMaster.connectForMutations(process.env.ENVIRONMENT);

/**
 * 1. Obtain all the businesses in the database (readMany)
 * 2. For each business, read the attributtes.aura field
 *      -> trim whitespace
 *      -> place each word into an array with the commas as delimiters
 *      -> for each entry in the array, find the appropriate key in the 
 *          auras field and increment that
 *      -> update the new auras field in the document
 */

