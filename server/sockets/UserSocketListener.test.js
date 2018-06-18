const io = require('socket.io-client');
const http = require('http');
const SocketIO = require('socket.io');

const {mongoose} = require('../db/mongoose_testing');
const {User} = require('../models/User');
const {
  resetSeedData,
  getSeedUser,
  getSeedUserWithoutID,
  getSeedEvent,
  getSeedHomeLocation,
  getSeedMeetingPlace,
} = require('../db/seed/seed');
const {UserSocketListener} = require('./UserSocketListener');

let socket;
let httpServer;
let httpServerAddr;
let ioServer;

let user, user2;
let event, event2;
let attendingEvent;
let hostedEvent;
let homeLocation;
let meetingPlace;

/**
 * Setup WS & HTTP servers
 */
beforeAll(async (done) => {
  httpServer = http.createServer();
  httpServerAddr = httpServer.listen().address();
  ioServer = SocketIO(httpServer);

  await ioServer.on('connection', (socket) => {
    UserSocketListener(socket);
  });
  resetSeedData();
  user = getSeedUserWithoutID();
  event = getSeedEvent();
  resetSeedData();
  user2 = getSeedUser();
  event2 = getSeedEvent();
  resetSeedData();
  let attendingEventTemp = getSeedEvent();
  attendingEvent = {...attendingEventTemp, title: 'Hobnobs'};
  homeLocation = getSeedHomeLocation();
  meetingPlace = getSeedMeetingPlace();
  resetSeedData();
  let hostedEventTemp = getSeedEvent();
  hostedEvent = {...hostedEventTemp, title: 'Zammypooey'};
  done();
});

/**
 *  Cleanup WS & HTTP servers
 */
afterAll((done) => {
  ioServer.close();
  httpServer.close();
  done();
});

beforeEach( async(done) => {
  // Setup
  // Do not hardcode server port and address, square brackets are used for IPv6
  socket = await io.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    done();
  });
});

afterEach((done) => {
  // Cleanup
  if (socket.connected) {
    socket.disconnect();
  }
  done();
});

jest.setTimeout(7000);

describe('createUser', () => {
  test('should create a user', (done) => {
    expect.assertions(3);

    socket.emit('createUser', user, (err, res) => {
      expect(err).toBeFalsy();
      expect(res.createdAt).toBe(user.createdAt);

      user = res;

      User.findById(res._id).then((res) => {
        expect(res.createdAt).toBe(user.createdAt);
        done();
      });
    });
  });
});

describe('readUser', () => {
  test('should read a user from the database', (done) => {
    expect.assertions(2);

    socket.emit('readUser', user._id, (err, res) => {
      expect(err).toBeFalsy();
      expect(res.createdAt).toBe(user.createdAt);
      done();
    });
  });
});

describe('updateUser', () => {
  test('should update a user', (done) => {
    expect.assertions(5);

    const userWithUpdates = {...user, name: 'Waddles'};

    socket.emit('updateUser', userWithUpdates, (err, res) => {
      expect(err).toBeFalsy();
      expect(res.createdAt).toBe(user.createdAt);
      expect(res.name).toBe('Waddles');
      user = res;

      User.findById(res._id).then((res) => {
        expect(res.createdAt).toBe(user.createdAt);
        expect(res.name).toBe('Waddles');
        done();
      });
    });
  });
});

describe('validateUser', () => {
  test('should validate a user with correct credentials', (done) => {
    expect.assertions(1);
    socket.emit('validateUser', {email: user.email, password: user.password}, (err, res) => {
      expect(res.createdAt).toBe(user.createdAt);
      done();
    });
  });

  test('should not validate a user with incorrect credentials', (done) => {
    expect.assertions(2);
    socket.emit('validateUser', {email: user.email, password: 'foolishBunny'}, (err, res) => {
      expect(res).toBeFalsy();
      expect(err).toBe('Incorrect password.');
      done();
    });
  });
});

describe('addAttendingEventToUser', () => {
  test('should add an event to a user', (done) => {
    expect.assertions(4);

    socket.emit('addAttendingEventToUser', {user, event: attendingEvent}, (err, res) => {
      expect(res.createdAt).toBe(user.createdAt);
      expect(res.attendingEvents).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: attendingEvent.title
          })
        ])
      );

      User.findById(user._id).then((res) => {
        expect(res.createdAt).toBe(user.createdAt);
        expect(res.attendingEvents).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              title: attendingEvent.title
            })
          ])
        );
        user = res;
        done();
      })

    });
  });
});

describe('updateAttendingEventOnUser', () => {
  test('should update an event on a user', (done) => {
    expect.assertions(4);
    const attendingEventWithUpdates = {...attendingEvent, place: 'Gnomeville'};

    socket.emit('updateAttendingEventOnUser', {user, event: attendingEventWithUpdates}, (err, res) => {
      expect(res.createdAt).toBe(user.createdAt);
      expect(res.attendingEvents).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            place: 'Gnomeville'
          })
        ])
      );

      User.findById(user._id).then((res) => {
        expect(res.createdAt).toBe(user.createdAt);
        expect(res.attendingEvents).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              place: 'Gnomeville'
            })
          ])
        );
        user = res;
        done();
      });
    });
  });
});

