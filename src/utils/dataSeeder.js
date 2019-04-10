const bcrypt = require('bcrypt');

const { yelpAPI } = require('../API');
const { businessTransformer } = require('../transformers');
const AuraBusiness = require('../AuraBusiness');
const businessPhotosLA = require('../../data/los-angeles-data/businessPhotosLA');
const seedUserObject = require('../../data/seedUsers.json');
const invokeMysticalPowers = require('../../gray-hat-alchemist/main');
const DataMaster = require('../DataMaster');
const environments = require('../environments');

const currentEnvironment = process.env.ENVIRONMENT;

/**
 * Resolves a list of Yelp API Promises.
 * @param {Array} promises Axios Promise List
 * @returns Array of business objects
 */
const resolveYelpBusinessApiPromiseData = promises => {
  // Get all businesses objects and stuff them in businessesData
  const businessesData = [];
  promises.forEach(promise =>
    promise.then(response => {
      const businessArray = response.data.businesses;
      businessArray.forEach(business => {
        businessesData.push(business);
      });
    })
  );
  // console.log(businessesData); // TEST: Call to see all business objects
  return businessesData;
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
 * Seed the database with the 3rd-party API business data
 * SCOTT: we took off the DataMaster parameter.
 * @param {Object} database
 */
const businessDataSeeder = async database => {
  console.log('Seeding Businesses...');
  // ============================== INITIAL BUSINESS CALLS =================================
  // Make requests to yelp api with each zip location.
  const locationResponses = [];
  try {
    locationResponses.push(yelpAPI.getBusinesses({ location: '90404', radius: 40000, limit: 50 }));
    locationResponses.push(yelpAPI.getBusinesses({ location: '90230', radius: 40000, limit: 50 }));
    locationResponses.push(yelpAPI.getBusinesses({ location: '90014', radius: 40000, limit: 50 }));
    locationResponses.push(yelpAPI.getBusinesses({ location: '90036', radius: 40000, limit: 50 }));
    await Promise.all(locationResponses);
  } catch (err) {
    console.error(err);
  }

  // Strip the business data objects
  const businessesData = await resolveYelpBusinessApiPromiseData(locationResponses);

  // console.log(businessesData);

  // ================================ CHECK FOR DUPLICATES ================================

  const uniqueBusinessesData = [];
  const yelpIds = {};
  for (const business of businessesData) {
    if (!yelpIds[business.id]) {
      yelpIds[business.id] = '';
      uniqueBusinessesData.push(business);
    } else {
      console.log(business);
    }
  }

  // ================================ TRANSFORM BUSINESS OBJECT ================================

  // Send each of the business objects down a manipiulation pipeline and store the result in transformedBusinessData

  const transformedBusinessPromises = [];
  for (const yelpBusiness of uniqueBusinessesData) {
    // Asyncronously tranform all businesses
    const auraBusiness = transformYelpBusinessData(yelpBusiness);
    transformedBusinessPromises.push(auraBusiness);
  }

  // Wait for each transform to be done.
  const transformedBusinessData = await Promise.all(transformedBusinessPromises);
  // console.log(transformedBusinessData);

  // ===================================== DATA STORAGE =========================================

  // parameter for DataMaster() -> the database name.
  // seed just now takes data.
  const businessDatabase = new DataMaster(environments.development);
  await businessDatabase.seedBusinesses(transformedBusinessData); // HACK: Throws errors because of duplicates... its ok...
  console.log('Seeding Businesses ... Done');
};

const userDataSeeder = async () => {
  console.log('Seeding Users ...');
  const database = new DataMaster(currentEnvironment);
  for (const user of seedUserObject.users) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }
  await database.seedUsers(seedUserObject.users);
  console.log('Seeding Users ... complete');
};

businessDataSeeder();
// userDataSeeder();

module.exports = {
  businessDataSeeder,
};
