const { yelpAPI } = require('./API');
const { transformer } = require('./transformers');
const AuraBusiness = require('./AuraBusiness');
const businessPhotosLA = require('../sample-data/los-angeles-data/businessPhotosLA');

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

const transformData = yelpBusiness => {
  // ================================== TRANSFORMING YELP DATA ==============================

  // call the transformer and make all values into our data format.
  let updatedAuraBusiness = transformer.yelpToAura(new AuraBusiness(), yelpBusiness);

  // ======================================= DATA INJECTION ==================================
  // Grab all excess data to append to yelp's data
  const businessSearchId = updatedAuraBusiness.id;
  const businessPhotos = businessPhotosLA.find(business => business.id === businessSearchId);
  updatedAuraBusiness = transformer.businessImagesToAura(updatedAuraBusiness, businessPhotos);

  // ======================================= DATA SCRAPING ==================================

  // Scrape each of the business pages
  // parser.scrapeForAmbiances(business.url).then(response => {
  //     business.auras = response.ambiances;
  //   });
  // YOU HAVE ENTERED THE BLACK HOLE, GOOD LUCK GETTING OUT.
  // You must use the gray-hat-alchemist program to scrape 
  // const { invokeMysticalPowers } = require('../gray-hat-alchemist/main');
  // invokeMysticalPowers(business.url)
  //    .then(scrapedAura => business.attributes.Aura = scrapedAura);
  // Let the database handle all duplicate values.

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
    locationResponses.push(yelpAPI.getBusinesses({ location: '90230', radius: 40000, limit: 50 }));
    // locationResponses.push(yelpAPI.getBusinesses({ location: '90014', radius: 40000, limit: 50 }));
    // locationResponses.push(yelpAPI.getBusinesses({ location: '90036', radius: 40000, limit: 50 }));
    await Promise.all(locationResponses);
  } catch (err) {
    console.error(err);
  }

  // Strip the business data objects
  const businessesData = await resolveYelpBusinessApiPromiseData(locationResponses);

  // ================================ DETAILED BUSINESS CALLS ================================

  // Not needed now because we can get all of the object properties we need.
  // Perform an api call to yelp with each of the business object aliases in businessesData

  // ================================ TRANSFORM BUSINESS OBJECT ================================

  // Send each of the business objects down a manipiulation pipeline and store the result in transformedBusinessData
  const transformedBusinessData = [];
  for (const yelpBusiness of businessesData) {
    const updatedBusiness = transformData(yelpBusiness);
    transformedBusinessData.push(updatedBusiness);
  }
  console.log(transformedBusinessData);

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
