/**
 * City Converter - converts the cities from the businesses
 * 1. takes all of the businesses
 * 2. reads the postal code of each business
 * 3. figures out the city of the business from the given postal code
 * 4. saves it in the field called 'citySearch'
 * 5. returns the businesses with a field called 'citySearch'
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const businessController = require('../controllers/business.controller');
const DataMaster = require('../controllers/DataMaster');