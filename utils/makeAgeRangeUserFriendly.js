const makeAgeRangeUserFriendly = (ageCode) => {

  ageCode += '';

  switch(ageCode) {
    case '1': return '18-25';
    case '2': return '25-35';
    case '3': return '35-45';
    case '4': return '45-60';
    case '5': return '60+';
    default: return 'no age selected.';
  };
};

export default makeAgeRangeUserFriendly;
