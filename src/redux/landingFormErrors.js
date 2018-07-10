//sign up modal form errors
const setNameError = (error) => ({
  type: 'SET_NAME_ERROR',
  error
});
const setEmailError = (error) => ({
  type: 'SET_EMAIL_ERROR',
  error
});
const setPasswordError = (error) => ({
  type: 'SET_PASSWORD_ERROR',
  error
});
const setPasswordCheckError = (error) => ({
  type: 'SET_PASSWORD_CHECK_ERROR',
  error
});
const setHomeLocationError = (error) => ({
  type: 'SET_HOME_LOCATION_ERROR',
  error
});
const setMapError = (error) => ({
    type: 'SET_MAP_ERROR',
    error
});
const clearErrors = () => ({
  type: 'CLEAR_ERRORS',
});
const clearMapErrors = () => ({ //clearErrors clashes with another action in a file, this is the simplest solution
  type: 'CLEAR_ERRORS',
});

const landingFormErrorsDefaultState = {
  nameError: '',
  emailError: '',
  passwordError: '',
  passwordCheckError: '',
  homeLocationError: '',
  mapError: '',
};

const landingFormErrorsReducer = (state = landingFormErrorsDefaultState, action) => {
  switch (action.type) {

    case 'SET_NAME_ERROR':
      return { ...state, nameError: action.error };
    case 'SET_EMAIL_ERROR':
      return { ...state, emailError: action.error };
    case 'SET_PASSWORD_ERROR':
      return { ...state, passwordError: action.error };
    case 'SET_PASSWORD_CHECK_ERROR':
      return { ...state, passwordCheckError: action.error };
    case 'SET_HOME_LOCATION_ERROR':
      return { ...state, homeLocationError: action.error };
    case 'SET_MAP_ERROR':
      return { ...state, mapError: action.error };
    case 'CLEAR_ERRORS':
      return { ...landingFormErrorsDefaultState };
    default:
      return state;

  }
};

export {
  landingFormErrorsReducer as default,
  setNameError,
  setEmailError,
  setPasswordError,
  setPasswordCheckError,
  setHomeLocationError,
  setMapError,
  clearErrors,
  clearMapErrors,
};
