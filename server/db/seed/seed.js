const { ObjectId } = require('mongodb');
const moment = require('moment');

const generateRandomEmail = () => {
const rand = (Math.random() * 1E20) + '@test.com';
  // console.log('random email', rand);
  return rand;
}

class GenerateSeedData {
  constructor() {
    this.user_id = ObjectId();
    this.user_createdAt = new moment().subtract(1, 'day').format();
    this.userWithoutID = {
      name: 'test',
      email: generateRandomEmail(), //this isn't actually being random.
      password: 'testtest',
      ageRange: '1',
      gender: 'Male',

      accountCreatedAt: this.user_createdAt,
      meetingPlaces: [],
      flags: [],
      tokens: [],
    };

    this.event_id = ObjectId();
    this.event_createdBy = {
      _id: this.user_id,
      name: 'boo',
      ageRange: 1,
      gender: 'Male',
    };
    this.event_createdAt = new moment().format();
    this.event_expiresAt = new moment().add(1, 'day').format();
    // console.log('generating new data');


    this.eventWithoutID = {
      createdBy: this.event_createdBy,
      location: {
        lat: 22,
        lng: -44,
      },
      address: '509 S Garden St, Lake City, MN 55041',
      title: 'scaring things',
      place: 'haunted house',
      createdAt: this.event_createdAt,
      expiresAt: this.event_expiresAt,
      expiresAtHour: '1',
      expiresAtMinute: '00',
      expiresAtAM: 'AM',
      attendees: [this.event_createdBy],
      minimumPeople: 1,
      maximumPeople: 3,
      notes: 'weeeeeee',
    };

    //seed objects with IDs
    this.user = { ...this.userWithoutID, _id: this.user_id };
    this.event = { ...this.eventWithoutID, _id: this.event_id };

    this.meetingPlace = {
      _id: ObjectId(),
      name: 'Place of meeting',
      location: {
        lat: 44,
        lng: -33,
      },
      address: '123 Wonderful Road, ST',
    };

    this.homeLocation = {
      _id: ObjectId(),
      name: 'Place of living',
      location: {
        lat: 55,
        lng: -72,
      },
      address: '246 Sunshine St, ST',
    };
  };
};

let seedData = new GenerateSeedData();

//functions to return seed objects with or without IDs
const resetSeedData = () => {
  // console.log('resetting seed data');
  seedData = new GenerateSeedData();
}
const getSeedUserWithoutID = () => seedData.userWithoutID;
const getSeedUser = () => seedData.user;
const getSeedEventWithoutID = () => seedData.eventWithoutID;
const getSeedEvent = () => seedData.event;
const getSeedMeetingPlace = () => seedData.meetingPlace;
const getSeedHomeLocation = () => seedData.homeLocation;

module.exports = {
  resetSeedData,
  getSeedUser,
  getSeedUserWithoutID,
  getSeedEvent,
  getSeedEventWithoutID,
  getSeedMeetingPlace,
  getSeedHomeLocation,
};
