//events modal form errors
const setExpiresAtError = (error) => ({
  type: 'SET_EXPIRES_AT_ERROR',
  error
});
const setTitleError = (error) => ({
  type: 'SET_TITLE_ERROR',
  error
});
const setPlaceError = (error) => ({
  type: 'SET_PLACE_ERROR',
  error
});
const setMinimumPeopleError = (error) => ({
  type: 'SET_MINIMUM_PEOPLE_ERROR',
  error
});
const setMaximumPeopleError = (error) => ({
  type: 'SET_MAXIMUM_PEOPLE_ERROR',
  error
});
const clearErrors = () => ({
  type: 'CLEAR_ERRORS',
});

const eventsFormErrorsDefaultState = {
  expiresAtError: '',
  titleError: '',
  placeError: '',
  minimumPeopleError: '',
  maximumPeopleError: '',
};

const eventsFormErrorsReducer = (state = eventsFormErrorsDefaultState, action) => {
  switch (action.type) {

    case 'SET_EXPIRES_AT_ERROR':
      return { ...state, expiresAtError: action.error };
    case 'SET_TITLE_ERROR':
      return { ...state, titleError: action.error };
    case 'SET_PLACE_ERROR':
      return { ...state, placeError: action.error };
    case 'SET_MINIMUM_PEOPLE_ERROR':
      return { ...state, minimumPeopleError: action.error };
    case 'SET_MAXIMUM_PEOPLE_ERROR':
      return { ...state, maximumPeopleError: action.error };
    case 'CLEAR_ERRORS':
      return { ...eventsFormErrorsDefaultState };
    default:
      return state;

  }
};

export {
  eventsFormErrorsReducer as default,
  setExpiresAtError,
  setTitleError,
  setPlaceError,
  setMinimumPeopleError,
  setMaximumPeopleError,
  clearErrors,
};
