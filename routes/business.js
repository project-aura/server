const router = require('express').Router();
const passport = require('passport');
const asyncWrapper = require('../middleware/asyncWrapper');
const businessController = require('../controllers/business.controller');

// connection to the database is now on index

router.get(
  '/',
  asyncWrapper(async (req, res) => {
    const businesses = await businessController.find(req.query, {
      page: req.body.page || 0,
      resultsPerPage: req.body.resultsPerPage || 0,
    });
    res.json(businesses);
  })
);

// route for voting for auras
router.patch(
  '/vote-auras',
  passport.authenticate('jwt', { session: false }),
  asyncWrapper(async (req, res) => {
    const status = await businessController.updateVotesAura(req.body.businessId, {
      userId: req.user._id,
      aura: req.body.aura,
      res,
    });
    if (status === 'message: User has already voted for this business') {
      res.status(200).json({ message: 'User has already voted for this business' });
    } else {
      res.status(200).json({ message: 'Vote/Unvote recorded' });
    }
  })
);

module.exports = router;
