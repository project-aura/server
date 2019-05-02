const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const businessController = require('../controllers/business.controller');
const DataMaster = require('../controllers/DataMaster');

const dataMaster = new DataMaster(process.env.ENVIRONMENT);
dataMaster.connectForMutations(process.env.ENVIRONMENT);

const bus = {
    yelpId: "fakeAssBusiness",
    name: "House of BeerCakes",
    alias: "house-of-beercakes-culver-city",
    address: "123 Wilshire Blvd.",
    city: "Culver City",
    state: "CA",
    postalCode: "90066",
    latitude: 0,
    longitude: 0,
    url: "https://google.com",
    stars: 1,
    reviewCount: 0,
    novelty: 3,
    attributes: {
        aura: "casual",
        wifi: "",
        alcohol: "Fuck Yes",
        goodForKids: false,
    },
};

businessController.createOne(bus);