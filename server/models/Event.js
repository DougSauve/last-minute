const mongoose = require('mongoose');

const Event = mongoose.model('Event', {
  // creator: {
  //   id: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     required: true,
  //   },
  //   name: {
  //     type: String,
  //     required: true,
  //   }
  // },
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
    required: false,
    minlength: 1,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  place: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
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
  // attendees: {
  //   //each entry contains an object: { User _id, name }
  //   type: Array,
  //   required: true,
  // },
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
});

module.exports = {
  Event
};
