const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({ //use a Schema if you need methods and statics
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },
  emailAddress: {
    type: String,
    required: true,
    minlength: 5,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: `{value} is not a valid email.`,
    },
  },
  accountCreatedAt: {
    type: Number,
    required: true,
  },
  ageRange: {
    type: String,
    required: true,
  },
  gender: {
    // can be m = male, f = female, u = undisclosed
    type: String,
    required: true,
    length: 1,
    trim: true,
  },
  meetingPlaces: [{
    name: {
      type: String,
      required: true,
    },
    location: {
      lat: {
        type: Number,
        required: true,
      }
      lng: {
        type: Number,
        required: true,
      }
    },
    address: {
      type: String,
      required: true,
    },
  }],
  flags: {
    type: Array,
    required: true,
  },
  tokens: [{
    access: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    }
  }]
});

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
};
