/* Data Master -> this file contains functions to manipulate the databse
 * add, set, get will be implemented eventually
 */
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const dataMaster = {
    // ===========================add to database===============================
    /* dbAdd parameters
     * @nameDBJSON -> this is the name of the JSON file DB passed on to FileSync
     * @nameJSONParent -> this is the name of array that holds the JSON objects
     *                      in the database. Yes, nameJSONParent is inside
     *                      of nameDBJSON.
     * @objectEntry -> the object to be added into the database.
     * NOTE -> FileSync(nameDBJSON) knows exactly where to find your file.
     * There is NO NEED to specify pathname. Crazy I know. 
     */
    dbAdd: (nameDBJSON, nameJSONParent ,objectEntry) => {
        // FileSync and adapter integration in this section
        // instead of close to the head part
        const adapter = new FileSync(nameDBJSON);
        const db = lowdb(adapter);
        db.get(nameJSONParent)
            .push(objectEntry)
            .write();
    },
    // ==========================================================================

    //==============================set a database field==========================
    /* dbSet parameters
     * @nameDBJSON -> this is the name of the JSON file DB passed on to FileSync
     * @nameJSONParent -> this is the name of array that holds the JSON objects
     *                      in the database. Yes, nameJSONParent is inside
     *                      of nameDBJSON.
     * @fieldOfInterest -> the field that needs to be updated
     * @fieldUpdate -> the new value to be put on the field
     */
    dbSet:(nameDBJSON, nameJSONParent, fieldOfInterest, fieldUpdate) => {
        // FileSync and adapter integration in this section
        // instead of close to the head part
        const adapter = new FileSync(nameDBJSON);
        const db = lowdb(adapter);
        //db.get(nameJSONParent)

    }
    //============================================================================
}

module.exports = {
    dataMaster,
};
