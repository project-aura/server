/**
 * User Controller -> 1 to 1 relationship with User Model
 * Cuz were bored like that
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const CustomError = require('../helpers/CustomError');
const User = require('../models/user.model');

/**
 * Creates a single user
 * @param {Object} user Aura user
 * @param {Object} options Additional parameters (optional)
 * @returns Response
 */
const createOne = async (user, options) => {
  const returnAwait = await User.create(user);
  return returnAwait;
};

/**
 * Creates many users with a batch request
 * @param {Object} users Aura users
 * @param {Object} options Additional parameters (optional)
 * @returns Response
 */
const createMany = async (users, options) => {
  const returnAwait = await User.insertMany(users, { ordered: false });
  return returnAwait;
};

/**
 * Reads a single user
 * @param {Object} options defines what to find
 * @returns Response
 */
const readOne = async options => {
  const returnAwait = await User.findOne(options);
  return returnAwait;
};

/**
 * @param {Object} options defines objects to find
 * @returns Response
 */
const readMany = async options => {
  const returnAwait = await User.find(options);
  return returnAwait;
};

/**
 * Updates a single user
 * @param {Object} user Aura user
 * @param {Object} options Additional parameters
 * @returns Response
 */
const updateOne = async (user, options) => {
  // TODO
  const doc = await User.updateOne({ user }, { options }, { new: true });
  return doc;
};

/**
 * Updates many users with a batch request
 * @param {Object} users Aura users
 * @param {Object} options Additional parameters
 * @returns Response
 */
const updateMany = (users, options) => {
  // TODO
};

/**
 * Deletes a single user
 * @param {Object} options defines what to delete
 * @returns Response
 */
const deleteOne = async options => {
  const returnAwait = await User.deleteOne(options);
  return returnAwait;
};

/**
 * Deletes many users with a batch request
 * @param {Object} options defines objects to delete
 * @returns Response
 */
const deleteMany = async options => {
  const returnAwait = await User.deleteMany(options);
  return returnAwait;
};

/**
 * Deletes many users then addes many useres with a batch request
 * @param {Object} users Aura users
 * @param {Object} options Additional parameters (optional)
 * @returns Response
 */
const seed = async (users, options) => {
  const del = await User.deleteMany({});
  const ins = await User.insertMany(users, { ordered: false });
  return `${del} ... ${ins}`;
};

/**
 * Finds users by query
 * @param {Object} query Search object parameters
 * @param {Object} options Additional parameters
 * @returns Response
 */
const find = (query, options) => {
  // TODO
};

const userController = {
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

module.exports = userController;
