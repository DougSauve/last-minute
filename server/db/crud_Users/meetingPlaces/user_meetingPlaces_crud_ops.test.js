const mongoose = require('../../mongoose_testing');
const {User} = require('../../../models/User.js');
const {
  resetSeedData,
  getSeedUser,
  getSeedMeetingPlace,
} = require('../../seed/seed');

const {createUser} = require('../createUser');

const {addMeetingPlaceToUser} = require('./addMeetingPlaceToUser');
const {deleteMeetingPlaceFromUser} = require('./deleteMeetingPlaceFromUser');

let user, meetingPlace;

beforeAll(async () => {
  resetSeedData();
  const result = await createUser(getSeedUser());
  user = result.res;
  meetingPlace = getSeedMeetingPlace();
});

describe('addMeetingPlaceToUser', () => {
  test('should add a meetingPlace to user.meetingPlaces', (done) => {
    expect.assertions(3);
    expect(user.meetingPlaces[0]).toBeFalsy();

    addMeetingPlaceToUser(user, meetingPlace).then(async ({ err, res }) => {
      expect(res.meetingPlaces[0]._id).toEqual(meetingPlace._id);
      //for future tests
      user = res;

      // check database
      let meetingPlaces;
      await User.findById(res._id).then((res) => {
        meetingPlaces = res.meetingPlaces;
      });

      expect(meetingPlaces)
      .toEqual(
        expect.arrayContaining([
          expect.objectContaining({
             _id: meetingPlace._id
           })
         ])
       );

      done();
    });
  });
});

describe('deleteMeetingPlaceFromUser', () => {
  test('should delete only the specified meetingPlace from user.meetingPlaces', async (done) => {
    expect.assertions(3);

    //add a second meetingPlace to user
    resetSeedData();
    await addMeetingPlaceToUser(user, getSeedMeetingPlace()).then(({ err, res }) => {
      user = res;
    });

    deleteMeetingPlaceFromUser(user, meetingPlace).then(async ({ err, res }) => {
      expect(err).toBeFalsy();

      //check database
      let meetingPlaces;
      await User.findById(res._id).then((res) => {
        meetingPlaces = res.meetingPlaces;
      });

      expect(meetingPlaces)
      .not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
             _id: meetingPlace._id
           })
         ])
       );
      expect(meetingPlaces)
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

  test('should return an error if attempting to delete a non-existent meetingPlace from user.meetingPlaces', (done) => {
    resetSeedData();
    const nonExistentMeetingPlace = getSeedMeetingPlace();

    deleteMeetingPlaceFromUser(user, nonExistentMeetingPlace).then(async ({ err, res }) => {
      expect(res).toBeTruthy();
      expect(err).toBe('That meetingPlace could not be found');
      done();
    });
  });
});
