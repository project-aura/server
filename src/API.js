const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
// NOTE: the __dirname is needed for windows users. Not necessary for Mac
const Axios = require('axios');

const yelpApiKey = process.env.YELP_API_KEY;
const yelpBaseUrl = 'https://api.yelp.com/v3/';
const yelpHeaders = {
  Authorization: `bearer ${yelpApiKey}`,
};

const yelpAPI = {
  // ================  Business Information ==================
  getBusinesses: options =>
    Axios.get(`${yelpBaseUrl}businesses/search`, {
      headers: yelpHeaders,
      params: {
        location: options.location,
        radius: options.radius,
        limit: options.limit,
      },
    }),
  getBusinessById: (id, options) =>
    Axios.get(`${yelpBaseUrl}businesses/${id}`, {
      headers: yelpHeaders,
    }),

  getBusinessByAlias: (alias, options) =>
    Axios.get(`${yelpBaseUrl}businesses/${alias}`, {
      headers: yelpHeaders,
    }),

  getReviewsByBusinessId: (id, options) =>
    Axios.get(`${yelpBaseUrl}businesses/${id}/reviews`, {
      headers: yelpHeaders,
    }),
};

module.exports = {
  yelpAPI,
};
