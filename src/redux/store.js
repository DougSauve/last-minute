import { createStore, combineReducers } from 'redux';

import eventsReducer from './events';
import userReducer from './user';
import myEventReducer from './myEvent';
import eventsFormReducer from './eventsForm';
import eventsFormErrorsReducer from './eventsFormErrors';
import landingFormErrorsReducer from './landingFormErrors';
import searchReducer from './search';

import indexReducer from './index';

import currentLocationReducer from './currentLocation';

//socket
const setSocket = (socket) => ({
  type: 'SET_SOCKET',
  socket,
});

const socketReducer = (state = {socket: null}, {type, socket}) => {
  if (type === 'SET_SOCKET') return {socket};
  else return state;
};

//store
const storeCreator = () => createStore(
  combineReducers({
    socketReducer,
    userReducer,
    eventsReducer,
    myEventReducer,
    eventsFormReducer,
    eventsFormErrorsReducer,
    landingFormErrorsReducer,
    indexReducer,
    currentLocationReducer,
    searchReducer,
  }),
  (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') &&
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export {
  storeCreator as default,
  setSocket
};
