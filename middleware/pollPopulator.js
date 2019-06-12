/**
 * Poll populator populates the poll based of aura 
 * from the webscraper and the categorySearch field.
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const DataMaster = require('../controllers/DataMaster');
const businessController = require('../controllers/business.controller');

