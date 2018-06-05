//user
const setUser = (user) => ({
  type: 'SET_USER',
  user
});

const setUserSubmitError = ( submitError ) => ({
  type: 'SET_USER_SUBMIT_ERROR',
  submitError,
  submitSuccess: '',
});

const setUserSubmitSuccess = ( submitSuccess ) => ({
  type: 'SET_USER_SUBMIT_SUCCESS',
  submitSuccess,
  submitError: '',
});

const userReducerDefaultState = {
  mode: undefined,
  user: '',
  userSubmitError: '',
  userSubmitSuccess: '',
};


const userReducer = (state = userReducerDefaultState, action) => {
  switch (action.type) {

    case 'SET_USER':
    return { ...state, user: action.user };
    case 'SET_USER_SUBMIT_ERROR':
    return {
      ...state,
      submitError: action.submitError,
      submitSuccess: action.submitSuccess,
    };
    case 'SET_USER_SUBMIT_SUCCESS':
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
  setUserSubmitError,
  setUserSubmitSuccess,
};
