const sanitize = (input) => {
  const redFlagSymbols = ['<', '>', '{', '}', '[', ']', '\\', '==', '===', '&#', '();'];
  redFlagSymbols.forEach((symbol) => {
    while (input.indexOf(symbol) !== -1) {
       input = input.replace(symbol, '');
       console.log(input.indexOf(symbol));
     }
  });
  return input;
}

module.exports = {
  sanitize
};
