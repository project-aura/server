/**
 * Business Controller -> 1 to 1 relationship with Business Model
 * Cuz were bored like that
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const CustomError = require('../helpers/CustomError');
const Business = require('../models/business.model');
const funnelAction = require('../helpers/funnel');
const optionsHelper = require('../helpers/options');

const businessController = {
    //===========================READ OPS===================================================
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

    //===========================find business by alias======================================
    /**
     * 
     * @param {*} aliasParameter -> alias of the business to be found
     * @param {*} res -> response to the request
     */
    async findByAlias(aliasParameter, res) {
        Business.find({ alias: aliasParameter })
            .then(returnedObj => res.json(returnedObj))
            .catch(err => res.status(404).json({ message: `No business alias found. ${err.message} `}));
    },
    //========================================================================================
    //================================END READ OPS============================================

    //============================CREATE OPS===================================================
    //============================add business=================================================
    /**
     * 
     * @param {*} addedDocument -> the document or documents that have to be added
     * @param {*} options -> gives the user the option to add batch or add one. 
     * @param {*} res -> response to the request
     */
    async add(addedDocument, options, res) {
        if(optionsHelper === options.batch) {
            // batch add
            try {
                await Business.insertMany(addedDocument, { ordered: false })
                    .then(() => res.status(200).json({ message: `Success: Batch Added` }));
                return
            } catch(err) {
                res.status(500).json({ message: `Error occured on batch add. ${err.message}` });
            }
        } else if(optionsHelper === options.one) {
            // add one
            try {
                await Business.insertOne(addedDocument)
                    .then(() => res.status(200).json({ message: `Success: Added One` }));
                return
            } catch(err) {
                res.status(500).json({ message: `Error occured on add one. ${err.message}` });
            }
        } else {
            // return custom error for invalid options parameters
            return new CustomError(404, `Not Found`);
        }
    },
    //=======================================================================================
    //=============================END CREATE OPS============================================

    //============================UPDATE OPS=================================================
    // TODO: Shit ton of stuff
    //=============================END UPDATE OPS============================================

    //===============================DELETE OPS==============================================
    // TODO: Shit ton of stuff
    //===============================END DELETE OPS===========================================
} 

module.exports = businessController;