/**
 * User Controller -> 1 to 1 relationship with User Model
 * Cuz were bored like that
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const CustomError = require('../helpers/CustomError');
const User = require('../models/user.model');
const optionsHelper = require('../helpers/options');

const userController = {
    //========================READ OPS==================================================

    //========================END READ OPS==============================================

    //========================CREATE OPS================================================
    //========================add  user=================================================
    async add(addedDocument, options) {
        if(options === optionsHelper.one) {
            // add one
            try {
                const user = await User.create(addedDocument);
                return user;
            } catch (err) {
                // HACK: Hike the error up to the router...
                throw err;
            }
        } else if(options === optionsHelper.batch) {
            
        }
    }
    //=================================================================================
    //========================END CREATE OPS============================================

    //========================UPDATE OPS================================================

    //========================END UPDATE OPS============================================
    // TODO: Shit ton of stuff
    //========================DELETE OPS===============================================
    // TODO: Shit ton of stuff
    //=======================END DELETE OPS============================================
}