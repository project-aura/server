const passportJwt = require('passport-jwt');
const User = require('./models/user.model');
const DataMaster = require('./controllers/DataMaster');
const environments = require('./src/environments');

const { Strategy, ExtractJwt } = passportJwt;

const database = new DataMaster(environments.development);

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  issuer: process.env.JWT_ISSUER,
  passReqToCallback: true,
};

const JwtStrategy = new Strategy(options, async (req, payload, done) => {
  try {
    // find the associated user
    const user = await database.findUser({ _id: payload._id });
    req.user = user;
    // return use
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

module.exports = JwtStrategy;
