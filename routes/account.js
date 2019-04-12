const router = require('express').Router();
const passport = require('passport');

const asyncWrapper = require('../middleware/asyncWrapper');
const CustomError = require('../helpers/CustomError');
const DataMaster = require('../controllers/DataMaster');

const dataMaster = new DataMaster(process.env.ENVIRONMENT);

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  res.json({ message: 'You made it!' });
});

router.patch(
  '/change-password',
  passport.authenticate('jwt', { session: false }),
  asyncWrapper(async (req, res) => {
    await dataMaster.updateUserPassword(req.user._id, req.body.newPassword);

    res.status(200).json({ message: 'Successfully changed password' });
  })
);

router.patch(
  '/change-display-name',
  passport.authenticate('jwt', { session: false }),
  asyncWrapper(async (req, res) => {
    await dataMaster.updateUserDisplayName(req.user.id, req.body.newDisplayName);
    res.status(200).json({ message: 'Successfully changed display name' });
  })
);

module.exports = router;
