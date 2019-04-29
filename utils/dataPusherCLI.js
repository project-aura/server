const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const { yelpAPI } = require('../services/API');
const { businessTransformer } = require('../helpers/transformers');
const AuraBusiness = require('../helpers/AuraBusiness');
const businessPhotosLA = require('../data/los-angeles-data/businessPhotosLA');
const seedUserObject = require('../data/seedUsers.json');
const invokeMysticalPowers = require('../gray-hat-alchemist/main');
const businessController = require('../controllers/business.controller');
const userController = require('../controllers/user.controller');

// ============================ Necessary for file (Don't touch) ===================

/**
 * Connect wrapper to initiate a connection with Mongoose
 */
function connect(dbName = process.env.ENVIRONMENT) {
  console.log('Connecting...');
  mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${
      process.env.DB_HOST
    }/${dbName}?retryWrites=true`,
    { useNewUrlParser: true }
  );
}

/**
 * Disconnect wrapper to close a connection with Mongoose.
 */
function disconnect() {
  console.log('Disconnecting...');
  mongoose.disconnect();
}

// ============================= Helper Functions =================================

/**
 *
 */
const businessBatchAPI = async zipLocations => {
  // Make requests to yelp api with each zip location.
  const responseData = [];
  try {
    const responses = [];
    zipLocations.forEach(zipCode => {
      responses.push(yelpAPI.getBusinesses({ location: zipCode, radius: 40000, limit: 50 }));
      responses.push(
        yelpAPI.getBusinesses({ location: zipCode, radius: 40000, limit: 50, offset: 51 })
      );
    });
    const mega = await Promise.all(responses);
    mega.forEach(promise => {
      promise.data.businesses.forEach(business => {
        responseData.push(business);
      });
    });
  } catch (err) {
    console.error(err);
  }
  return responseData;
};

/**
 * Transform pipeline that changes orignial yelp data objects into aura data objects.
 * @param {Object} yelpBusiness Yelp Business Object
 * @returns Aura Business Object
 */
const transformYelpBusinessData = async yelpBusiness => {
  // ================================== TRANSFORMING YELP DATA ==============================

  // call the transformer and make all values into our data format.
  let updatedAuraBusiness = businessTransformer.yelpToAura(new AuraBusiness(), yelpBusiness);

  // ======================================= DATA INJECTION ==================================

  // Grab all excess data to append to yelp's data
  // Make sure you use transformers on "updatedAuraBusiness" all the way through the pipeline.
  const businessSearchId = updatedAuraBusiness.yelpId;
  const businessPhoto = businessPhotosLA.find(business => business.id === businessSearchId);
  updatedAuraBusiness = businessTransformer.imagesToAura(updatedAuraBusiness, businessPhoto);

  // ======================================= DATA SCRAPING ==================================

  // Scrape each of the business pages
  const auraString = (await invokeMysticalPowers(updatedAuraBusiness.url)).toLowerCase();
  updatedAuraBusiness.attributes.aura = auraString;

  return updatedAuraBusiness;
};

/**
 * High-level abstraction of the steps required to get business data from an outside source.
 */
const businessRequestStrategy = async zipLocations => {
  // Send all requests for businesses
  const businessesData = await businessBatchAPI(zipLocations);

  // Send each of the business objects down a manipiulation pipeline and store the result in transformedBusinessData
  const transformedBusinessPromises = [];
  for (const yelpBusiness of businessesData) {
    // Asyncronously tranform all businesses
    const auraBusiness = transformYelpBusinessData(yelpBusiness);
    transformedBusinessPromises.push(auraBusiness);
  }
  // Wait for each transform to be done.
  const transformedBusinessData = await Promise.all(transformedBusinessPromises);

  return transformedBusinessData;
};

/**
 * Salts and Hashes the passwords of users
 * @param {Array} users List of Users
 */
const saltAndHash = async users => {
  for (const user of users) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }
  return users;
};

// ================================ Executable Functions ==========================================
/*
Each of the executable functions need to have a "connect()" and "disconnect()" at the
beginning and end of the function call. This is to make sure we properly open and close
the connection for each action we perform.
*/

const businessSeeder = async zipLocations => {
  console.log('Seeding Businesses...');
  connect();
  const transformedBusinessData = await businessRequestStrategy(zipLocations);
  try {
    await businessController.seed(transformedBusinessData); // HACK: Throws errors because of duplicates... its ok...
  } catch (err) {
    console.error(err);
  }
  disconnect();
  console.log('Seeding Businessess... Complete');
};

const businessAdder = async zipLocations => {
  console.log('Adding Businessess...');
  connect();
  const transformedBusinessData = await businessRequestStrategy(zipLocations);
  try {
    await businessController.createMany(transformedBusinessData); // HACK: Throws errors because of duplicates... its ok...
  } catch (err) {
    console.error(err);
  }
  disconnect();
  console.log('Adding Businessess... Complete');
};

const userSeeder = async rawUsers => {
  console.log('Seeding Users...');
  connect();
  const users = await saltAndHash(rawUsers);
  try {
    await userController.seed(users);
  } catch (err) {
    console.error(err);
  }
  disconnect();
  console.log('Seeding Users... Complete');
};

// ===================================== Execution ===============================
const zipCodes = ['90404', '90230', '90014', '90036'];

businessSeeder(zipCodes);
// businessAdder(zipCodes);
// userSeeder(seedUserObject.users);
