/**
 *  TEST THE DATA MASTER
 */
const express = require('express');
const DataMaster  = require('./../src/DataMaster');
const environments = require('./../src/environments');

// setup express router
const router = express.Router();

const data = {
  "id": "EL12403cpcEf8hLYXSpptg",
  "name": "Bay Cities Italian Deli",
  "alias": "bay-cities-italian-deli-santa-monica",
  "address": "1517 Lincoln Blvd",
  "city": "Santa Monica",
  "state": "CA",
  "postalCode": "90401",
  "latitude": 34.017994,
  "longitude": -118.489223,
  "url": "https://www.yelp.com/biz/bay-cities-italian-deli-santa-monica?adjust_creative=y-XxUFQR_0WfAHaWdPDt2w&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=y-XxUFQR_0WfAHaWdPDt2w",
  "stars": 4,
  "reviewCount": 4397,
  "novelty": 0,
  "businessImage": {
    "src": "https://images2.laweekly.com/imager/bay-cities/u/original/4461347/5606707.0.jpg",
    "owner": "LA Weekly"
  },
  "attributes": {
    "aura": "trendy",
    "wifi": "",
    "alcohol": "",
    "bestNights": {
      "monday": false,
      "tuesday": false,
      "wednesday": false,
      "thursday": false,
      "friday": false,
      "saturday": false,
      "sunday": false
    },
    "goodForKids": false,
    "goodForDancing": false,
    "goodForMeal": {
      "breakfast": false,
      "brunch": false,
      "lunch": false,
      "dinner": false,
      "lateNight": false,
      "dessert": false
    },
    "priceRange": "$",
    "parking": {
      "garage": false,
      "street": false,
      "lot": false,
      "valet": false,
      "validated": false
    },
    "noiseLevel": "",
    "attire": "",
    "hasTV": false,
    "music": {
      "jukebox": false,
      "video": false,
      "karoake": false,
      "dj": false,
      "live": false,
      "backgroundMusic": false,
      "noMusic": false
    },
    "smoking": ""
  },
  "categories": [
    {
      "alias": "delis",
      "title": "Delis"
    },
    {
      "alias": "sandwiches",
      "title": "Sandwiches"
    },
    {
      "alias": "italian",
      "title": "Italian"
    }
  ],
  "displayAddress": [
    "1517 Lincoln Blvd",
    "Santa Monica, CA 90401"
  ]
}

const user1 = {
  username: 'fucker jones',
  password: '**********',
  favorites: [
    {
      _id: '5ca66c0a437f6f2f1cff5433',
      name: 'these nuts',
    },
  ],
  feedback: [
    {
      _id: '5ca66c0a437f6f2f1cff5433',
      name: 'comment crap',
    },
  ]
};

const user2 = {
  username: 'fucker janes',
  password: '**********',
  favorites: [
    {
      _id: '5ca66c0a437f6f2f1cff5433',
      name: 'these knits',
    },
  ],
  feedback: [
      {
        _id: '5ca66c0a437f6f2f1cff5413',
        name: 'comment crap2.0',
      },
  ]
};
const user3 = {
  username: 'nippsy hussle',
  password: '**********',
  favorites: [
    {
      _id: '5ca66c0a437f6f2f1cff5403',
      name: 'these knits',
    },
  ],
  feedback: [
      {
        _id: '5ca66c0a437f6f2f1cff5433',
        name: 'comment crap3.0',
      },
  ]
};
const users = [user1, user2];

// GET request
router.get('/businesses', (req, res) => {
  dataMaster.find(req,res);
})

const dataMaster = new DataMaster(environments.development);
// test seed()
// dataMaster.seed(data);

// test seed user
//dataMaster.seedUser(users);

// test add user
// dataMaster.addUser(user3);

module.exports = router;

 