const {handleKeyboardEvents} = require('./handleKeyboardEvents');

let booTripped;
let hiTripped;

beforeEach(() => {
  booTripped = false;
  hiTripped = false;
});

const sayBoo = () => {
  booTripped = true;
};
const sayHi = () => {
  hiTripped = true;
};

describe('handleKeyboardEvents', () => {
  test('should call sayBoo according to input', () => {
    expect.assertions(2);

    handleKeyboardEvents(['enter', sayBoo], ['escape', sayHi], {keyCode: 13});

    expect(booTripped).toBeTruthy();
    expect(hiTripped).toBeFalsy();
  });

  test('should call sayHi according to input', () => {
    expect.assertions(2);

    handleKeyboardEvents(['enter', sayBoo], ['escape', sayHi], {keyCode: 27});

    expect(booTripped).toBeFalsy();
    expect(hiTripped).toBeTruthy();
  });
});
