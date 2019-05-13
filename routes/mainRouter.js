/**
 * This is the main router of the app, index will just call this
 * and this will hold every sub router. 
 */

const express = require('express');
const authRouter = require('./auth');
const accountRouter = require('./account');
const businessRouter = require('./business');

const app = express();

// subrouters
app.use('/api/businesses', businessRouter);
app.use('/api/auth', authRouter);
app.use('/api/account', accountRouter);

module.exports = app;