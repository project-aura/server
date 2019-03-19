/**
 *  TEST THE DATA MASTER
 */
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const { dataMaster } = require('./../src/dataMaster');
const businessLA = require('../sample-data/los-angeles-data/businessLA')

function seed() {
    const adapter = new FileSync('dummyDB.json', {
        defaultValue: { businessDataFake: businessLA },
    });
    console.log('DB has been seeded');

    // then add another one for fun
    const db = lowdb(adapter);
    try{
        dataMaster.dbAdd({
            name: 'Fake Business',
            address: '10101 Fake St',
            city: 'Fake City',
            state: 'FS',
            postal_code: '10101',
            attributes: {
                Aura: 'fake',
            },
            img: 'none',
            categories: 'Faking it',
        });
        console.log('Successful add');
    }
    catch(error){
        console.error(error);
    }
}

seed();


