/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');

const asyncWrapper = require('../middleware/asyncWrapper');
const CustomError = require('../helpers/CustomError');
const userController = require('../controllers/user.controller');

// connections to DB is now in index

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    res.json({ message: 'You made it!' });
  }
);

router.get(
  '/read-user',
  passport.authenticate('jwt', { session: false }),
  asyncWrapper(async (req, res) => {
    const user = await userController.readOne(req.user._id);
    const userObj = user.toObject();
    res.status(200).json({ message: 'User has been read', user: userObj });
  })
);

router.patch(
  '/change-password',
  passport.authenticate('jwt', { session: false }),
  asyncWrapper(async (req, res) => {
    await userController.updateOne(req.user._id, {
      displayName: req.body.newDisplayName
    });
    res.status(200).json({ message: 'Successfully changed display name' });
  })
);

router.patch(
  '/change-display-name',
  passport.authenticate('jwt', { session: false }),
  asyncWrapper(async (req, res) => {
    await userController.updateOne(req.user._id, {
      displayName: req.body.newDisplayName
    });
    res.status(200).json({ message: 'Successfully changed display name' });
  })
);

// route for adding a favorite business into user
router.patch(
  '/like-business',
  passport.authenticate('jwt', { session: false }),
  asyncWrapper(async (req, res) => {
    // Need to refer to user controller
    // updateLike will update both user and business controller
    await userController.updateLike(req.user._id, {
      businessId: req.body.businessId,
      res
    });
    res.status(200).json({ message: 'Successfully added to favorites' });
  })
);

module.exports = router;
