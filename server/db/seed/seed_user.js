const { ObjectId } = require('mongodb');
const moment = require('moment');

const user_id = ObjectId();
const user_createdAt = new moment().subtract(1, 'day').format();
const randomEmail = (Math.random() * 1E20) + '@test.com';

const user = {
  _id: user_id,
  name: 'test',
  email: randomEmail,
  password: 'testtest',
  ageRange: '1',
  gender: 'Male',

  accountCreatedAt: user_createdAt,
  meetingPlaces: [],
  flags: [],
  tokens: [],
};

const userToCreate = {
  name: 'test',
  email: randomEmail,
  password: 'testtest',
  ageRange: '1',
  gender: 'Male',

  accountCreatedAt: user_createdAt,
  meetingPlaces: [],
  flags: [],
  tokens: [],
};

module.exports = {
  user_id,
  user,
  userToCreate,
};
