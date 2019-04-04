/* dataSnatcher.js - snatches data from the business API
 */
const express = require('express');
const DataMaster = require('./DataMaster');
const auraList = require('../sample-data/aura/auras.json');
const Business = require('../models/business.model');

const router = express.Router();
const dataMaster = new DataMaster();

// router routes to MongoDB

router.get('/api/businesses', (req, res) => {
  dataMaster.find(req, res);
});

// GET request for aura list
router.get('/auras', (req, res) => {
  res.json(auraList);
});

module.exports = router;