describe('deleteAttendingEventFromUser', () => {
  test('should delete an event from a user', (done) => {
    expect.assertions(4);
    socket.emit('deleteAttendingEventFromUser', {user, event: attendingEvent}, (err, res) => {
      expect(res.createdAt).toBe(user.createdAt);
      expect(res.attendingEvents).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: attendingEvent.title
          })
        ])
      );

      User.findById(user._id).then((res) => {
        expect(res.createdAt).toBe(user.createdAt);
        expect(res.attendingEvents).not.toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              title: attendingEvent.title
            })
          ])
        );
        done();
      })

    });
  });
});

describe('addHostedEventToUser', () => {
  test('should add an event to a user', (done) => {
    expect.assertions(4);
    socket.emit('addHostedEventToUser', {user, event: hostedEvent}, (err, res) => {
      expect(res.createdAt).toBe(user.createdAt);
      expect(res.hostedEvents).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: hostedEvent.title
          })
        ])
      );

      User.findById(user._id).then((res) => {
        expect(res.createdAt).toBe(user.createdAt);
        expect(res.hostedEvents).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              title: hostedEvent.title
            })
          ])
        );
        user = res;
        done();
      })

    });
  });
});

describe('updateHostedEventOnUser', () => {
  test('should update an event on a user', (done) => {
    expect.assertions(4);
    const hostedEventWithUpdates = {...hostedEvent, place: 'Australasia'};

    socket.emit('updateHostedEventOnUser', {user, event: hostedEventWithUpdates}, (err, res) => {
      expect(res.createdAt).toBe(user.createdAt);
      expect(res.hostedEvents).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            place: 'Australasia'
          })
        ])
      );

      User.findById(user._id).then((res) => {
        expect(res.createdAt).toBe(user.createdAt);
        expect(res.hostedEvents).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              place: 'Australasia'
            })
          ])
        );
        user = res;
        done();
      });
    });
  });
});

describe('deleteHostedEventFromUser', () => {
  test('should delete an event from a user', (done) => {
    expect.assertions(4);
    socket.emit('deleteHostedEventFromUser', {user, event: hostedEvent}, (err, res) => {
      expect(res.createdAt).toBe(user.createdAt);
      expect(res.hostedEvents).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: hostedEvent.title
          })
        ])
      );

      User.findById(user._id).then((res) => {
        expect(res.createdAt).toBe(user.createdAt);
        expect(res.hostedEvents).not.toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              title: hostedEvent.title
            })
          ])
        );
        done();
      })
    });
  });
});

describe('addHomeLocationToUser', () => {
  test('should add a homeLocation to a user', (done) => {
    expect.assertions(2);
    socket.emit('addHomeLocationToUser', {user, homeLocation}, (err, res) => {
      expect(res.homeLocations[0].name).toBe(homeLocation.name);

      User.findById(user._id).then((res) => {
        expect(res.homeLocations).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: homeLocation.name
            })
          ])
        );

        user = res;
        done();
      })

    });
  });
});

describe('deleteHomeLocationFromUser', () => {
  test('should delete a homeLocation from a user', (done) => {
    expect.assertions(2);
    socket.emit('deleteHomeLocationFromUser', {user, _id: homeLocation._id}, (err, res) => {
      expect(res.homeLocations[0]).toBeFalsy();

      User.findById(user._id).then((res) => {
        expect(res.homeLocations).not.toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: homeLocation.name
            })
          ])
        );
        done();
     })

    });
  });
});

describe('addMeetingPlaceToUser', () => {
  test('should add a meetingPlace to a user', (done) => {
    expect.assertions(2);
    socket.emit('addMeetingPlaceToUser', {user, meetingPlace}, (err, res) => {
      expect(res.meetingPlaces[0].name).toBe(meetingPlace.name);

      User.findById(user._id).then((res) => {
        expect(res.meetingPlaces).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: meetingPlace.name
            })
          ])
        );

        user = res;
        done();
      })

    });
  });
});

describe('deleteMeetingPlaceFromUser', () => {
  test('should delete a meetingPlace from a user', (done) => {
    expect.assertions(2);
    socket.emit('deleteMeetingPlaceFromUser', {user, _id: meetingPlace._id}, (err, res) => {
      expect(res.meetingPlaces[0]).toBeFalsy();

      User.findById(user._id).then((res) => {
        expect(res.meetingPlaces).not.toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: meetingPlace.name
            })
          ])
        );
        done();
     })

    });
  });
});
//In test database, the user will not have a meetingPlace event because the events were persisted through the user variable in this file, which is not used again after this.

describe('deleteUser', () => {
  test('should delete only the specified user from the database', (done) => {
    expect.assertions(5);

    //add a new user
    socket.emit('createUser', (user2), (err, res) => {
      expect(res.createdAt).toBe(user2.createdAt);

      socket.emit('deleteUser', user2._id, (err, res) => {
        expect(err).toBeFalsy();
        expect(res.createdAt).toBe(user2.createdAt);

        User.findById(user2._id).then((res) => {
          expect(res).toBeFalsy();
          expect(err).toBeFalsy();
          done();
        });
      });
    });
  });
});
