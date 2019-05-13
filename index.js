require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const JwtStrategy = require('./passport');
const mainRouter = require('./routes/mainRouter');
const selectEnvironment = require('./helpers/selectEnvironment');
const errorHandler = require('./middleware/errorHandler');
const DataMaster = require('./controllers/DataMaster');

// select between dev and prod environments based off process.argv[2]
selectEnvironment(process.argv[2]);

const app = express();

// process.env -> change it accordingly! 
const connector = new DataMaster();
connector.connectForMutations(process.env.DB_NAME_TEST);
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

// Route endpoints -> just the main router
// then main router distributes to the subrouters
app.use('/', mainRouter);

// Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
