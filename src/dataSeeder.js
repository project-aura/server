const { yelpAPI } = require('./API');

/**
 * Seed the database with the 3rd-party API business data
 * @param {Object} database
 */
const businessDataSeeder = database => {
  let culverCityResponse = {};
  yelpAPI
    .getBusinessesByLocation('Los Angeles')
    .then(res => {
      console.log(res);
      culverCityResponse = res.data;
    })
    .catch(err => console.error(err, 'On Error'));
  console.log('Response', culverCityResponse);

  // const culverCityBusinessList = culverCityResponse.data.businesses;
  // const detailedBusinessList = [];

  // Get the detailed list of each business

  // WOAH!!! Not running this yet, because I don't want to kill our api calls.
  // culverCityBusinessList.forEach(business => {
  //   yelpAPI.getBusinessByAlias(business.alias).then(res => {
  //     detailedBusinessList.push(res.data);
  //   });
  // });

  // Scrape each of the business pages
  // detailedBusinessList.forEach(business => {
  //   parser.scrapeForAmbiances(business.url).then(response => {
  //     business.auras = response.ambiances;
  //   });
  //   // TODO: how do we check for duplicates??
  // });

  // Put this array of objects into a database somehow...
  // database.send(detailedBusinessList)
};

businessDataSeeder('hello');

module.exports = {
  businessDataSeeder,
};
