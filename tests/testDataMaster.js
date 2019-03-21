/**
 *  TEST THE DATA MASTER
 */

const { DataMaster } = require('./../src/DataMaster');

insertedFakeData = {
    name: 'Fake2',
    address: 'Fake St2.',
    city: 'Fake City2',
    state: 'Fake State2',
    postal_code: 'Fake Zip2',
    attributes: {
        Aura: 'fake2',
    },
    img: 'fakeimageurl2',
    categories: 'faking2',
    fake_category: 'a fake category, succeeds if added2'
};

// test addEntry()
const database = new DataMaster('businessLAFake.json');
database.addEntry(insertedFakeData);

// test seed()
const businessLAFake = require('./businessLAFake'); // import the array
const db2 = new DataMaster('moreJSONs.json');
db2.seed(businessLAFake);








