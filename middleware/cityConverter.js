/**
 * Converters - converts attributes from the businesses
 * appends fields into the businesses depending on the function that is called
 * citySearch and categorySearch are fields that it will be appended to
 * since the business models have been updated to have these fields.
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const businessController = require('../controllers/business.controller');
const zipCodes = require('../data/zipCodes');
const categories = require('../data/categories');

const cityConvert = async (businesses) => {
    // TODO
}

const categoryConvert = async (businesses) => {
    // TODO
}