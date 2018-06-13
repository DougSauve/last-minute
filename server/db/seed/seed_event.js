const { ObjectId } = require('mongodb');
const moment = require('moment');

const event_id = ObjectId();
const event_createdBy = {
  _id: user_id,
  name: 'boo',
  ageRange: '1',
  gender: 'Male',
};
const event_createdAt = new moment().format();
const event_expiresAt = new moment().add(1, 'day').format();

const event = {
  createdBy: event_createdBy,
  location: {
    lat: 22,
    lng: -44,
  },
  address: '509 S Garden St, Lake City, MN 55041',
  title: 'scaring things',
  place: 'haunted house',
  createdAt: event_createdAt,
  expiresAt: event_expiresAt,
  expiresAtHour: '1',
  expiresAtMinute: '00',
  expiresAtAM: 'AM',
  attendees: [event_createdBy],
  minimumPeople: 1,
  maximumPeople: 3,
  notes: 'weeeeeee',
};

module.exports = {
  event_id,
  event,
};
