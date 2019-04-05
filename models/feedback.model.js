const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'business',
    },
    auras: mongoose.Schema.Types.Mixed,
    checkins: Number,
    comment: String,
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model('feedback', schema);

module.exports = Feedback;