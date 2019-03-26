/* dataSnatcher.js - snatches data from the business API
 */
const express = require("express");
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const businessLA = require("../sample-data/los-angeles-data/businessLA");
const seedBusinesses = require("../sample-data/los-angeles-data/businessLA.json");
const auraList = require("../sample-data/aura/auras.json");

// THIS IS NOT WORKING LIKE YOU THINK IT IS!!!!!!!!!!!!!!!!!

/* Create the DB, if it doesn't exist, then seed it
 * with data.
 * Then sync the adapter and router, and then create router
 */
const adapter = new FileSync("businessLA.json", {
  defaultValue: { businessData: businessLA },
});

const db = lowdb(adapter);
const router = express.Router();

// GET request
// THIS API ENDPOINT NAME IS CONFUSING
router.get("/api/resources", (req, res) => {
  let businessData = db.get("businessData").value();
  if (req.query.aura) {
    const { aura } = req.query;
    businessData = businessData.filter(venue => venue.attributes.Aura.includes(aura));
  }
  res.json(businessData);
});

router.get("/api/businesses", (req, res) => {
  let { businessData } = seedBusinesses;
  if (req.query.aura) {
    const { aura } = req.query;
    businessData = businessData.filter(venue => venue.attributes.aura.includes(aura));
  }
  res.json(businessData);
});

// GET request for aura list
router.get("/auras", (req, res) => {
  res.json(auraList);
});

module.exports = router;
