/**
 * Field names needed to be changed sometimes. This is why this
 * file exists.

 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const businessController = require('../controllers/business.controller');
const DataMaster = require('../controllers/DataMaster');

// connect to DB
const dataMaster = new DataMaster(process.env.ENVIRONMENT);
dataMaster.connectForMutations(process.env.ENVIRONMENT);

businessController.renameField({
    'usersVoted': 'usersVotedAura',
});

