const makeAgeRangeUserFriendly = (ageCode) => {

  ageCode += '';

  switch(ageCode) {
    case '1': return 'under 18';
    case '2': return '18-30';
    case '3': return '30-45';
    case '4': return '45-60';
    case '5': return '60+';
    default: return 'no age selected.';
  };
};

export default makeAgeRangeUserFriendly;
