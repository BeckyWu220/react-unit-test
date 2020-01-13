import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from '../test/testUtils';
import Input from './Input';

const setup = (initialState={}) => {
    const store = storeFactory(initialState);
    // const wrapper = shallow(<Input store={store} />);
    // console.log(wrapper.debug()); // Print what does the wrapper look like.
    /**
     * Console log from the `console.log(wrapper.debug());`
     * console.log src/Input.test.js:10
      <ContextProvider value={{...}}>
        <Input store={{...}} dispatch={[Function: dispatch]} />
      </ContextProvider>
     * We get a HOC here instead of Input component directly. In order to get Input, we need to use `dive()` method from Enzyme.
     * So `const wrapper = shallow(<Input store={store} />).dive()`;
     * And then we will get the Input component.
     *  console.log src/Input.test.js:21
      <Input store={{...}} dispatch={[Function: dispatch]} />
     * We can dive one more step to get the actual content of Input component.
       So we chain another `dive()` to the `shallow()`, `shallow(<Input store={store} />).dive().dive();`
     */
    const wrapper = shallow(<Input store={store} />).dive().dive();
    console.log(wrapper.debug());

    return wrapper;
}

setup();

describe('render', () => {
    describe('word has not been guessed', () => {
        test('renders component without error', () => {

        });
        test('renders input box', () => {

        });
        test('renders submit button', () => {

        });
    });

    describe('word has been guessed', () => {
        test('renders component without error', () => {

        });
        test('does not renders input box', () => {

        });
        test('does not renders submit button', () => {

        });
    });
});

describe('update state', () => {

});