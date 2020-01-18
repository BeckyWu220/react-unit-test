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

import App from './App';
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


