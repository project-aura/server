const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    yelpId: {
      type: String,
      unique: true
    },
    alias: String,
    likes: { type: Number, default: 0 },
    auras: {
      trendy: { type: Number, default: 0 },
      romantic: { type: Number, default: 0 },
      hipster: { type: Number, default: 0 },
      inspired: { type: Number, default: 0 },
      cheerful: { type: Number, default: 0 },
      intimate: { type: Number, default: 0 },
      classy: { type: Number, default: 0 },
      casual: { type: Number, default: 0 },
      touristy: { type: Number, default: 0 },
      upscale: { type: Number, default: 0 },
      lively: { type: Number, default: 0 },
      groovy: { type: Number, default: 0 },
      imaginative: { type: Number, default: 0 },
      exotic: { type: Number, default: 0 },
      peaceful: { type: Number, default: 0 },
      powerful: { type: Number, default: 0 }
    },
    usersVotedAura: [
      {
        userId: String,
        aura: [
          {
            type: String,
          },
        ],
        // nest reference to object in here to allow populate()
        objectReference: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
      }
    ],
    activities: {
      eating: { type: Number, default: 0 },
      drinking: { type: Number, default: 0 },
    },
    usersLiked: [
      {
        userId: String,
        // nest reference to object in here to allow populate()
        objectReference: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
      }
    ],
    feedback: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'feedback'
      }
    ],
    address: String,
    city: String,
    citySearch: String,
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
      owner: String
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
        sunday: Boolean
      },
      goodForKids: Boolean,
      goodForDancing: Boolean,
      goodForMeal: {
        breakfast: Boolean,
        lunch: Boolean,
        dinner: Boolean,
        lateNight: Boolean,
        dessert: Boolean
      },
      priceRange: String,
      parking: {
        garage: Boolean,
        street: Boolean,
        lot: Boolean,
        valet: Boolean,
        validated: Boolean
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
        noMusic: Boolean
      },
      smoking: String
    },
    categories: {
      type: Array
    },
    categorySearch: String,
    displayAddress: {
      type: Array
    }
  },
  {
    timestamps: true
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
