//events
const setMode = ( mode ) => ({
  type: 'SET_MODE',
  mode
});

const setEvents = ({ events }) => ({
  type: 'SET_EVENTS',
  events
});

const addEvent = ({ event }) => ({
  type: 'ADD_EVENT',
  event
});

const setSubmitError = ({ submitError }) => ({
  type: 'SET_SUBMIT_ERROR',
  submitError,
  submitSuccess: '',
});

const setSubmitSuccess = ({ submitSuccess }) => ({
  type: 'SET_SUBMIT_SUCCESS',
  submitSuccess,
  submitError: '',
});

const eventsReducerDefaultState = {
  mode: undefined,
  events: [],
  submitError: '',
  submitSuccess: '',
};


const eventsReducer = (state = eventsReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_MODE':
    return { ...state, mode: action.mode };
    case 'SET_EVENTS':
    return { ...state, events: action.events };
    case 'ADD_EVENT':
    return { ...state, events: events.concat(action.event)};
    case 'SET_SUBMIT_ERROR':
    return {
      ...state,
      submitError: action.submitError,
      submitSuccess: action.submitSuccess,
    };
    case 'SET_SUBMIT_SUCCESS':
    return {
      ...state,
      submitError: action.submitError,
      submitSuccess: action.submitSuccess,
    };
    default:
    return state;
  }
};

export {
  eventsReducer as default,
  setEvents,
  setSubmitError,
  setSubmitSuccess,
  setMode,
}
