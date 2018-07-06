const setDistanceError = (error) => ({
  type: 'SET_DISTANCE_ERROR',
  error,
});

const clearDistanceError = () => ({
  type: 'CLEAR_DISTANCE_ERROR'
});

const searchReducerDefaultState = {
  distanceError: '',
};

const searchReducer = (state = searchReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_DISTANCE_ERROR':
    return {
      ...state,
      distanceError: action.error,
    };
    case 'CLEAR_DISTANCE_ERROR':
    return {
      ...state,
    };
    default:
    return state;
  };
};

export {
  searchReducer as default,
  setDistanceError,
  clearDistanceError,
};
