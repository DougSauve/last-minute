const mongoose = require('mongoose');
const { User } = require('../../models/User');
const { Event } = require('../../models/Event');

const addEventToUser = async (user, event) => {

  const res = await User.findOneAndUpdate(
    { _id: user._id },
    {
      $set: {
        attendingEvents: user.attendingEvents.concat({
          _id: event._id,
          createdBy: event.createdBy,
          location: event.location,
          address: event.address,
          title: event.title,
          place: event.place,
          expiresAt: event.expiresAt,
          expiresAtHour: event.expiresAtHour,
          expiresAtMinute: event.expiresAtMinute,
          expiresAtAM: event.expiresAtAM,
          attendees: event.attendees,
          minimumPeople: event.minimumPeople,
          maximumPeople: event.maximumPeople,
          notes: event.notes,
        })
      }
    },
    { new: true }
  );

  let err = null;

  if (!res.name) err = "Update could not be completed. Please fire the system administrator.";

  return {err, res};
};

const addHostedEventToUser = async (user, event) => {

  const res = await User.findOneAndUpdate(
    { _id: user._id },
    {
      $set: {
        hostedEvents: user.hostedEvents.concat({
          _id: event._id,
          createdBy: event.createdBy,
          location: event.location,
          address: event.address,
          title: event.title,
          place: event.place,
          expiresAt: event.expiresAt,
          expiresAtHour: event.expiresAtHour,
          expiresAtMinute: event.expiresAtMinute,
          expiresAtAM: event.expiresAtAM,
          attendees: event.attendees,
          minimumPeople: event.minimumPeople,
          maximumPeople: event.maximumPeople,
          notes: event.notes,
        })
      }
    },
    { new: true }
  );

  let err = null;

  if (!res.name) err = "Update could not be completed. Please fire the system administrator.";

  return {err, res};
};

const addUserToEvent = async (user, event) => {

  const res = await Event.findOneAndUpdate(
    { _id: event._id },
    {
      $set: {
        attendees: event.attendees.concat({
          _id: user._id,
          name: user.name,
          ageRange: user.ageRange,
          gender: user.gender,
        })
      }
    },
    { new: true }
  );

  let err = null;

  if (!res.title) err = "Update could not be completed. Please fire the system administrator.";

  console.log ('result', res);
  return {err, res};
};

const removeEventFromUser = async (user, event) => {

  const res = await User.findOneAndUpdate(
    { _id: user._id },
    {
      $set: {
        attendingEvents: user.attendingEvents.filter((attendingEvent) => attendingEvent._id !== event._id)
      }
    },
    { new: true }
  );

  let err = null;

  if (!res.name) err = "Event could not be removed. Please fire the system administrator.";

  console.log ('result', res);
  return {err, res};
};

const removeHostedEventFromUser = async (user, event) => {

  const res = await User.findOneAndUpdate(
    { _id: user._id },
    {
      $set: {
        hostedEvents: user.attendingEvents.filter((attendingEvent) => attendingEvent._id !== event._id)
      }
    },
    { new: true }
  );

  let err = null;

  if (!res.name) err = "Event could not be removed. Please fire the system administrator.";

  console.log ('result', res);
  return {err, res};
};

const removeUserFromEvent = async (user, event) => {

  console.log('user', user);
    console.log('event', event);

  const res = await Event.findOneAndUpdate(
    { _id: event._id },
    {
      $set: {
        attendees: event.attendees.filter((attendee) => attendee._id !== user._id)
      }
    },
    { new: true }
  );

  let err = null;

  if (!res.title) err = "Event could not be removed. Please fire the system administrator.";

  console.log ('result', res);
  return {err, res};
};

module.exports = {
  addEventToUser,
  addHostedEventToUser,
  addUserToEvent,
  removeEventFromUser,
  removeHostedEventFromUser,
  removeUserFromEvent,
};
