import { createStore, combineReducers } from 'redux';

import eventsReducer from './events';
import myEventReducer from './myEvent';
import eventsFormReducer from './eventsForm';
import eventsFormErrorsReducer from './eventsFormErrors';

import indexReducer from './index';

import currentLocationReducer from './currentLocation';

const storeCreator = () => createStore(
  combineReducers({
    eventsReducer,
    myEventReducer,
    eventsFormReducer,
    eventsFormErrorsReducer,

    indexReducer,

    currentLocationReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );



export {
  storeCreator as default,
};
