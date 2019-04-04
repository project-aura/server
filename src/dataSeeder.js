const { yelpAPI } = require('./API');
const { businessTransformer } = require('./transformers');
const AuraBusiness = require('./AuraBusiness');
const businessPhotosLA = require('../sample-data/los-angeles-data/businessPhotosLA');
const invokeMysticalPowers = require('../gray-hat-alchemist/main');
const DataMaster = require('./DataMaster');
const environments = require('./environments');

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
  let updatedAuraBusiness = businessTransformer.yelpToAura(new AuraBusiness(), yelpBusiness); // FIXME: Change to creating a model in the future, instead of a class.

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

  // ================================ DETAILED BUSINESS CALLS ================================

  // Not needed now because we can get all of the object properties we need.
  // Perform an api call to yelp with each of the business object aliases in businessesData

  // ================================ TRANSFORM BUSINESS OBJECT ================================

  // Send each of the business objects down a manipiulation pipeline and store the result in transformedBusinessData

  const transformedBusinessPromises = [];
  for (const yelpBusiness of businessesData) {
    // Asyncronously tranform all businesses
    const auraBusiness = transformYelpBusinessData(yelpBusiness);
    transformedBusinessPromises.push(auraBusiness);
  }

  // Wait for each transform to be done.
  const transformedBusinessData = await Promise.all(transformedBusinessPromises);
  // console.log(transformedBusinessData);

  // ===================================== DATA STORAGE =========================================
  // 4/1/19 -> parameter for DataMaster()  no longer needed. The seed() function works the same.
  const businessDatabase = new DataMaster();
  businessDatabase.seed(transformedBusinessData, environments.dev);
};

businessDataSeeder('businessLA.json');

module.exports = {
  businessDataSeeder,
};
