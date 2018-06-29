const setCurrentPlace = (place) => ({
  type: 'SET_CURRENT_PLACE',
  place,
});

const setCurrentCoordinates = ({lat, lng}) => ({
  type: 'SET_CURRENT_COORDINATES',
  lat,
  lng,
});

const setCurrentAddress = (address) => ({
  type: 'SET_CURRENT_ADDRESS',
  address,
});

const currentLocationReducerDefaultState = {
  place: '',
  lat: 0,
  lng: 0,
  address: 'address...'
};

const currentLocationReducer = (state = currentLocationReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_PLACE':
    return {
      ...state,
      place: action.place,
    };
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
  setCurrentPlace,
  setCurrentCoordinates,
  setCurrentAddress,
};
