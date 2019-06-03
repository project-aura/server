const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const businessController = require('../controllers/business.controller');
const DataMaster = require('../controllers/DataMaster');

const dataMaster = new DataMaster(process.env.ENVIRONMENT);
dataMaster.connectForMutations(process.env.ENVIRONMENT);

businessController.updateMany({
    activities: {
        eating: 0,
        drinking: 0,
        dating: 0,
        studying: 0,
        relaxing: 0,
        exercising: 0,
        gaming: 0,
        leisure: 0,
        pleasure: 0,
        hobbies: 0,
    },
    usersVotedActivity: [],
});