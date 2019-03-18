/* dataSnatcher.js - snatches data from the business API
 */
const express = require('express');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const businessLA = require('../sample-data/los-angeles-data/businessLA');
const auraList = require('../sample-data/aura/auras.json');
const { yelpAPI } = require('../src/API');

/* Create the DB, if it doesn't exist, then seed it
 * with data.
 * Then sync the adapter and router, and then create router
 */
const adapter = new FileSync('businessLA.json', {
  defaultValue: { businessData: businessLA },
});

const db = lowdb(adapter);
const router = express.Router();

// GET request
router.get('/api/businessAPI', (req, res) => {
  let businessData = db.get('businessData').value();
  if (req.query.aura) {
    const { aura } = req.query;
    businessData = businessData.filter(venue => venue.attributes.Aura.includes(aura));
  }
  res.json(businessData);
});

// GET request for aura list
router.get('/auras', (req, res) => {
  res.json(auraList);
});

router.get('/yelp', (req, res) => {
  yelpAPI
    .getBusinessesByLocation(req.query.location)
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      // log the error here
      res.status(500).json({ msg: 'Server failure' });
    });
});

module.exports = router;
