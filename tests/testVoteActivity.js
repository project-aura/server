const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const businessController = require('../controllers/business.controller');
const DataMaster = require('../controllers/DataMaster');

const dataMaster = new DataMaster(process.env.ENVIRONMENT);
dataMaster.connectForMutations(process.env.ENVIRONMENT);