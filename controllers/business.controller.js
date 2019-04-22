/**
 * Business Controller -> 1 to 1 relationship with Business Model
 * Cuz were bored like that
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const CustomError = require('../helpers/CustomError');
const Business = require('../models/business.model');
const funnelAction = require('../helpers/funnel');
const options = require('../helpers/options');

const businessController = {
    //===========================find businesses=============================================
    /**
     * 
     * @param {*} req -> request from the client
     * @param {*} res -> response from the server
     * This function finds all the businesses. Filters based on
     * aura and category filters.
     */
    find(req, res) {
        Business.find()
          .where('attributes.aura')
          .regex(req.query.aura || '')
          .where('city')
          .regex(req.query.city || '')
          .then(businesses => res.json(funnelAction(req.query.category, businesses)))
          .catch(err => res.status(500).json({ message: err.message }));
      },
    //=======================================================================================

    //============================add business===============================================
    async add(addedDocument, options) {
        if(options === options.batch) {
            // batch add
            try {
                await Business.insertMany(addedDocument, { ordered: false });
                return
            } catch(err) {
                console.error(err);
            }
        } else if(options === options.one) {
            // add one
            try {
                await Business.insertOne(addedDocument);
                return
            } catch(err) {
                console.error(err);
            }
        } else {
            return new CustomError(500, `invalid options parameter`);
        }
    }
    //=======================================================================================
} 

module.exports = businessController;