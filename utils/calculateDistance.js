const calculateDistance = (homeLat, homeLng, eventLat, eventLng, units) => {

  //convert to radians
  const R = 6371; //radius of earth in KM
  const latDifference = eventLat - homeLat;
  const lngDifference = eventLng - homeLng;

  const lngInRadians = convertToRadians(lngDifference);
  const latInRadians = convertToRadians(latDifference);

  const something  =
  Math.sin(latInRadians / 2) * Math.sin(latInRadians / 2) +
  Math.cos(convertToRadians(homeLat)) * Math.cos(convertToRadians(eventLat)) *
  Math.sin(lngInRadians / 2) * Math.sin(lngInRadians / 2);

  const somethingElse = 2 * Math.atan2(Math.sqrt(something), Math.sqrt(1 - something));

  const distanceInKM = R * somethingElse;

  if (units === 'km') {
    if (distanceInKM >= 100) return Math.round(distanceInKM);
    return Math.round(distanceInKM * 10) / 10;
  } else {
    //convert to miles
    const distanceInMiles = distanceInKM * .621371;

    //formatting
    if (distanceInMiles >= 100) return Math.round(distanceInMiles);
    return Math.round(distanceInMiles * 10) / 10;
  };
};

const convertToRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};


function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

module.exports = {
  calculateDistance,
  getDistanceFromLatLonInKm
};
