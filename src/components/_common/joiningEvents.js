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
        if (err) return this.setUserSubmitError(err);
        resolve(res);
      });
    });
  };

  deleteAttendeeFromEvent = (attendee, event) => {
    return new Promise((resolve, reject) => {

      console.log('in joiningEvents', this.socket);
      console.log('attendee', attendee);
      console.log('event', event);

      try {
        this.socket.emit('deleteAttendeeFromEvent', {attendee, event}, (err, res) => {
          if (err) return this.setUserSubmitError(err);
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
        if (err) return this.setUserSubmitError(err);
        resolve(res);
      });
    })
  };

  deleteAttendingEventFromUser = (user, event) => {
    return new Promise((resolve, reject) => {
      this.socket.emit('deleteAttendingEventFromUser', {user, event}, (err, res) => {

        if (err) return this.setUserSubmitError(err);
        resolve(res);
      });
    });
  };

  updateAssociatedUsers_join(addAttendeeToEventResult, user_id) {
    return new Promise((resolve, reject) => {

      let attendeeWithFinalUpdates = 'none';

      addAttendeeToEventResult.attendees.forEach((attendee, index) => {

        //get actual user from attendee thing
        this.socket.emit('readUser', attendee._id, (err, res) => {
          if (err) console.log(err);

          this.socket.emit('updateAttendingEventOnUser', {user: res, event: addAttendeeToEventResult}, (err2, res2) => {
            if (err2) console.log(err2);

            //update hostedEvent if this is the host
            if (res2.hostedEvents[0] &&
              JSON.stringify(res2.hostedEvents[0]._id) === JSON.stringify(addAttendeeToEventResult._id) ) {

                this.socket.emit('updateHostedEventOnUser', {user: res2, event: addAttendeeToEventResult}, (err3, res3) => {
                  if(err3) console.log(err3);
                  console.log('updated host thing', res3);
                });
              };

              //if this the current user, set the eventual resolve value to that user.
              if (JSON.stringify(res2._id) === JSON.stringify(user_id)) attendeeWithFinalUpdates = res2;

              //only return the resolve value when the forEach has gone through everything
              if (index === addAttendeeToEventResult.attendees.length - 1) resolve(attendeeWithFinalUpdates);
            });
          });
        });
      });

    };

  updateAssociatedUsers_leave(deleteAttendeeFromEventResult) {
    deleteAttendeeFromEventResult.attendees.forEach((attendee) => {

      //get actual user from attendee thing
      this.socket.emit('readUser', attendee._id, (err, res) => {
        if (err) console.log(err);

        this.socket.emit('updateAttendingEventOnUser', {user: res, event: deleteAttendeeFromEventResult}, (err2, res2) => {
          if (err2) console.log(err2);

          //update hostedEvent if this is the host
          if (res2.hostedEvents[0] &&
            JSON.stringify(res2.hostedEvents[0]._id) === JSON.stringify(deleteAttendeeFromEventResult._id) ) {
              this.socket.emit('updateHostedEventOnUser', {user: res2, event: deleteAttendeeFromEventResult}, (err3, res3) => {
                if(err3) console.log(err3);
                console.log('updated host thing', res3);
              });
            };
        });
      });
    });
  };

  joinEvent = async (user, event, closeModal) => {

    const addAttendeeToEventResult = await this.addAttendeeToEvent(user, event);
    if (addAttendeeToEventResult === null) return;

    const addAttendingEventToUserResult = await this.addAttendingEventToUser(user, event);
    if (addAttendingEventToUserResult === null) return;

    const attendeeWithFinalUpdates = await this.updateAssociatedUsers_join(addAttendeeToEventResult, user._id);

    Promise.all([
      //reset user in session storage
      this.socket.emit('setCurrentUser', attendeeWithFinalUpdates, () => console.log('session user updated.')),
      //reset user in redux
      this.setUser(attendeeWithFinalUpdates),
      //reset events from db to redux
      getAllEventsFromDB(this.socket, this.setEvents)
    ]).then(() => {
      console.log('You have joined this event.');
      closeModal();
    });
  };

  leaveEvent = async (user, event, closeModal) => {

    const deleteAttendeeFromEventResult = await this.deleteAttendeeFromEvent(user, event);
    if (deleteAttendeeFromEventResult === null) return;

    const deleteEventFromUserResult = await this.deleteAttendingEventFromUser(user, event);
    if (deleteEventFromUserResult === null) return;

    this.updateAssociatedUsers_leave(deleteAttendeeFromEventResult);

    Promise.all([
      //reset user in session storage
      this.socket.emit('setCurrentUser', deleteEventFromUserResult, () => console.log('session user updated.')),
      //reset user in redux
      this.setUser(deleteEventFromUserResult), //shouldn't this be empty?
      //reset events from db to redux
      getAllEventsFromDB(this.socket, this.setEvents)
    ]).then(() => {
      console.log('You have left this event.');
      closeModal();
    });
  };

};

export {JoiningEvents as default};
