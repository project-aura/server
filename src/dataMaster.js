/* Data Master -> this file contains functions to manipulate the databse
 * add, set, get will be implemented eventually
 */
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('businessLA.json');
const db = lowdb(adapter);

// add to database
dbAdd = (objectEntry) => {
    db.get('businessData')
        .push(objectEntry)
        .write();
}

module.exports = {
    dataMaster,
};
