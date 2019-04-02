/**
 * business models to be used for the database 
 * NOTES:
 * ID is automatically provided by  mongoDB named _id.
 * yelpID is from yelp
 */
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    yelpId: {
        type: String,
        unique: true,
    },
    name: String,
    alias: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
    latitude: Number,
    longitude: Number,
    url: String,
    stars: Number,
    reviewCount: Number,
    novelty: Number,
    businessImage: {
        src: String,
        owner: String,
    },
    attributes: {
        aura: String,
        wifi: String,
        alcohol: String,
        bestNights: {
            monday: Boolean,
            tuesday: Boolean,
            wednesday: Boolean,
            thursday: Boolean,
            friday: Boolean,
            saturday: Boolean,
            sunday: Boolean,
        },
        goodForKids: Boolean,
        goodForDancing: Boolean,
        goodForMeal: {
            breakfast: Boolean,
            lunch: Boolean,
            dinner: Boolean,
            lateNight: Boolean,
            dessert: Boolean,
        },
        priceRange: String,
        parking: {
            garage: Boolean,
            street: Boolean,
            lot: Boolean,
            valet: Boolean,
            validated: Boolean,
        },
        noiseLevel: String,
        attire: String,
        hasTV: Boolean,
        music: {
            jukebox: Boolean,
            video: Boolean,
            karaoke: Boolean,
            dj: Boolean,
            live: Boolean,
            backgroundMusic: Boolean,
            noMusic: Boolean,
        },
        smoking: String,
    },
    categories: {
        type: Array,
    },
    displayAddress: {
        type: Array,
    }
    
}, 
{ timestamps: true, }, // mongo creates the timestamp
);

// dump objects created from this model into 
// 'businesses' collection. 
const Business = mongoose.model('business', schema);

module.exports = Business;