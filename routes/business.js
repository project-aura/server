const router = require('express').Router();
const DataMaster = require('../controllers/DataMaster');
const asyncWrapper = require('../middleware/asyncWrapper');

const dataMaster = new DataMaster(process.env.ENVIRONMENT);

router.get('/', (req, res) => {
  dataMaster.find(req, res);
});

module.exports = router;
