const capitalizeFirstLetter = (str) => {
  const firstLetter = str.substr(0, 1);
  const restOfString = str.substr(1, str.length);
  return firstLetter.toUpperCase().concat(restOfString);
};

export { capitalizeFirstLetter as default };
