/* eslint-disable func-names */
const mongoose = require('mongoose');
const CustomError = require('../helpers/CustomError');

const schema = mongoose.Schema({
    name: String,
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }
    ],
    location: String,
    leader: String,
    aura: String,
});

const UserGroups = mongoose.model('userGroups', schema);

module.exports = UserGroups;
