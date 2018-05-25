// my event
const setMyEvent = (myEvent = {}) => ({
  type: 'SET_MY_EVENT',
  myEvent,
});

const myEventReducerDefaultState = {
  myEvent: {}
};

const myEventReducer = (state = myEventReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_MY_EVENT':
    return {
        ...state,
        myEvent: action.myEvent
    };
    default:
    return state;
  };
};

export {
  myEventReducer as default,
  setMyEvent,
}
