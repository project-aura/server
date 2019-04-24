const router = require('express').Router();
const DataMaster = require('../controllers/DataMaster');
const asyncWrapper = require('../middleware/asyncWrapper');
const businessController = require('../controllers/business.controller');
const dataMaster = new DataMaster(process.env.ENVIRONMENT);

router.get(
  '/',
  asyncWrapper(async (req, res) => {
    // TODO: Change this to a businessController function that will return a business object
    //dataMaster.find(req, res);

    const businesses = await businessController.find(req.query);
    
    res.json(businesses);
  })
);

module.exports = router;
