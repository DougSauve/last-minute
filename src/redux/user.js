//user
const setUser = (user) => ({
  type: 'SET_USER',
  user
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

const userReducerDefaultState = {
  mode: undefined,
  user: '',
  submitError: '',
  submitSuccess: '',
};


const userReducer = (state = userReducerDefaultState, action) => {
  switch (action.type) {

    case 'SET_USER':
    return { ...state, user: action.user };
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
  userReducer as default,
  setUser,
  setSubmitError,
  setSubmitSuccess,
};
