const setCurrentCoordinates = ({lat, lng}) => ({
  type: 'SET_CURRENT_COORDINATES',
  lat,
  lng,
});

const setCurrentAddress = (address) => ({
  type: 'SET_CURRENT_ADDRESS',
  address
});

const currentLocationReducerDefaultState = {
  lat: 0,
  lng: 0,
  address: 'none'
};

const currentLocationReducer = (state = currentLocationReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_COORDINATES':
    return {
      ...state,
      lat: action.lat,
      lng: action.lng,
    };
    case 'SET_CURRENT_ADDRESS':
    return {
      ...state,
      address: action.address,
    };
    default:
    return state;
  };
};

export {
  currentLocationReducer as default,
  setCurrentCoordinates,
  setCurrentAddress,
};
