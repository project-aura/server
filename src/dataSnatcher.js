/* dataSnatcher.js - snatches data from the business API 
 */
const express = require('express');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const businessLA = require('../sample-data/los-angeles-data/businessLA');

/* Create the DB, if it doesn't exist, then seed it
 * with data. 
 * Then sync the adapter and router, and then create router
 */
const adapter = new FileSync('businessLA.json', {
    defaultValue: {businessData: businessLA},
});
const db = lowdb(adapter);
const router = express.Router();

// GET request
router.get('/', (req, res) => {
    let businessData = db.get('businessData').value();
    res.json(businessData);
})

module.exports = router;