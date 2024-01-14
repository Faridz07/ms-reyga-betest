const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true
  },
  userName: {
    type: String,
    required: true
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true
  },
  emailAddress: {
    type: String,
    required: true,

    unique: true,
    lowercase: true,
    match: [/\S+@\S+.\S+/, 'is invalid']
  },
  identityNumber: {
    type: String,
    required: true,
    unique: true
  }
}, { toJSON: { versionKey: false } });

userSchema.index({ accountNumber: 1 }, { unique: true });
userSchema.index({ identityNumber: 1 }, { unique: true });

userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  delete userObject._id;
  delete userObject.__v;

  return userObject;
};

module.exports = mongoose.model('User', userSchema);