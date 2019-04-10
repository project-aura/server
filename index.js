require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const JwtStrategy = require('./passport');
const businessRouter = require('./src/routes/business');
const authRouter = require('./src/routes/auth');
const selectEnvironment = require('./src/selectEnvironment');
const accountRouter = require('./src/routes/account');
const errorHandler = require('./src/middleware/errorHandler');

// select between dev and prod environments based off process.argv[2]
selectEnvironment(process.argv[2]);

const app = express();

/* Added on 3/5/2019
 * 1. body parser middleware
 * 2. form data
 * 3. CORS middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// static middleware
app.use(express.static(path.join(__dirname, 'public')));

// authentication middleware
app.use(passport.initialize());
passport.use(JwtStrategy);

// Route endpoints
app.use('/api/businesses', businessRouter);
app.use('/api/auth', authRouter);
app.use('/api/account', accountRouter);

// Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
