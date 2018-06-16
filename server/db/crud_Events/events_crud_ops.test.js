const mongoose = require('../mongoose_testing');
const {Event} = require('../../models/Event');

const {resetSeedData, getSeedEvent} = require('../seed/seed');

const {createEvent} = require('./createEvent');
const {readEvent} = require('./readEvent');
const {updateEvent} = require('./updateEvent');
const {deleteEvent} = require('./deleteEvent');

let event1, event2_invalid, event3;

beforeAll(() => {
  resetSeedData();
  event1 = getSeedEvent();
  resetSeedData();
  let temp = getSeedEvent();
  event2_invalid = {...temp, createdBy: 6};
  resetSeedData();
  event3 = getSeedEvent();
});

describe('createEvent', () => {
  test('should create an event', async (done) => {
    expect.assertions(3);

    await Event.find({_id: event1._id}).then((res) => {
      expect(res).toEqual([]);
    });

    await createEvent(event1).then(({ err, res }) => {

      expect(res._id).toEqual(event1._id);
    });

    //check database
    Event.find({_id: event1._id}).then((res) => {
      expect(res).toBeTruthy();
      done();
    });
  });

  test('should not create an event with invalid data', async (done) => {
    expect.assertions(4);

    await Event.find({_id: event2_invalid._id}).then((res) => {

      expect(res).toEqual([]);
    });

    await createEvent(event2_invalid).then(({ err, res }) => {
      expect(res).toBeFalsy();
      expect(err).toBeTruthy();
    });

    //check database
    Event.find({_id: event2_invalid._id}).then((res) => {
      expect(res).toEqual([]);
      done();
    });
  });
});

describe('readEvent', () => {
  test('should read an event', (done) => {
    expect.assertions(1);

    readEvent(event1._id).then(({ err, res }) => {
      expect(res._id).toEqual(event1._id);
      done();
    });
  });
});

describe('updateEvent', () => {
  test('should update an event', (done) => {
    expect.assertions(3);

    updateEvent({ ...event1, place: 'Florida' }).then(({ err, res }) => {
      expect(res._id).toEqual(event1._id);
      expect(res.place).toBe('Florida');
    });

    //check database
    Event.findById(event1._id).then((res) => {
      expect(res.place).toBe('Florida');
      done();
    });
  });

  test('should not update an event with invalid data', (done) => {
    expect.assertions(3);

    updateEvent({ ...event1, place: 'Oxford', maximumPeople: 'clouds' }).then(({ err, res }) => {
      expect(res).toBeFalsy();
      expect(err).toBeTruthy();
    });

    //check database
    Event.findById(event1._id).then((res) => {
      expect(res.place).toBe('Florida');
      done();
    });
  });
});

describe('deleteEvent', () => {
  test('should delete only the specified event', async (done) => {
    expect.assertions(3);

    //add another event
    await createEvent(event3);

    deleteEvent(event1._id).then(({ err, res }) => {
      expect(res._id).toEqual(event1._id);

      //check to be sure event1 is gone
      Event.findById(event1._id).then((res) => {
        expect(res).toBeFalsy();

        //check to be sure event3 is not gone
        Event.findById(event3._id).then((res) => {
          expect(res).toBeTruthy();
          done();
        });
      });
    });
  });

  test('should return a error when attempting to delete a non-existent event', (done) => {
    expect.assertions(2);

    deleteEvent(event2_invalid._id).then(({ err, res }) => {
      expect(res).toBeFalsy();
      expect(err).toBeFalsy(); //findOneAndRemove simply returns null if there wasn't one - no error
      done();
    });
  });
});
