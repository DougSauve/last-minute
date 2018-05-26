import { setCurrentCoordinates, setCurrentAddress } from '../../../../../redux/currentLocation';
import { store } from '../../../../../main';
import { getAddress } from './Geocode';

const setPositionToStore = async () => {

  return new Promise((resolve, reject) => {

    navigator.geolocation.getCurrentPosition( async (position) => {
      
      const lat = await position.coords.latitude;
      const lng = await position.coords.longitude;
      console.log(lat, lng);

      //set coordinates to redux store
      store.dispatch(setCurrentCoordinates({lat, lng}));

      //get address and set to redux store
      const address = await getAddress(lat, lng);
      store.dispatch(setCurrentAddress(address));

      resolve({
        lat,
        lng,
        address
      });

    }, () => {
      resolve({ err: 'unable to fetch location.' });
    });

  });
};

const updateStorePosition = async (lat, lng) => {
  //set coordinates to redux store
  store.dispatch(setCurrentCoordinates({lat, lng}));

  //get address and set to redux store
  const address = await getAddress(lat, lng);
  store.dispatch(setCurrentAddress(address));
};

export {
  setPositionToStore,
  updateStorePosition,
};
