/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');

const asyncWrapper = require('../middleware/asyncWrapper');
const CustomError = require('../helpers/CustomError');
const DataMaster = require('../controllers/DataMaster');
const userController = require('../controllers/user.controller');

const dataMaster = new DataMaster(process.env.ENVIRONMENT);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    res.json({ message: 'You made it!' });
  }
);

router.patch(
  '/change-password',
  passport.authenticate('jwt', { session: false }),
  asyncWrapper(async (req, res) => {
    // brcypt hash the new password
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(req.body.newPassword, salt);
    await userController.updateOne(req.user._id, { password: hash });

    res.status(200).json({ message: 'Successfully changed password' });
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
      businessId: req.body.business_id,
      res
    });
    res.status(200).json({ message: 'Successfully added to favorites' });
  })
);

// router.patch(
//   '/vote-auras',
//   passport.authenticate('jwt', { session: false }),
//   asyncWrapper(async (req, res) => {
//     const status = await businessController.updateVotes(req.body.business_id, {
//       userId: req.user._id,
//       aura: req.body.aura,
//       res,
//     });
//     if(status === 'message: User has already voted for this business') {
//       res.status(200).json({ message: 'User has already voted for this business' })
//     } else {
//       res.status(200).json({ message: 'Vote/Unvote recorded' });
//     }
//   })
// );

module.exports = router;
