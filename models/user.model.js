const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const CustomError = require('../helpers/CustomError');

const schema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
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

schema.pre('save', async function() {
  // check if the password has been updated
  if (this.isModified('password')) {
    // hash it
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(this.password, salt);
    // set user's password to the hash
    this.password = hash;
  }
  // pass it along
});

// Handle duplicates after submission to mongo.
schema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new CustomError(400, 'Username already exists: please provide a different username.'));
  } else {
    next();
  }
});

// Update hooks
schema.pre('findByIdAndUpdate', async function(error, doc, next) {
  const { password } = this._update;
  if (password) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    // set user's password to the hash
    this._update.password = hash;
  }
});

// TODO: Delete Passwords from the object given back

const User = mongoose.model('user', schema, 'users');

module.exports = User;
