const mongoose = require('../../mongoose_testing');
const {User} = require('../../../models/User.js');
const {
  resetSeedData,
  getSeedUser,
  getSeedHomeLocation,
} = require('../../seed/seed');

const {createUser} = require('../createUser');

const {addHomeLocationToUser} = require('./addHomeLocationToUser');
const {deleteHomeLocationFromUser} = require('./deleteHomeLocationFromUser');

let user, homeLocation;

beforeAll(async () => {
  resetSeedData();
  const result = await createUser(getSeedUser());
  user = result.res;
  homeLocation = getSeedHomeLocation();
});

describe('addHomeLocationToUser', () => {
  test('should add a homeLocation to user.homeLocations', (done) => {
    expect.assertions(3);
    expect(user.homeLocations[0]).toBeFalsy();

    addHomeLocationToUser(user, homeLocation).then(async ({ err, res }) => {
      expect(res.homeLocations[0]._id).toEqual(homeLocation._id);
      //for future tests
      user = res;

      // check database
      let homeLocations;
      await User.findById(res._id).then((res) => {
        homeLocations = res.homeLocations;
      });

      expect(homeLocations)
      .toEqual(
        expect.arrayContaining([
          expect.objectContaining({
             _id: homeLocation._id
           })
         ])
       );

      done();
    });
  });
});

describe('deleteHomeLocationFromUser', () => {
  test('should delete only the specified homeLocation from user.homeLocations', (done) => {
    expect.assertions(3);

    //add a second homeLocation to user
    resetSeedData();
    const homeLocation2 = getSeedHomeLocation();

    addHomeLocationToUser(user, homeLocation2).then(({ err, res }) => {
      user = res;

      deleteHomeLocationFromUser(user, homeLocation2._id).then(({ err, res }) => {
        expect(err).toBeFalsy();

        //check database
        let homeLocations;
        User.findById(res._id).then((res) => {
          homeLocations = res.homeLocations;
          
          expect(homeLocations)
          .not.toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                _id: homeLocation2._id
              })
            ])
          );
          expect(homeLocations)
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
    });
  });

  test('should return an error if attempting to delete a non-existent homeLocation from user.homeLocations', (done) => {
    resetSeedData();
    const nonExistentHomeLocation = getSeedHomeLocation();

    deleteHomeLocationFromUser(user, nonExistentHomeLocation).then(async ({ err, res }) => {
      expect(res).toBeTruthy();
      expect(err).toBe('That homeLocation could not be found');
      done();
    });
  });
});
