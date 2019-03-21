const { yelpAPI } = require('./API');
const { businessTransformer } = require('./transformers');
const AuraBusiness = require('./AuraBusiness');
const businessPhotosLA = require('../sample-data/los-angeles-data/businessPhotosLA');

const { invokeMysticalPowers } = require('../gray-hat-alchemist/main');

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
  // console.log(businessesData); // TEST Call to see all business objects
  return businessesData;
};

/**
 * Transform pipeline that changes orignial yelp data objects into aura data objects.
 * @param {Object} yelpBusiness Yelp Business Object
 * @returns Aura Business Object
 */
const transformBusinessData = async yelpBusiness => {
  // ================================== TRANSFORMING YELP DATA ==============================

  // call the transformer and make all values into our data format.
  let updatedAuraBusiness = businessTransformer.yelpToAura(new AuraBusiness(), yelpBusiness);

  // ======================================= DATA INJECTION ==================================

  // Grab all excess data to append to yelp's data
  // Make sure you use transformers on "updatedAuraBusiness" all the way through the pipeline.
  const businessSearchId = updatedAuraBusiness.id;
  const businessPhotos = businessPhotosLA.find(business => business.id === businessSearchId);
  updatedAuraBusiness = businessTransformer.imagesToAura(updatedAuraBusiness, businessPhotos);

  // ======================================= DATA SCRAPING ==================================

  // Scrape each of the business pages
  const auraString = (await invokeMysticalPowers(updatedAuraBusiness.url)).toLowerCase();
  updatedAuraBusiness.attributes.aura = auraString;

  return updatedAuraBusiness;
};

/**
 * Seed the database with the 3rd-party API business data
 * @param {Object} database
 */

const businessDataSeeder = async database => {
  // ============================== INITIAL BUSINESS CALLS =================================
  // Make requests to yelp api with each zip location.
  const locationResponses = [];
  try {
    // locationResponses.push(yelpAPI.getBusinesses({ location: '90404', radius: 40000, limit: 50 }));
    locationResponses.push(yelpAPI.getBusinesses({ location: '90230', radius: 40000, limit: 10 }));
    // locationResponses.push(yelpAPI.getBusinesses({ location: '90014', radius: 40000, limit: 50 }));
    // locationResponses.push(yelpAPI.getBusinesses({ location: '90036', radius: 40000, limit: 50 }));
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
    const auraBusiness = transformBusinessData(yelpBusiness);
    transformedBusinessPromises.push(auraBusiness);
  }
  // Wait for each transform to be done.
  const transformedBusinessData = await Promise.all(transformedBusinessPromises);

  // ===================================== DATA STORAGE ====================================

  // Put this array of objects into a database somehow...
  for (const business of transformedBusinessData) {
    // Send each business to the database
    // Regarding dataMaster.dbAdd() :
    // @arg1 -> name of the JSON file to be passed on to FileSync
    // @arg2 -> name of the array that holds JSON objects. Yes,
    // arg2 is inside arg1. IMPORTANT: NO NEED to specify paths
    // for arg1 and arg2.
    // @business is the business object needing to be passed.
    // USE THESE PARAMS FOR TESTING for arg1 and arg2 only
    // arg1 -> 'businessLAFake.json'
    // arg2 -> 'businessDataFake'
    // dataMaster.dbAdd(arg1, arg2, business);
  }
};

businessDataSeeder('hello');

module.exports = {
  businessDataSeeder,
};
