const passportJwt = require('passport-jwt');
// const User = require('./models/user.model');

const { Strategy, ExtractJwt } = passportJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, // TODO: Pass this to everyone's .env
  passReqToCallback: true,
};

const JwtStrategy = new Strategy(options, async (req, payload, done) => {
  // Old Code
  // try {
  //   // find the associated user
  //   const user = await User.findById(payload._id);
  //   req.user = user;
  //   // return use
  //   done(null, user);
  // } catch (err) {
  //   done(err, false);
  // }
});

module.exports = JwtStrategy;
