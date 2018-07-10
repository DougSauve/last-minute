import { getAllEventsFromDB } from './loadState';

class JoiningEvents {
  constructor(socket, setEvents, setUser, setUserSubmitError) {
    this.socket = socket;
    this.setEvents = setEvents;
    this.setUser = setUser;
    this.setUserSubmitError = setUserSubmitError;
  };

  addAttendeeToEvent = (attendee, event) => {
    return new Promise((resolve, reject) => {
      this.socket.emit('addAttendeeToEvent', {attendee, event}, (err, res) => {
        if (err) resolve(this.setUserSubmitError(err));
        resolve(res);
      });
    });
  };

  deleteAttendeeFromEvent = (attendee, event) => {
    return new Promise((resolve, reject) => {

      try {
        this.socket.emit('deleteAttendeeFromEvent', {attendee, event}, (err, res) => {
          if (err) resolve(this.setUserSubmitError(err));
          resolve(res);
        });
      }catch(e){
        reject(e);
      };

    });
  };

  addAttendingEventToUser = (user, event) => {
    return new Promise((resolve, reject) => {
      this.socket.emit('addAttendingEventToUser', {user, event}, (err, res) => {
        if (err) resolve(this.setUserSubmitError(err));
        resolve(res);
      });
    })
  };

  deleteAttendingEventFromUser = (user, event) => {
    return new Promise((resolve, reject) => {
      this.socket.emit('deleteAttendingEventFromUser', {user, event}, (err, res) => {

        if (err) resolve(this.setUserSubmitError(err));
        resolve(res);
      });
    });
  };

  updateAssociatedUsers(event, user_id) {
    return new Promise((resolve, reject) => {

      let attendeeWithFinalUpdates = 'none';

      event.attendees.forEach((attendee, index) => {

        if (JSON.stringify(attendee._id) !== JSON.stringify(event.createdBy._id)) {
          //get actual user from attendee thing
          this.socket.emit('readUser', attendee._id, (err, res) => {
            if (err) reject('err in joiningEvents 64, readUser call', err);

            this.socket.emit('updateAttendingEventOnUser', {user: res, event: event}, (err2, res2) => {
              if (err2) reject('err in joiningEvents 67, updateAttendingEventOnUser call: attendee:', attendee, err2);

              if (JSON.stringify(res2._id) === JSON.stringify(user_id))  attendeeWithFinalUpdates = res2;

              //only return the resolve value when the forEach has gone through everything
              if (index === event.attendees.length - 1) resolve(attendeeWithFinalUpdates);
            });
          });
        } else {
          //update hostedEvent if this is the host
          this.socket.emit('readUser', attendee._id, (errA, resA) => {
            if (errA) reject(errA);

            this.socket.emit('updateHostedEventOnUser', {user: resA, event: event}, (errB, resB) => {
              if(errB) reject('err in joiningEvents 79, updateHostedEventOnUser call: attendee:', attendee, errB,);

              //only return the resolve value when the forEach has gone through everything
              if (index === event.attendees.length - 1) resolve(attendeeWithFinalUpdates);
            });
          });
        };
      });
    });
  };

  joinEvent = async (user, event, closeModal) => {

    const addAttendeeToEventResult = await this.addAttendeeToEvent(user, event);
    if (addAttendeeToEventResult === null) return;

    const addAttendingEventToUserResult = await this.addAttendingEventToUser(user, event);
    if (addAttendingEventToUserResult === null) return;

    const attendeeWithFinalUpdates = await this.updateAssociatedUsers(addAttendeeToEventResult, user._id);

    Promise.all([
      //reset user in session storage
      this.socket.emit('setCurrentUser', attendeeWithFinalUpdates, () => {}),
      //reset user in redux
      this.setUser(attendeeWithFinalUpdates),
      //reset events from db to redux
      getAllEventsFromDB(this.socket, this.setEvents)
    ]).then(() => {
      closeModal();
    });
  };

  leaveEvent = async (user, event, closeModal) => {

    const deleteAttendeeFromEventResult = await this.deleteAttendeeFromEvent(user, event);
    if (deleteAttendeeFromEventResult === null) return;

    const deleteEventFromUserResult = await this.deleteAttendingEventFromUser(user, event);
    if (deleteEventFromUserResult === null) return;

    this.updateAssociatedUsers(deleteAttendeeFromEventResult, user._id);

    Promise.all([
      //reset user in session storage
      this.socket.emit('setCurrentUser', deleteEventFromUserResult, () => {}),
      //reset user in redux
      this.setUser(deleteEventFromUserResult), //shouldn't this be empty?
      //reset events from db to redux
      getAllEventsFromDB(this.socket, this.setEvents)
    ]).then(() => {
      closeModal();
    });
  };

};

export {JoiningEvents as default};
