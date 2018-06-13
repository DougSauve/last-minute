const mongoose = require('../../mongoose');

const { User } = require('../../../models/User');
const { Event } = require('../../../models/Event');
const { addAttendingEventToUser } = require('./addAttendingEventToUser');
const { user, event} = require('./seed/seed_addAttendingEventToUser');

 let user1, event1;

beforeAll(() => {
  user1 = new User(userTo);
  event1 = new Event(event);
});

afterAll((done) => {
  mongoose.disconnect(done);
});

describe('addAttendingEventsToUser', () => {
  test('should add the event to the attendingEvents property in user', (done) => {

    addAttendingEventToUser(user1, event1).then(({err, res}) => {
      console.log(err, res);
      console.log('pumbaa');
      done();
    });
  });
});
