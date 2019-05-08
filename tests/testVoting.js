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
    }
    
};


businessController.updateMany({
    likes: 0, 
    auras: {
        trendy: 0, 
        romantic: 0, 
        hipster: 0, 
        inspired: 0, 
        cheerful: 0, 
        intimate: 0, 
        classy: 0, 
        casual: 0, 
        touristy: 0, 
        upscale: 0, 
        lively: 0, 
        groovy: 0, 
        imaginative: 0, 
        exotic: 0, 
        peaceful: 0, 
        powerful: 0, 
      },
      usersVoted: [],
});
