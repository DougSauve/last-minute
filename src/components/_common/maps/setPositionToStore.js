import { setCurrentCoordinates, setCurrentAddress } from '../../../redux/currentLocation';
import { store } from '../../../main';
import { getAddress } from './Geocode';

const setPositionToStore = async () => {

  return new Promise((resolve, reject) => {

    navigator.geolocation.getCurrentPosition(
      //success
      async (position) => {

        const lat = await position.coords.latitude;
        const lng = await position.coords.longitude;
        console.log(lat, lng);

        //set coordinates to redux store
        store.dispatch(setCurrentCoordinates({lat, lng}));

        //get address and set to redux store
        const addressObject = await getAddress(lat, lng);
        const address = addressObject.address;
        store.dispatch(setCurrentAddress(address));

        resolve({
          lat,
          lng,
          address,
        });
      },
      //failure
      () => {
        resolve({
          lat: 0,
          lng: 0,
          address: '',
          err: 'Location not found.',
        })
      },
      //timeout
      {
        timeout: 2500,
        maximumAge: 30000,
      }
    );
  });
};

const updateStoreLocation = async (lat, lng) => {
  //set coordinates to redux store
  store.dispatch(setCurrentCoordinates({lat, lng}));

  //get address and set to redux store
  const addressObject = await getAddress(lat, lng);
  const address = addressObject.address;
  store.dispatch(setCurrentAddress(address));
};

export {
  setPositionToStore,
  updateStoreLocation,
};
