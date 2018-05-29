const sanitize = (input) => {
  const redFlagSymbols = ['<', '>', '{', '}', '[', ']', '\\', '==', '===', '&#', '();'];
  redFlagSymbols.forEach((symbol) => {
    while (input.indexOf(symbol) !== -1) {
       input = input.replace(symbol, '');
     }
  });
  return input;
}

const blacklist = function(input) {
  const redFlagSymbols = [...arguments];
  redFlagSymbols.shift();

  let redFlags = [];

  redFlagSymbols.forEach((symbol) => {
    if (input.indexOf(symbol) !== -1) {
      redFlags.push(symbol);
    }
  });

  if (redFlags.length > 0) return redFlags;
  return false;
}

module.exports = {
  sanitize,
  blacklist,
};
