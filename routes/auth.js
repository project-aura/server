const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const asyncWrapper = require('../middleware/asyncWrapper');
const CustomError = require('../helpers/CustomError');
const userController = require('../controllers/user.controller');

// connection to DB is in index

router.post(
  '/signup',
  asyncWrapper(async (req, res) => {
    if (!req.body.username || !req.body.password) {
      throw new CustomError(400, 'Invalid login: Missing either username or password');
    }

    const user = {
      username: req.body.username,
      displayName: null,
      password: req.body.password,
      email: req.body.email,
      closestLocation: req.body.closestLocation,
      favorites: [],
      feedback: [],
    };

    const createdUser = await userController.createOne(user);

    const userObj = createdUser.toObject();
    delete userObj.password;
    return res.status(201).json({ message: 'User successfully created', user: userObj });
  })
);

// FIXME: Make a error handling middleware that all routes can use.

router.post(
  '/login',
  asyncWrapper(async (req, res) => {
    if (!req.body.username || !req.body.password) {
      throw new CustomError(400, 'Invalid login: Missing either username or password');
    }

    // find the user
    const user = await userController.readOne({ username: req.body.username });

    // Check if User exists
    if (!user) throw new CustomError(404, 'Invalid username: please try again');

    // compare the passwords
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    const userObj = user.toObject();
    delete userObj.password;

    // Provide User with login token if they do
    if (isMatch) {
      // sign a jwt
      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
        expiresIn: '1 day',
        issuer: 'aura.community', // TODO: talk about this with the team and whether we want an issuer to be more secure
      });
      return res.json({
        message: 'Successfully logged in',
        token: `Bearer ${token}`,
        user: userObj,
      });
    }

    // Kick them out if they don't belong
    return res.status(401).json({ message: 'Invalid username and password' });
  })
);

module.exports = router;
