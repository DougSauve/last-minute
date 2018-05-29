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
const clearErrors = () => ({
  type: 'CLEAR_ERRORS',
});

const landingFormErrorsDefaultState = {
  nameError: '',
  emailError: '',
  passwordError: '',
  passwordCheckError: '',
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
  clearErrors,
};
