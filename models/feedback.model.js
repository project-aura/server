/**
 * A feedback is between a user and a business. It must be associated with 
 * both entities to exist. 
 * 
 */
const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    user: {
      userId: String,
      objectReference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      }
    },
    business: {
      businessId: String,
      objectReference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'business',
      },
    },
    // aura, activity and attire are arrays. Only present 
    // within the context of the user voting for these
    // in the specific business.
    aura: [
      {
        type: String,
      },
    ],
    activity: [
      {
        type: String,
      },
    ],
    attire: [
      {
        type: String,
      },
    ],
    checkins: Number, // number of times the user checked in the business
    comment: String,
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model('feedback', schema);

module.exports = Feedback;
