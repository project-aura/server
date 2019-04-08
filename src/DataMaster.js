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
const Business = require('../models/business.model');
const User = require('../models/user.model');
const funnelAction = require('./funnel');

class DataMaster {
  //=============================constructor=================================
  /**
   * 
   * @param {*} dbName -> The name of the database to be used.
   * Either the dev or production databases. The function that connects
   * with intentions of mutating the database then knows which database
   * to mutate.
   */
  constructor(dbName) {
    this.dbName = dbName;
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
      .then(businesses =>
        res.json(funnelAction(req.query.category, businesses))
      )
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
   * @param {*} addedDocuments -> objects to be added into the database.
   * WARNING: wipes the database clean everytime and repopulates
   */
  seed(addedDocuments) {
    if (!this.connected) {
      this.connectForMutations(this.dbName);
    }
    Business.deleteMany({})
      .then()
      .catch(err => console.error(err));
    Business.create(addedDocuments)
      .then(() => this.disconnect())
      .catch(err => console.error(err));
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
      console.error(err);
      this.disconnect();
    }
  }
  //=================================================================================

  //============================seed the user database for tests=====================
  /**
   * ABOUT THIS SEED: wipes out the database and adds the new seeded objects
   * @param {*} addedUsers -> users to be added into the database
   */
  seedUser(addedUsers) {
    if(!this.connected) {
      this.connectForMutations(this.dbName);
    }
    User.deleteMany({})
      .then()
      .catch(err => console.error(err));
    User.create(addedUsers)
      .then(() => this.disconnect())
      .catch(err => console.error(err));
  }
  //================================================================================

  //==================================== Find Single User ==========================

  /**
   * Finds a single user by their username
   * @param {String} username -> username of searched user
   * @param {String} nameDB -> name of the database to send it to.
   */
  async findUser(username, nameDB) {
    if (!this.connected) {
      this.connectForMutations(nameDB);
    }
    try {
      const user = await User.findOne({ username });
      return user;
    } catch (err) {
      console.error(err);
      this.disconnect();
    }
  }
  //================================================================================
}

module.exports = DataMaster;
