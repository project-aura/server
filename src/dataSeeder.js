const { yelpAPI } = require('./API');
const { transformer } = require('./transformers');
const { dataMaster } = require('./dataMaster');
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

/**
 * Seed the database with the 3rd-party API business data
 * @param {Object} database
 */
const businessDataSeeder = async database => {
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

  // ================================ DETAILED BUSINESS CALLS ================================

  // Ask the group if they need the (few) extra attributes

  // Perform an api call to yelp with each of the business object aliases in businessesData
  // const detailedBusinessesData = [];
  // for (const business of businessesData) {
  //   detailedBusinessesData.push((await yelpAPI.getBusinessByAlias(business.alias)).data);
  // }
  // console.log(detailedBusinessesData);

  // ====================================== TRANSFORMING DATA ==============================
  const transformedBusinessData = [];
  for (const business of businessesData) {
    // call the transformer and make all values into our data format.
    transformedBusinessData.push(transformer.yelpToAura(business));
  }
  console.log(transformedBusinessData);

  // ======================================= DATA INJECTION ==================================
  // Grab all excess data to append to yelp's data
  // for (const business of transformedBusinessData) {
  //   // business.imageUrl = something...
  // }

  // ======================================= DATA SCRAPING ==================================

  // Scrape each of the business pages
  // for (const business of transformedBusinessData) {
  //   parser.scrapeForAmbiances(business.url).then(response => {
  //     business.auras = response.ambiances;
  //   });
  // }
  // Let the database handle all duplicate values.

  // ===================================== DATA STORAGE ====================================

  // Put this array of objects into a database somehow...
  for (const business of transformedBusinessData) {
    // Send each business to the database
    // dataMaster.dbAdd(business);
  }
};

businessDataSeeder('hello');

module.exports = {
  businessDataSeeder,
};
