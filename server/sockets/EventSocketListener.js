const db = require('../db/crud_Events/_crud_Events');
const user_db = require('../db/crud_Users/_crud_Users');

const EventSocketListener = (socket) => {

  socket.on('submitEvent', async ({user, event}, acknowledge) => {

    let err;
    let successMessage;
    let result;
    let updatedUser;

    if (!await db.readEvent(event._id)) {

      result = await db.createEvent(event);

      if(!result) {
        err = "An error occured during event creation.";
      } else {
        successMessage = `${result.title} has been added.`;

        //add event to user's attendingEvents list and hostedEvents list.
        user_db.addEventToUser(user, result);
        updatedUser = user_db.addHostedEventToUser(user, result); //this also adds the location to their meetingPlaces
      }

    } else {

      result = await db.updateEvent(event);

      if (!result) {
        err = "event update failed.";
      } else {
        successMessage = `${result.title} has been updated.`;

        //update event onto user's attendingEvents list and hostedEvents list.
        user_db.updateEventOnUser(user, result);
        updatedUser = user_db.updateHostedEventOnUser(user, result); //this also adds the location to their meetingPlaces
      }
    }
    acknowledge(err, successMessage, result, updatedUser);
  });

  socket.on('readEvent', async (_id, acknowledge) => {
    let err;
    let res;

    res = await db.readEvent(_id);

    if (!res) err = 'Could not find event';

    acknowledge(err, res);
  });

  //this will change to 'read all events in user's area. Checking for age will become part of this.'
  socket.on('readAllEvents', async (acknowledge) => {
    let err;
    let result;

    result = await db.readAllEvents();

    if (!result) err = `Could not find any events.`;

    acknowledge(err, result);
  });

  socket.on('deleteEvent', async (user, _id, acknowledge) => {
    let err;
    let result;

    result = await db.deleteEvent(_id);

    if (!result) err = `Could not find the event to delete.`;
    user_db.removeHostedEventFromUser(user, result);

    acknowledge(err, result);
  });

  socket.on('deleteAllEvents', async (password, acknowledge) => {
    let err;
    let result;

    result = await db.deleteAllEvents(sanitize(password));
    if (result === true) {
       err = 'Incorrect password.';
    } else if (!result) err = `Could not find any events.`;

    acknowledge(err, result);
  });
};

module.exports = {
  EventSocketListener
};
