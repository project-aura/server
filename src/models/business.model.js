const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  yelp_id: {
    type: String,
    unique: true,
  },
  auras: {
    aura: String,
    score: Number,
  },
  feedback: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'feedback',
    },
  ],
});

const Business = mongoose.model('business', schema);
module.export = Business;
