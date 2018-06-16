const mongoose = require('../../mongoose_testing');
const {Event} = require('../../../models/Event');

const {resetSeedData, getSeedEvent, getSeedUser} = require('../../seed/seed');
const {createEvent} = require('../createEvent');

const {addAttendeeToEvent} = require('./addAttendeeToEvent');
const {deleteAttendeeFromEvent} = require('./deleteAttendeeFromEvent');


let event, host, attendee;

beforeAll( async () => {
  resetSeedData();
  await createEvent(getSeedEvent()).then(({ err, res }) => event = res);
  host = getSeedUser();
  resetSeedData();
  attendee = getSeedUser();
});

describe('addAttendeeToEvent', () => {
  test('should add an attendee to an event', (done) => {
    expect.assertions(4);

    Event.findById(event._id).then((res) => {
      expect(res.attendees[0]._id).toEqual(host._id);
    });

    addAttendeeToEvent(attendee, event).then(({ err, res}) => {
      expect(res.attendees[1]._id).toEqual(attendee._id);
      event = res;
    });

    //check database
    Event.findById(event._id).then((res) => {
      expect(res.attendees[0]._id).toEqual(host._id);
      expect(res.attendees[1]._id).toEqual(attendee._id);
      done();
    });

  });
});

describe('deleteAttendeeFromEvent', () => {
  test('should remove only the specified attendee from an event.', (done) => {

    deleteAttendeeFromEvent(attendee, event).then(({ err, res }) => {
      expect(res.attendees[0]._id).toEqual(host._id);
      expect(res.attendees[1]).toBeFalsy();
      done();
    });
    });
});
