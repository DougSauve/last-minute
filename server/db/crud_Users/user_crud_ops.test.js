const mongoose = require('../mongoose_testing');
const { User } = require('../../models/User.js');
const {getSeedUserWithoutID} = require('../seed/seed');
const {createUser} = require('./createUser');
const {readUser} = require('./readUser');
const {validateUser} = require('./validateUser');
const {updateUser} = require('./updateUser');
const {deleteUser} = require('./deleteUser');

const userToCreate = getSeedUserWithoutID();

const invalidUserToCreate = { ...userToCreate, password: '' };
//gets set in createUser test
let user;

describe('createUser', () => {
  test('should create a user', async (done) => {
    expect.assertions(3);

    const {err, res} = await createUser(userToCreate);
    expect(err).toBeFalsy();
    expect(res.id).toBeTruthy();

    //check the database
    let res_name;
    await User.findById(res._id).then((res) => {
      res_name = res.name;
    });

    expect(res_name).toBe('test');

    //for further tests
    user = res;
    done();
  });

  test('should not create a user with invalid data', async (done) => {
    expect.assertions(3);

    const {err, res} = await createUser(invalidUserToCreate);
    expect(err).toBeTruthy();
    expect(res).toBeFalsy();

    //check the database
    try {
      await User.findById(res._id).then((res) => {
        console.log('oops');
      });
    } catch (err) {
      expect(err).toBeTruthy();
    }

    done();
  });
});

describe('readUser', () => {
  test('should read a user', async (done) => {
    const {err, res} = await readUser(user._id);
    expect(err).toBeFalsy();
    expect(res.id).toBeTruthy();
    done();
  });

  test('should not read a user with invalid ID', async (done) => {
    const {err, res} = await readUser('abc');
    expect(err).toBeTruthy();
    expect(res).toBeFalsy();
    done();
  });
});

describe('validateUser', () => {
  expect.assertions(2);

  test('should validate a user with correct credentials', async (done) => {
    const creds = { email: user.email, password: user.password };

    validateUser(creds).then(({ err, user }) => {
      expect(user.name).toBe('test');
      expect(err).toBeFalsy();
      done();
    });
  });

  test('should not validate a user with incorrect credentials', async (done) => {
    const creds = { email: user.email, password: 'password' };

    validateUser(creds).then(({ err, user }) => {
      expect(user).toBeFalsy();
      expect(err).toBe('incorrect password.');
      done();
    });
  });
});

describe('updateUser', () => {
  test('should update a user', (done) => {
    expect.assertions(3);

    const userWithUpdate = {...user._doc, gender: 'Female'}; // <- this is really weird - jest only, I think.
    updateUser(userWithUpdate).then(async ({err, res}) => {
      expect(err).toBeFalsy();
      expect(res).toBeTruthy();

      //check the database
      let res_gender;
      await User.findById(res._id).then((res) => {
        res_gender = res.gender;
      });

      expect(res_gender).toBe('Female');

      done();
    });
  });


  test('should not update a user with invalid information', (done) => {
    expect.assertions(3);
    const invalidUserWithUpdate = {...user._doc, _id: 'abc', gender: 'Unknown'};

    updateUser(invalidUserWithUpdate).then(async ({err, res}) => {
      expect(err).toBeTruthy();
      expect(res).toBeFalsy();

      //check the database
      try {
        await User.findById(user._id).then((res) => {
          expect(res.gender).toBe('Female');
        });
      } catch (err) {
        console.log('oops:', err);
      }

      done();
    });
  });
});

describe('deleteUser', () => {
  expect.assertions(4);

  test('should delete a user', async (done) => {
    //check the database to be sure user exists
    let res_name;
    await User.findById(user._id).then((res) => {
      res_name = res.name;
    });

    expect(res_name).toBe('test');

    const {err, res} = await deleteUser(user._id);
    expect(err).toBeFalsy();
    expect(res.id).toBeTruthy();

    //check the database to be user does not exist anymore
    await User.findById(user._id).then((res) => {
      expect(res).toBe(null);
    });

    done();
  });
});
