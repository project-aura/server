const mongoose = require('mongoose');

const schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'business',
    },
  ],
  feedback: [{ type: mongoose.Schema.Types.ObjectId, ref: 'feedback' }],
});

const User = mongoose.model('user', schema);

module.exports = User;
