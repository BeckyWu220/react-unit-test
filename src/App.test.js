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
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />); //Use Enzyme's shallow() function to render a component. Shallow means render the component without any of its children components.
  if (state) {
    wrapper.setState(state); //Use given state to set state for ShallowWrapper
  }
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

test('renders with error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter'); //Get state value with given key.
  expect(initialCounterState).toBe(0);
});

test('clicking button increments counter display', () => {
  //Setting initial state, find the button and click on the button using Enzyme simulate, and expect the state change.
  const counter = 7;
  const wrapper = setup(null, { counter });

  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');

  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1);
});

test('clicking button decrements counter display', () => {
  const counter = 7;
  const wrapper = setup(null, { counter });

  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');

  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter - 1);
});

test('renders error hint of counter cannot go below 0', () => {
  const counter = 0;
  const wrapper = setup(null, { counter });
  const errorHint = findByTestAttr(wrapper, 'error-hint');
  expect(errorHint.length).toBe(1);
});

test('counter display cannot go below 0 through clicking decrement button', () => {
  const counter = 0;
  const wrapper = setup(null, { counter });

  const button = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click');

  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter);
});

