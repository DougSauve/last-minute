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
  email: {
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
  //system-generated properties below here
  accountCreatedAt: {
    type: String,
    required: true,
  },
  currentHomeLocation: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    location: {
      lat: {
        type: Number,
        required: false,
      },
      lng: {
        type: Number,
        required: false,
      },
    },
    address: {
      type: String,
      required: false,
    },
  },
  homeLocations: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
  }],
  meetingPlaces: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
  }],
  hostedEvents: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    createdBy: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      ageRange: {
        type: Number,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
    },
    location: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      }
    },
    address: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: String,
      required: true,
    },
    expiresAtHour: {
      type: String,
      required: true,
    },
    expiresAtMinute: {
      type: String,
      required: true,
    },
    expiresAtAM: {
      type: String,
      required: true,
    },
    attendees: [{
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      ageRange: {
        type: Number,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
    }],
    minimumPeople: {
      type: Number,
      required: true,
    },
    maximumPeople: {
      type: Number,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
  }],
  attendingEvents: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    createdBy: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      ageRange: {
        type: Number,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
    },
    location: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      }
    },
    address: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: String,
      required: true,
    },
    expiresAtHour: {
      type: String,
      required: true,
    },
    expiresAtMinute: {
      type: String,
      required: true,
    },
    expiresAtAM: {
      type: String,
      required: true,
    },
    attendees: [{
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      ageRange: {
        type: Number,
        required: true,
      },
      gender: {
        type: String,
        required: true,
      },
    }],
    minimumPeople: {
      type: Number,
      required: true,
    },
    maximumPeople: {
      type: Number,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
  }],
  searchPreferences: {
    distance: {
      type: Number,
      required: true,
    },
    units: {
      type: String,
      required: true
    },
  },
  flags: [{
    flag: {
      type: String,
      required: true,
    },
  }],
  tokens: [{
    access: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  }]
});

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
};
