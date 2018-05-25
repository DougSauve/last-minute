const setCurrentSlide = (currentSlide) => ({
  type: 'SET_CURRENT_SLIDE',
  currentSlide,
});

const eventsFormReducerDefaultState = {
  currentSlide: "1",
};

const eventsFormReducer = (state = eventsFormReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_SLIDE':
    return {...state, currentSlide: action.currentSlide};
    default:
    return state;
  };
};

export {
  eventsFormReducer as default,
  setCurrentSlide,
};
