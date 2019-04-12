/* eslint-disable spaced-comment */
/* Data Master -> this file contains functions to manipulate the database
 * it serves as the interface between the router dataSnatcher.js and
 * the database. But why though?
 * Having the function calls to mongoose/mongo in one place that this
 * program is database agnostic, in the case the a different service
 * is to be desired in future sprints/iterations.
 * Also, inputs to these functions are error checked by the router.
 * No worries.
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const CustomError = require('../helpers/CustomError');
const Business = require('../models/business.model');
const User = require('../models/user.model');
const funnelAction = require('../helpers/funnel');

class DataMaster {
  //=============================constructor=================================
  /**
   * @param {*} dbName -> name of the database to be used
   * from npm start or npm run dev
   * No arguments can only be used when running in either npm start
   * or npm rub dev. Arguments to that will determine the environment used.
   */
  constructor(dbName) {
    if (!dbName) {
      this.dbName = process.env.ENVIRONMENT;
    } else {
      this.dbName = dbName;
    }
    this.connected = false;
  }
  //==========================================================================

  //=============================connect to the DB============================
  /**
   * The reason as to why the connect is not within the constructor
   * is that you do not want to connect every single time you create a
   * DataMaster object. Explicit connecting and disconnecting will be
   * implemented.
   * Update: Only used by the find() function. The functions: addToEntry(),
   * seed() uses connectForMutations() instead.
   */
  connect() {
    mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${
        process.env.DB_NAME
      }?retryWrites=true`,
      { useNewUrlParser: true }
    );
    this.connected = true;
  }
  //=============================================================================

  //=============================connect when mutating ============================
  /**
   * This is different from regular connect. This allows the DataMaster to write
   * in different databases depending on the value passed to it.
   */
  connectForMutations(nameDB) {
    if (nameDB === process.env.DB_NAME || nameDB === process.env.DB_NAME_TEST) {
      mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${
          process.env.DB_HOST
        }/${nameDB}?retryWrites=true`,
        { useNewUrlParser: true }
      );
      this.connected = true;
    } else {
      // throw error message if db does not exist
      console.error('The Database does not exist');
    }
  }
  //=============================================================================

  //=================================disconnect the DB===========================
  disconnect() {
    mongoose.connection.close();
    this.connected = false;
  }
  //==============================================================================

  //================================ Wrapper =====================================

  //=================================find business================================
  /**
   * @param {*} req -> the request from the client
   * @param {*} res -> the response from the server
   * This function finds all the businesses. Filters based on
   * aura and category filters.
   */
  find(req, res) {
    if (!this.connected) {
      this.connect();
    }

    Business.find()
      .where('attributes.aura')
      .regex(req.query.aura || '')
      .where('city')
      .regex(req.query.city || '')
      .then(businesses => res.json(funnelAction(req.query.category, businesses)))
      .then(() => this.disconnect());
  }
  //= =============================================================================

  //= ====================find business by alias===================================
  /**
   * This function is not executed by the client. They don't need to know about
   * this function.
   * @param {*} aliasParameter -> parameter for the alias
   */

  findByAlias(aliasParameter) {
    if (!this.connected) {
      this.connect();
    }
    Business.find({ alias: aliasParameter })
      .then(returnedObj => console.log(returnedObj))
      .then(() => this.disconnect())
      .catch(err => console.error(err));
  }
  //= ========================================================================================

  //= =====================================add 1 business to database=========================
  /**
   * Not executed by the client, this is a server function.
   * @param {*} addedDocument -> item/object to be added into the database
   */
  addToEntry(addedDocument) {
    if (!this.connected) {
      this.connectForMutations(this.dbName);
    }
    Business.create(addedDocument)
      .then(() => this.disconnect())
      .catch(err => console.error(err));
  }
  //=================================================================================

  //===================================seed the database=============================
  /**
   * ABOUT THIS SEED: wipes out the database and adds the new seeded objects
   * WARNING: wipes the database clean everytime and repopulates
   * @param {*} addedDocuments -> objects to be added into the database.
   */
  async seedBusinesses(addedDocuments) {
    if (!this.connected) {
      this.connectForMutations(this.dbName);
    }
    try {
      await Business.deleteMany({});
      await Business.insertMany(addedDocuments, { ordered: false });
      // this.disconnect();
      return;
    } catch (err) {
      console.error(err);
      this.disconnect();
    }
  }
  //=================================================================================

  /*
   * This next section will be methods that involve the user model/schema
   */

  //==============================add a new user into the database===================
  /**
   * Adds a single user
   * @param {*} addedUser -> the user object to be added into the database
   */

  async addUser(addedUser) {
    if (!this.connected) {
      this.connectForMutations(this.dbName);
    }
    try {
      const user = await User.create(addedUser);
      return user;
    } catch (err) {
      // HACK: Hike the error up to the router...
      throw err;
    }
  }
  //=================================================================================

  //============================seed the user database for tests=====================
  /**
   * ABOUT THIS SEED: wipes out the database and adds the new seeded objects
   * @param {*} addedUsers -> users to be added into the database
   */
  async seedUsers(addedUsers) {
    if (!this.connected) {
      this.connectForMutations(this.dbName);
    }
    try {
      await User.deleteMany({});
      await User.insertMany(addedUsers, { ordered: false });
      this.disconnect();
      return;
    } catch (err) {
      console.log(err);
      this.disconnect();
      throw err;
    }
  }
  //================================================================================

  //==================================== Find Single User ==========================

  async findUserByUsername(username) {
    if (!this.connected) {
      this.connectForMutations(this.dbName);
    }
    try {
      return await User.findOne({ username });
    } catch (err) {
      throw err;
    }
  }

  /**
   * Finds a single user by their username or _id
   * @param {String} queryOptions -> search options
   */
  async findUserById(id) {
    if (!this.connected) {
      this.connectForMutations(this.dbName);
    }
    try {
      return await User.findOne({ _id: id });
    } catch (err) {
      throw err;
    }
  }
  //================================================================================

  //==================================== Update Single User ==========================

  /**
   * Finds a single user by their username or _id
   * @param {String} queryOptions -> search options
   */
  async updateUserPassword(id, password) {
    if (!this.connected) {
      this.connectForMutations(this.dbName);
    }
    const res = await User.updateOne({ _id: id }, { password });
    return true;
  }

  /**
   * Finds a single user by their username or _id
   * @param {String} queryOptions -> search options
   */
  async updateUserDisplayName(id, displayName) {
    if (!this.connected) {
      this.connectForMutations(this.dbName);
    }
    console.log(displayName);
    const res = User.updateOne({ _id: id }, { displayName });
    return true;
  }
  //================================================================================
}

module.exports = DataMaster;