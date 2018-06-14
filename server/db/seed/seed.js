const { ObjectId } = require('mongodb');
const moment = require('moment');

const generateRandomEmail = () => {
const rand = (Math.random() * 1E20) + '@test.com';
  // console.log('random email', rand);
  return rand;
}

const generateNewSeedData = () => {
  const user_id = ObjectId();
  const user_createdAt = new moment().subtract(1, 'day').format();

  const event_id = ObjectId();
  const event_createdBy = {
    _id: user_id,
    name: 'boo',
    ageRange: '1',
    gender: 'Male',
  };
  const event_createdAt = new moment().format();
  const event_expiresAt = new moment().add(1, 'day').format();
  // console.log('generating new data');

  const userWithoutID = {
    name: 'test',
    email: generateRandomEmail(), //this isn't actually being random.
    password: 'testtest',
    ageRange: '1',
    gender: 'Male',

    accountCreatedAt: user_createdAt,
    meetingPlaces: [],
    flags: [],
    tokens: [],
  };

  const eventWithoutID = {
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

  //seed objects with IDs
  const user = { ...userWithoutID, _id: user_id };
  const event = { ...eventWithoutID, _id: event_id };

  return {
    user,
    event,
    userWithoutID,
    eventWithoutID,
  };
};

let seedData = generateNewSeedData();

//functions to return seed objects with or without IDs
const resetSeedData = () => {
  // console.log('resetting seed data');
  seedData = generateNewSeedData();
}
const getSeedUserWithoutID = () => seedData.userWithoutID;
const getSeedUser = () => seedData.user;
const getSeedEventWithoutID = () => seedData.eventWithoutID;
const getSeedEvent = () => seedData.event;

module.exports = {
  resetSeedData,
  getSeedUser,
  getSeedUserWithoutID,
  getSeedEvent,
  getSeedEventWithoutID,
};
