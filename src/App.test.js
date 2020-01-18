// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import App, { UnconnectedApp } from './App';
import { storeFactory } from '../test/testUtils';
import { getSecretWord } from './actions';

//Config Enzyme using proper EnzymeAdapter.
Enzyme.configure({ adapter: new EnzymeAdapter() });

// test('renders without crashing', () => {
//   //Shallow rendering App component.
//   const wrapper = shallow(<App />);

//   //debug() convert the rendered component into string. You will see the component be printed out in the terminal when the testing is executing.
//   //https://airbnb.io/enzyme/docs/api/ShallowWrapper/debug.html
//   //console.log(wrapper.debug());

//   //use Jest API expect() to check whether wrapper exist (not empty string, not null, not undefined) or not.
//   //https://jestjs.io/docs/en/expect#tobetruthy
//   //expect(wrapper).toBeTruthy();
  
// });

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {any} state - Initial state for setup.
 * @returns {ShallowWrapper}
 */
const setup = (state = {}) => {
  const store = storeFactory(state);
  const wrapper = shallow(<App store={store} />).dive().dive(); //Use Enzyme's shallow() function to render a component. Shallow means render the component without any of its children components.
  // console.log(wrapper.instance());
  return wrapper;
}

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @function findByTestAttr
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`); //Find by 'data-test' props that is added for testing purpose in the component.
}

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

describe('redux props', () => {
  test('has access to `success` state as props', () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success);
  });
  test('has access to `secretWord` state as props', () => {
    const secretWord = 'party';
    const wrapper = setup({ secretWord });
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toBe(secretWord);
  });
  test('has access to `guessedWords` as props', () => {
    const guessedWords = [{
      guessedWord: 'train',
      letterMatchCount: 3
    }];
    const wrapper = setup({ guessedWords });
    const guessedWordsProp = wrapper.instance().props.guessedWords;
    expect(guessedWordsProp).toEqual(guessedWords); //Use `toEqual` to compare two arrays.
  });
  test('has `getSecretWord` action creator is a function on the props', () => {
    const wrapper = setup();
    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWord).toBeInstanceOf(Function);
  });
})

test('`getSecretWord` runs on App mount.', () => {
  // Create `getSecretWord` mock function `getSecretWordMock`
  // The mock function is an empty functiont that does nothing but being a placeholder to check later if the mock function runs.
  const getSecretWordMock = jest.fn();

  // Replace `getSecretWord` with mock in the props of unconnected App component.
  const wrapper = shallow(
    <UnconnectedApp
      getSecretWord={getSecretWordMock}
      success={false}
      guessedWords={[]}
    />
  )
  // `success` and `guessedWords` are not related to this test, however, since they are marked as `isRequired` through `PropTypes`, we add some values to them to make sure the prop types test is passing.

  // Unconnect App component is used here instead of connected App component because we just need to pass the mock function into `getSecretWord` prop to check if the mock function is called.
  // If we use the connected App component, the `getSecretWord` needs to be gotten from redux store, which involves unnecessary redux store test.
  // At the top of the file, we import `UnconnectApp` so we can assign the mock function to its `getSecretWord` props.
  
  // Run `componentDidMount()` to check if the mock function runs once.
  wrapper.instance().componentDidMount();

  // Get the times the mock function runs, and expect it run once.
  const getSecretWordCallCount = getSecretWordMock.mock.calls.length;
  expect(getSecretWordCallCount).toBe(1);

})


