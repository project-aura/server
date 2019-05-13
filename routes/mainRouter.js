/**
 * This is the main router of the app, index will just call this
 * and this will hold every sub router. 
 */

const express = require('express');
const authRouter = require('./auth');
const accountRouter = require('./account');
const businessRouter = require('./business');

const app = express();

app.use();