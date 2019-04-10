const router = require('express').Router();
const passport = require('passport');

const DataMaster = require('../DataMaster');

const dataMaster = new DataMaster(process.env.ENVIRONMENT);

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  res.json({ message: 'You made it!' });
});

router.post(
  '/change-password',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {}
);

module.exports = router;
