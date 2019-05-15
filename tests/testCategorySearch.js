/**
 * This file
 * 1. takes all of the businesses
 * 2. reads the categories array of each business
 * 3. figures out the category of the business from the given subcategories
 * 4. saves it in the field called 'categorySearch'
 * 5. saves it back to the DB. -> Call updateOne() save each time its
 * updated.
 * That was a mouthful
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const businessController = require('../controllers/business.controller');
const DataMaster = require('../controllers/DataMaster');
const categories = require('../data/categories');

const dataMaster = new DataMaster(process.env.ENVIRONMENT);
dataMaster.connectForMutations(process.env.ENVIRONMENT);
