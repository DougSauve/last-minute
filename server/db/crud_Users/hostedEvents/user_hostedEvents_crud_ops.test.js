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

const {addHostedEventToUser} = require('./addHostedEventToUser');
const {updateHostedEventOnUser} = require('./updateHostedEventOnUser');
const {deleteHostedEventFromUser} = require('./deleteHostedEventFromUser');

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

describe('addHostedEventToUser', () => {
  test('should add an event to user.hostedEvents when it is self', (done) => {
    expect(self.hostedEvents[0]).toBeFalsy();

    addHostedEventToUser(self, event).then(({ err, res }) => {
      expect(res.hostedEvents[0]._id).toEqual(event._id);
      //for future tests
      self = res;
      done();
    });
  });

  test('should add an event to user.hostedEvents when it is another user', (done) => {
    addHostedEventToUser(friend, event).then(({ err, res }) => {
      expect(res.hostedEvents[0]._id).toEqual(event._id);
      done();
    });
  });
});

describe('updateHostedEventOnUser', () => {
  test('should update an event on user.hostedEvents', (done) => {
    updateHostedEventOnUser(self, { ...event, notes: 'boo' }).then(({ err, res }) => {
      expect(res.hostedEvents[0].notes).toBe('boo');
      done();
    });
  });

  test('should return an error if attempting to update a non-existent event in user.hostedEvents', (done) => {
    resetSeedData();
    const newEvent = getSeedEvent();
    updateHostedEventOnUser(self, newEvent).then(({ err, res }) => {
      expect(res.hostedEvents[0].notes).toBe('weeeeeee');
      done();
    });
  });
});

describe('deleteHostedEventFromUser', () => {
  test('should delete only the specified event from user.hostedEvents', async (done) => {
    expect.assertions(3);

    //add a second event to self
    await addHostedEventToUser(self, getSeedEvent()).then(({ err, res }) => {
      self = res;
    });

    deleteHostedEventFromUser(self, event).then(async ({ err, res }) => {
      expect(err).toBeFalsy();

      //check database
      let hostedEvents;
      await User.findById(res._id).then((res) => {
        hostedEvents = res.hostedEvents;
      });

      expect(hostedEvents)
      .not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
             _id: event._id
           })
         ])
       );
      expect(hostedEvents)
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

  test('should return an error if attempting to delete a non-existent event from user.hostedEvents', (done) => {
    resetSeedData();
    const nonExistentEvent = getSeedEvent();

    deleteHostedEventFromUser(self, nonExistentEvent).then(async ({ err, res }) => {
      expect(res).toBeTruthy();
      expect(err).toBe('That event could not be found');
      done();
    });
  });
});
