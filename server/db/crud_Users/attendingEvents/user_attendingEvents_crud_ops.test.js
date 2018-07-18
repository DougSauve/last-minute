const mongoose = require('../../mongoose_testing');
const {User} = require('../../../models/User.js');
const {Event} = require('../../../models/Event.js');
const {
  resetSeedData,
  getSeedUser,
  getSeedUserWithoutID,
  getSeedEvent
} = require('../../seed/seed');

const {createUser} = require('../createUser');

const {addAttendingEventToUser} = require('./addAttendingEventToUser');
const {updateAttendingEventOnUser} = require('./updateAttendingEventOnUser');
const {deleteAttendingEventFromUser} = require('./deleteAttendingEventFromUser');

let self, friend;
let event;

beforeAll(async () => {
  resetSeedData();
  event = getSeedEvent();
  const result1 = await createUser(getSeedUser());
  self = result1.res;
  resetSeedData();
  const result2 = await createUser(getSeedUser());
  friend = result2.res;
});

describe('addAttendingEventToUser', () => {
  test('should add an event to user.attendingEvents when it is self', (done) => {
    expect(self.attendingEvents[0]).toBeFalsy();

    addAttendingEventToUser(self, event).then(({ err, res }) => {
      expect(res.attendingEvents[0]._id).toEqual(event._id);
      //for future tests
      self = res;
      done();
    });
  });

  test('should add an event to user.attendingEvents when it is another user', (done) => {
    addAttendingEventToUser(friend, event).then(({ err, res }) => {
      expect(res.attendingEvents[0]._id).toEqual(event._id);
      done();
    });
  });
});

describe('updateAttendingEventOnUser', () => {
  test('should update an event on user.attendingEvents', (done) => {
    updateAttendingEventOnUser(self, { ...event, notes: 'boo' }).then(({ err, res }) => {
      expect(res.attendingEvents[0].notes).toBe('boo');
      done();
    });
  });

  test('should return an error if attempting to update a non-existent event in user.attendingEvents', (done) => {
    resetSeedData();
    const newEvent = getSeedEvent();
    updateAttendingEventOnUser(self, newEvent).then(({ err, res }) => {
      expect(res.attendingEvents[0].notes).toBe('weeeeeee');
      done();
    });
  });
});

describe('deleteAttendingEventFromUser', () => {
  test('should delete only the specified event from user.attendingEvents', async (done) => {
    expect.assertions(3);

    //add a second event to self
    await addAttendingEventToUser(self, getSeedEvent()).then(({ err, res }) => {
      self = res;
    });

    deleteAttendingEventFromUser(self, event).then(async ({ err, res }) => {
      expect(err).toBeFalsy();

      //check database
      let attendingEvents;
      await User.findById(res._id).then((res) => {
        attendingEvents = res.attendingEvents;
      });

      expect(attendingEvents)
      .not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
             _id: event._id
           })
         ])
       );
      expect(attendingEvents)
      .toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _id: expect.any(Object)
          })
        ])
      );
      done();
    });
  });

  test('should return an error if attempting to delete a non-existent event from user.attendingEvents', (done) => {
    resetSeedData();
    const nonExistentEvent = getSeedEvent();

    deleteAttendingEventFromUser(self, nonExistentEvent).then(async ({ err, res }) => {
      expect(res).toBeTruthy();
      expect(err).toMatch('That event could not be found');
      done();
    });
  });
});
