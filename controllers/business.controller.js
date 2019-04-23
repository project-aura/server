/**
 * Business Controller -> 1 to 1 relationship with Business Model
 * Cuz were bored like that
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const CustomError = require('../helpers/CustomError');
const Business = require('../models/business.model');
const funnelAction = require('../helpers/funnel');

/** 
 * @param {Object} business Aura Business
 * @param {Object} options Additional parameters
 * @returns awaited obj
 * ADD ONE
 */
const createOne = async (business, options) => {
    const returnAwait = await Business.insertOne(business);
    return returnAwait;
};

/**
 * Creates many businesses with a batch request
 * @param {Object} businesses Aura Businesses
 * @param {Object} options Additional parameters
 * @returns awaited obj
 * ADD BATCH
 */
const createMany = (businesses, options) => {
    const returnAwait = await Business.insertMany(businesses, { ordered: false });
    return returnAwait;
};

/**
 * Reads a single business
 * @param {Object} business Aura Business
 * @param {Object} options Additional parameters
 * @returns Response
 */
const readOne = (options) => {
    const returnAwait = await Business.find(options);
    return returnAwait;
};

/**
 * Reads many businesses with a batch request
 * @param {Object} businesses Aura Businesses
 * @param {Object} options Additional parameters
 * @returns Response
 */
const readMany = (options) => {
    const returnAwait = await Business.find(options);
    return returnAwait;
};

/**
 * Updates a single business
 * @param {Object} business Aura Business
 * @param {Object} options Additional parameters
 * @returns Response
 */
const updateOne = (business, options) => {
    // TODO
};

/**
 * Updates many businesses with a batch request
 * @param {Object} businesses Aura Businesses
 * @param {Object} options Additional parameters
 * @returns Response
 */
const updateMany = (businesses, options) => {
    // TODO
};

/**
 * Deletes a single business
 * @param {Object} options Additional parameters
 * @returns Response
 */
const deleteOne = (options) => {
    const returnAwait = await Business.deleteOne(options);
    return returnAwait;
};

/**
 * Deletes many businesses with a batch request
 * @param {Object} options Additional parameters
 * @returns query
 * Might as well call this NUKE
 */
const deleteMany = (options) => {
    const returnAwait = await Business.deleteMany(options);
    return returnAwait;
};

/**
 * Deletes many businesses then addes many businesses with a batch request
 * @param {Object} businesses Aura Businesses
 * @param {Object} options Additional parameters
 * @returns Response
 */
const seed = (businesses, options) => {
    const del = await Business.deleteMany({});
    const ins = await Business.insertMany(businesses, { ordered: false });
    return `${del} ... ${ins}`;
};

/**
 * Finds businesses by query
 * @param {Object} query Search object parameters
 * @param {Object} res Response Object parameter
 * @param {Object} options Additional parameters
 * @returns Response
 */
const find = (query, res, options) => {
    // something else takes care of destructuring the query from request
    Business.find()
          .where('attributes.aura')
          .regex(query.aura || '')
          .where('city')
          .regex(query.city || '')
          .then(businesses => res.json(funnelAction(query.category, businesses)))
          .catch(err => res.status(500).json({ message: err.message }));
};

const businessController = {
    createOne,
    createMany,
    readOne,
    readMany,
    updateOne,
    updateMany,
    deleteOne,
    deleteMany,
    seed,
    find,
};
module.exports = businessController;
