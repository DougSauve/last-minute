const {handleKeyboardEvents} = require('./handleKeyboardEvents');

let booTripped;
let hiTripped;

beforeEach(() => {
  booTripped = false;
  hiTripped = false;
});

const sayBoo = () => {
  console.log('boo');
  booTripped = true;
};
const sayHi = () => {
  console.log('hi');
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

    handleKeyboardEvents(['enter', sayBoo], ['escape', sayHi], {keyCode: 13});

    expect(booTripped).toBeFalsy();
    expect(hiTripped).toBeTruthy();
  });
});
