/* Data Master -> this file contains functions to manipulate the databse
 * add, set, get will be implemented eventually
 */
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

class DataMaster {
  //= =============================constructor======================================
  /**
   * @param {*} nameDBJSON -> name of the JSON file DB passed on to FileSync.
   * About this parameter. Use an already existing JSON file if you plan to use
   * addEntry. Use whatever name if you plan to use seed.
   * NOTE -> FileSync(nameDBJSON) knows exactly where to find your file.
   * There is NO NEED to specify pathname. Crazy I know.
   */
  constructor(nameDBJSON) {
    this.nameDBJSON = nameDBJSON;
    // for uniformity 'businessData' is used as
    // nameJSONParent
    this.nameJSONParent = 'businessData';
    // set the adapter in the constructor
    this.adapter = new FileSync(this.nameDBJSON);
    this.db = lowdb(this.adapter);
  }
  //= ===========================================================================

  //= ==============================add to the database===========================
  /**
   * @param {*} objectEntry -> the object to be added into the database.
   * NOTE -> Only use addEntry if the JSON file already exists, refer to
   * the correct name of the JSON file.
   * Result -> object will be added to the end of the already existing
   * JSON File this.nameDBJSON.
   */
  addEntry(objectEntry) {
    try {
      this.db
        .get(this.nameJSONParent)
        .push(objectEntry)
        .write();
    } catch (err) {
      console.log('An Error Has Occured: \n');
      console.error(err);
    }
  }
  //= ============================================================================

  //= ================================seed the database===========================
  /**
   * @param {*} items -> An array of objects to be added into the database
   * NOTE -> Use seed if the JSON File has NOT existed yet. Use whatever name
   * you want. Use format 'whateverName.json'
   * Result -> A JSON file with the name this.nameDBJSON will be created in the
   * directory the user is in when the program is called.
   */
  seed(items) {
    try {
      // set some defaults, default nameJSONParent name should always be
      // 'businessData' because this is going to be referred like crazy.
      this.db.defaults({ businessData: [] }).write();
      // add elements from the array into seeded DB
      items.forEach(item => {
        this.addEntry(item);
      });
    } catch (err) {
      console.log('An Error Has Occured: \n');
      console.error(err);
    }
  }
  //= ===========================================================================
}

// Testing: refer to ../tests/testDataMaster.js for tests

module.exports = {
  DataMaster,
};
