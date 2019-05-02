const router = require('express').Router();
const passport = require('passport');
const DataMaster = require('../controllers/DataMaster');
const asyncWrapper = require('../middleware/asyncWrapper');
const businessController = require('../controllers/business.controller');

router.get(
  '/',
  asyncWrapper(async (req, res) => {
    const businesses = await businessController.find(req.query);
    res.json(businesses);
  })
);

// route for voting for auras
router.patch(
  '/vote-auras',
  passport.authenticate('jwt', { session: false }),
  asyncWrapper(async (req, res) => {
    await businessController.updateVotes(req.body.business_id, {
      userId: req.user._id,
      aura: req.body.aura,
      res,
    });
    res.status(200).json({ message: 'Vote/Unvote recorded' });
  })
);

module.exports = router;
