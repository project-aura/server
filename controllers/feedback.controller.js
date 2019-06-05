/**
 * Feedback Controller -> 1 to 1 relationship with Feedback Model
 * Cuz were bored like that
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const CustomError = require('../helpers/CustomError');
const Feedback = require('../models/feedback.model');

/**
 * Creates a single feedback
 * @param {Object} feedback Aura feedback
 * @param {Object} options Additional parameters (optional)
 * @returns awaited object
 * A feedback is created when:
 * 1. A user votes for an aura
 * 2. A user votes for an activity
 * 3. A user votes for an attire
 * 4. A user comments on business
 */
const createOne = async (feedback, options) => {
    const returnAwait = await Feedback.create(feedback);
    return returnAwait;
};

/**
 * Creates many feedback with a batch request
 * @param {Object} feedback Aura feedbackes
 * @param {Object} options Additional parameters (optional)
 * @returns Response
 */
const createMany = async (feedback, options) => {
    const returnAwait = await Feedback.insertMany(feedback, { ordered: false });
    return returnAwait;
};

/**
 * Reads a single feedback
 * @param {Object} options defines what to find
 */
const readOne = async (options) => {
    const returnAwait = await Feedback.findOne(options);
    return returnAwait;
};

/**
 * Reads many feedbackes with a batch request
 * @param {Object} options defines objects to find
 * @returns Response
 */
const readMany = async (options) => {
    const returnAwait = await Feedback.find(options);
    return returnAwait;
};

/**
 * Updates a single feedback
 * @param {Object} feedback Aura feedback Id
 * @param {Object} options Additional parameters
 * @returns doc
 * Updates one feedback
 */
const updateOne = async (feedback, options) => {
    const doc = await Feedback.findByIdAndUpdate(feedback, { $set: options }, { new: true });
    return doc;
};

/**
 * Updates many feedback with a batch request
 * @param {Object} options Additional parameters
 * @returns docs
 * Updates all
 */
const updateMany = async (options) => {
    const docs = await Feedback.updateMany({}, { $set: options }, { new: true });
    return docs;
};

/**
 * Deletes a single feedback
 * @param {Object} options defines what to delete
 * @returns Response
 */
const deleteOne = async (options) => {
    const returnAwait = await Feedback.deleteOne(options);
    return returnAwait;
};

/**
 * Deletes many feedback with a batch request
 * @param {Object} options defines what to delete
 * @returns Response
 */
const deleteMany = async (options) => {
    const returnAwait = await Feedback.deleteMany(options);
    return returnAwait;
};

/**
 * Deletes many feedback then addes many feedbackes with a batch request
 * @param {Object} feedback Aura feedbackes
 * @param {Object} options Additional parameters (optional)
 * @returns Response
 */
const seed = async (feedback, options) => {
    const del = await Feedback.deleteMany({});
    const ins = await Feedback.insertMany(feedback, { ordered: false });
    return `${del} ... ${ins}`;
};

/**
 * Finds feedback by query
 * @param {Object} query Search object parameters
 * @param {Object} options Additional parameters
 * @returns Response
 */
const find = (query, options) => {};

const feedbackController = {
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

module.exports = feedbackController;
