const router = require('express').Router();
const DataMaster = require('../controllers/DataMaster');

const dataMaster = new DataMaster(process.env.ENVIRONMENT);

router.get('/', (req, res) => {
  dataMaster.find(req, res);
});

module.exports = router;
