const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const environments = require('../environments');
const DataMaster = require('../DataMaster');

const dataMaster = new DataMaster(environments.development);

router.post('/signup', async (req, res) => {
  if (!req.body.username || !req.body.password)
    return res
      .status(400)
      .json({ message: 'Invalid syntax: Please provide a proper username and password' });

  try {
    const user = {
      username: req.body.username,
      password: req.body.password,
      favorites: [],
      feedback: [],
    };

    const createdUser = await dataMaster.addUser(user);

    const userObj = createdUser.toObject();
    delete userObj.password;
    return res.status(201).json({ message: 'User successfully created', user: userObj });
  } catch (err) {
    console.log(err);
    res.status(500).json(err); // FIXME: make more robust error handling.
  }
});

router.post('/login', async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Invalid username and password' });
  }

  // find the user
  const user = await dataMaster.findUser(req.body.username);

  // Check if User exists
  if (!user) return res.status(404).json({ message: 'Invalid username: please try again' });

  // compare the passwords
  const isMatch = await bcrypt.compare(req.body.password, user.password);

  // Provide User with login token if they do
  if (isMatch) {
    // sign a jwt
    const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
      expiresIn: '1 day',
      issuer: 'aura', // TODO: talk about this with the team and whether we want an issuer to be more secure
    });
    return res.json({ message: 'Successfully logged in', token: `Bearer ${token}` });
  }

  // Kick them out if they don't belong
  return res.status(401).json({ message: 'Invalid username and password' });
});

module.exports = router;
