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

class DataMaster {
  //=============================constructor=================================
  // Takes no parameters
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
   */
  connect() {
      this.connected = true;
      mongoose.connect(
          `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true`,
          {useNewUrlParser: true} 
      )
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
    if(!this.connected) {
      this.connect();
    }
      Business
          .find()
          .where('attributes.aura')
          .regex(req.query.aura || '')
          .then(businesses => res.json(businesses))
          .then(() => this.disconnect());
  }
  //==============================================================================

  //=====================find business by alias===================================
  /**
   * 
   * @param {*} aliasParameter -> parameter for the alias
   * This function is not executed by the client. They don't need to know about
   * this function. 
   */
  
  findByAlias(aliasParameter) {
    if(!this.connected) {
      this.connect();
    }
    Business
      .find({alias: aliasParameter})
      .then(returnedObj => console.log(returnedObj))
      .then(() => this.disconnect())
      .catch(err => console.error(err));
  }
  //================================================================================

  //======================================add 1 to database=========================
  /**
   * 
   * @param {*} addedDocument -> item/object to be added into the database
   * Not executed by the client, this is a server function.
   */
  addToEntry(addedDocument) {
    if(!this.connected) {
      this.connect();
    }
    Business
      .create(addedDocument)
      .then(() => this.disconnect())
      .catch(err => console.error(err));
  }
  //=================================================================================

  //===================================seed the database=============================
  /**
   * 
   * @param {*} addedDocuments -> objects to be added into the database.
   * works the same as the addToEntry function LOL. 
   */
  seed(addedDocuments) {
    if(!this.connected) {
      this.connect();
    }
    Business
      .create(addedDocuments)
      .then(() => this.disconnect())
      .catch(err => console.error(err));
  }
  //=================================================================================
}


module.exports = DataMaster;