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
const funnelAction = require('./funnel');

class DataMaster {
  //=============================constructor=================================
  // Takes no parameters
  // set connected to false
  constructor() {
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
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${
        process.env.DB_HOST
      }/${process.env.DB_NAME}?retryWrites=true`,
      { useNewUrlParser: true }
    );
    this.connected = true;
  }
  //=============================================================================

  //=============================connect when mutating ============================
  /**
   * This is different from regular connect. This gives the admin options whether
   * he/she wants to use the development database or the production database.
   * Going to be used when seeding the database.
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
   *
   * @param {*} req -> the request from the client
   * @param {*} res -> the response from the server
   * This function finds all the businesses. Also has an option to
   * find by filtering the name.
   */
  find(req, res) {
    if (!this.connected) {
      this.connect();
    }

    Business.find()
      .where('attributes.aura')
      .regex(req.query.aura || '')
      // .where('categories.alias')
      // .regex(req.query.category || '')
      // call funnel
      // return from funnel

      //.then(businesses => res.json(businesses))

      .then(businesses =>
        res.json(funnelAction(req.query.category, businesses))
      )

      .then(() => this.disconnect());
  }
  //= =============================================================================

  //= ====================find business by alias===================================
  /**
   *
   * @param {*} aliasParameter -> parameter for the alias
   * This function is not executed by the client. They don't need to know about
   * this function.
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
  //= ===============================================================================

  //= =====================================add 1 to database=========================
  /**
   *
   * @param {*} addedDocument -> item/object to be added into the database
   * Not executed by the client, this is a server function.
   * @param {*} nameDB -> name of the db to send it to.
   */
  addToEntry(addedDocument, nameDB) {
    if (!this.connected) {
      this.connectForMutations(nameDB);
    }
    Business.create(addedDocument)
      .then(() => this.disconnect())
      .catch(err => console.error(err));
  }
  //=================================================================================

  //===================================seed the database=============================
  /**
   *
   * @param {*} addedDocuments -> objects to be added into the database.
   * works the same as the addToEntry function LOL.
   * @param {*} nameDB -> name of the db to send it to.
   */
  seed(addedDocuments, nameDB) {
    if (!this.connected) {
      this.connectForMutations(nameDB);
    }
    Business.deleteMany({})
      .then()
      .catch(err => console.log(err));
    Business.create(addedDocuments)
      .then(() => this.disconnect())
      .catch(err => console.error(err));
  }
  //=================================================================================
}

module.exports = DataMaster;
