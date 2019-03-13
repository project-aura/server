const Axios = require('axios');

const yelpApiKey = process.env.YELP_API_KEY;
const yelpBaseUrl = 'https://api.yelp.com/v3/';
const yelpHeaders = {
  Authorization: `bearer ${yelpApiKey}`,
};

const yelpAPI = {
  // ================  Business Information ==================
  getBusinessesByLocation: location =>
    Axios.get(`${yelpBaseUrl}businesses/search`, {
      headers: yelpHeaders,
      params: {
        location,
      },
    }),
  getBusinessById: id =>
    Axios.get(`${yelpBaseUrl}businesses/${id}`, {
      headers: yelpHeaders,
    }),

  getBusinessByAlias: alias =>
    Axios.get(`${yelpBaseUrl}businesses/${alias}`, {
      headers: yelpHeaders,
    }),

  getReviewsByBusinessId: id =>
    Axios.get(`${yelpBaseUrl}businesses/${id}/reviews`, {
      headers: yelpHeaders,
    }),
};

module.exports = {
  yelpAPI,
};
