/**
 *  TEST THE DATA MASTER
 */

const { dataMaster } = require('./../src/dataMaster');

insertedFakeData = {
    name: 'Fake',
    address: 'Fake St.',
    city: 'Fake City',
    state: 'Fake State',
    postal_code: 'Fake Zip',
    attributes: {
        Aura: 'fake',
    },
    img: 'fakeimageurl',
    categories: 'faking',
    fake_category: 'a fake category, succeeds if added'
};

dataMaster.dbAdd('businessLAFake.json', 'businessDataFake', insertedFakeData);







