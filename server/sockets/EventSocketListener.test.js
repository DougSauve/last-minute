const io = require('socket.io-client');
const http = require('http');
const SocketIO = require('socket.io');

const {mongoose} = require('../db/mongoose_testing');
const {Event} = require('../models/Event');
const {resetSeedData, getSeedUser, getSeedEvent} = require('../db/seed/seed');
const {EventSocketListener} = require('./EventSocketListener');

let socket;
let httpServer;
let httpServerAddr;
let ioServer;

let user, user2;
let event, event2;

/**
 * Setup WS & HTTP servers
 */
beforeAll(async (done) => {
  httpServer = http.createServer();
  httpServerAddr = httpServer.listen().address();
  ioServer = SocketIO(httpServer);

  await ioServer.on('connection', (socket) => {
    EventSocketListener(socket);
  });
  resetSeedData();
  user = getSeedUser();
  event = getSeedEvent();
  resetSeedData();
  user2 = getSeedUser();
  event2 = getSeedEvent();

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


describe('submitEvent', () => {
  test('should submit a new event to createEvent', (done) => {
    expect.assertions(3);

    socket.emit('submitEvent', {user, event}, (err, res) => {
      expect(err).toBeFalsy();
      expect(res.createdAt).toEqual(event.createdAt);

      //check database
      Event.findById(event._id).then((res) => {
        expect(res.createdAt).toEqual(event.createdAt);
        done();
      });
    });
  });

  test('should submit an existing event to updateEvent', (done) => {
    expect.assertions(4);
    const eventWithUpdates = {...event, title: 'booga booga'};

    socket.emit('submitEvent', {user, event: eventWithUpdates}, (err, res) => {
      expect(err).toBeFalsy();
      expect(res.createdAt).toEqual(event.createdAt);

      //check database
      Event.findById(event._id).then((res) => {
        expect(res.createdAt).toEqual(event.createdAt);
        expect(res.title).toBe('booga booga');
        done();
      });
    });
  });
});

describe('readEvent', () => {
  test('should read an event from the database', (done) => {
    expect.assertions(2);

    socket.emit('readEvent', event._id, (err, res) => {
      expect(err).toBeFalsy();
      expect(res.createdAt).toEqual(event.createdAt);
      done();
    });
  });
});

describe('deleteEvent', () => {
  test('should delete only the specified event from the database', (done) => {
    expect.assertions(5);

    //add a second event
    socket.emit('submitEvent', {user: user2, event: event2}, (err, res) => {
      expect(res.createdAt).toEqual(event2.createdAt);

      socket.emit('deleteEvent', event2._id, (err, res) => {
        expect(err).toBeFalsy();
        expect(res.createdAt).toEqual(event2.createdAt);

        Event.findById(event2._id).then((res) => {
          expect(res).toBeFalsy();
          expect(err).toBeFalsy();
          done();
        });
      });
    });
  });
});
