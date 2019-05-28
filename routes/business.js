const router = require('express').Router();
const passport = require('passport');
const asyncWrapper = require('../middleware/asyncWrapper');
const businessController = require('../controllers/business.controller');

// connection to the database is now on index

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
    const status = await businessController.updateVotesAura(req.body.businessId, {
      userId: req.user._id,
      aura: req.body.aura,
      res,
    });
    res.status(200).json({ 
      status
    })
  })
);

// route for showing voted auras
router.get(
  '/vote-auras',
  passport.authenticate('jwt', { session: false }),
  asyncWrapper(async (req, res) => {
    // TODO
  })
)

module.exports = router;
