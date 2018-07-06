const {   calculateDistance, getDistanceFromLatLonInKm } = require('./calculateDistance');

//seed data
const lat1 = 40;
const lng1 = 80;

const lat2 = 41;
const lng2 = 81;

test('should do something cool', () => {
  const mine = calculateDistance(lat1, lng1, lat2, lng2);
  const his = getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2);

  console.log('mine:');
  console.log(mine);

  console.log('his:');
  console.log(his);
});
