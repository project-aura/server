/* Data Master -> this file contains functions to manipulate the databse
 * add, set, get will be implemented eventually
 */
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
//const adapter = new FileSync('businessLA.json');
const adapter = new FileSync('dummyDB.json');
const db = lowdb(adapter);

const dataMaster = {
    // add to database
    dbAdd: (dbJsonName, fileSyncer, objectEntry) => {
        //db.get('businessData')
        db.get('businessDataFake')
            .push(objectEntry)
            .write();
    }
}

module.exports = {
    dataMaster,
};
