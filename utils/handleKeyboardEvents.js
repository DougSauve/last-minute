const keyBindings = {
  enter: 13,
  escape: 27,
};

const handleKeyboardEvents = function () {
  const e = window.event || arguments[arguments.length - 1]; //for testing

  const pairs = [...arguments];
  pairs.pop();

//for each pair, check if it matches any of the keys; if it does, execute the callback associated with it.
  pairs.forEach((pair) => {
    if (e.keyCode === keyBindings[pair[0]]) {
      const callback = pair[1];
      callback();
    };
  });
};

module.exports = {
  handleKeyboardEvents,
};
