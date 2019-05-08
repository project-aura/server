const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const businessController = require('../controllers/business.controller');

// tests for 'favorite' feature in here.