const setEvents = (events = []) => ({
  type: 'SET_EVENTS',
  events
});

const indexReducerDefaultState = {
  events: [],
};

const indexReducer = (state = indexReducerDefaultState, action) => {
  switch(action.type) {
    case 'SET_EVENTS':
    return {...state, events: action.events};
    default:
    return state;
  };
};

export {
  indexReducer as default,
  setEvents,
};
