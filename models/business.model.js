const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    yelpId: {
      type: String,
      unique: true,
    },
    alias: String,
    auras: mongoose.Schema.Types.Mixed,
    feedback: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'feedback',
      },
    ],
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
    },
  },
  {
    timestamps: true,
  }
);

// For Duplicate Added Entries
schema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('There was a duplicate key error'));
  } else {
    next();
  }
});

const Business = mongoose.model('business', schema);

module.exports = Business;
