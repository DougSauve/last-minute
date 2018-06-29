import Geocode from 'react-geocode';

Geocode.setApiKey('AIzaSyDA9D9WAez1LHMwXWEiOsPF_G5Iwgk6RQs');

Geocode.enableDebug();

const getAddress = async (lat, lng) => {
  let address;
  let err;

  await Geocode.fromLatLng(lat, lng).then(
    (response) => {
    address = response.results[0].formatted_address;
    },
    (error) => { err = error }
  );

  return {
    err,
    address
  };
};

const getCoords = async (address) => {
  let lat;
  let lng;
  let err;

  console.log('provided address:', address);

  await Geocode.fromAddress(address).then(
    (response) => {
      lat  = response.results[0].geometry.location.lat;
      lng  = response.results[0].geometry.location.lng;
    },
    (error) => { err = error }
  );

  return {
    err,
    lat,
    lng
  };
};

export {
  getAddress,
  getCoords
}
