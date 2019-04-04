const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
  if (!req.body.username || !req.body.password)
    return res
      .status(400)
      .json({ message: 'Invalid syntax: Please provide a proper username and password' });

  try {
    const userObj = {
      username: req.body.username,
      password: req.body.username,
    };

    // FIXME: Use models when ready
    /*
    const user = await User.create({
      username: req.body.username,
      password: req.body.username,
      favorites: {},
    })
    const userObj = user.toObject();
     */

    delete userObj.password;
    return res.status(201).json({ message: 'User successfully created', user: userObj });
  } catch (err) {
    res.status(500).json(err); // FIXME: make more robust error handling.
  }
});

router.post('/login', async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Invalid username and password' });
  }

  // find the user
  // FIXME: Change this to a database call to get actual user.
  const user = {
    username: 'scott',
    password: 'scott',
  };

  // FIXME: This line needs to be implemented in user model. Check the express-codealong for more info.
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;

  // Check if User exists
  if (!user) return res.status(404).json({ message: 'Invalid username: please try again' });

  // compare the passwords
  const isMatch = await bcrypt.compare(req.body.password, user.password);

  // Provide User with login token if they do
  if (isMatch) {
    // sign a jwt
    // FIXME: Change user to user.toJSON()
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: '1 day',
      issuer: 'aura', // TODO: talk about this with the team and whether we want an issuer to be more secure
    });
    return res.json({ message: 'Successfully logged in', token: `Bearer ${token}` });
  }

  // Kick them out if they don't belong
  return res.status(401).json({ message: 'Invalid username and password' });
});

module.exports = router;
