import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from '../test/testUtils';
import Input, { UnconnectedInput } from './Input';

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
    // console.log(wrapper.debug());

    return wrapper;
}

setup();

describe('render', () => {
    describe('word has not been guessed', () => {
        let wrapper;
        beforeEach(() => {
            const initialState = { success: false };
            wrapper = setup(initialState);
        })
        test('renders component without error', () => {
            const component = findByTestAttr(wrapper, "component-input");
            expect(component.length).toBe(1);
        });
        test('renders input box', () => {
            const inputBox = findByTestAttr(wrapper, "input-box");
            expect(inputBox.length).toBe(1);
        });
        test('renders submit button', () => {
            const submitButton = findByTestAttr(wrapper, "submit-button");
            expect(submitButton.length).toBe(1);
        });
    });

    describe('word has been guessed', () => {
        let wrapper;
        beforeEach(() => {
            const initialState = { success: true };
            wrapper = setup(initialState);
        })
        test('renders component without error', () => {
            const component = findByTestAttr(wrapper, "component-input");
            expect(component.length).toBe(1);
        });
        test('does not renders input box', () => {
            const inputBox = findByTestAttr(wrapper, "input-box");
            expect(inputBox.length).toBe(0);
        });
        test('does not renders submit button', () => {
            const submitButton = findByTestAttr(wrapper, "submit-button");
            expect(submitButton.length).toBe(0);
        });
    });
});

describe('redux props', () => {
    test('has access to `success` state as prop', () => {
        const success = true;
        const wrapper = setup({ success });
        const successProp = wrapper.instance().props.success; 
        // `wrapper.instance()` returns the react component instance that was passed into the `shallow()`
        // In this case, since we were using `shallow(<Input store={store}/>)`, `wrapper.instance()` returns Input component instance.
        expect(successProp).toBe(success);
    })
    test('`guessWord` action creator is a function prop', () => {
        const wrapper = setup();
        const guessWordProp = wrapper.instance().props.guessWord;
        expect(guessWordProp).toBeInstanceOf(Function);

    })
});

describe('`guessWord` call on Submit button click', () => {
    let guessWordMock;
    let wrapper;
    const guessedWord = "train";
    beforeEach(() => {
        // Create a mock function `guessWordMock`
        // Create unconnected Input commponent wrapper to pass the mock function to its `guessWord` props.
        guessWordMock = jest.fn();
        wrapper = shallow(<UnconnectedInput guessWord={guessWordMock} />);
    })
    test('runs on submit click', () => {
        // Simulate a button click on the submit button, and check if the mock function is called. 
        const submitButton = findByTestAttr(wrapper, "submit-button");
        submitButton.simulate('click', { preventDefault() {} });
        const getGuessWordCallCount = guessWordMock.mock.calls.length;
        expect(getGuessWordCallCount).toBe(1);
    });

    test('runs with the input box contents as argument', () => {
        // use `setState()` to simulate the input box contents.
        wrapper.setState({ currentGuess: guessedWord });
        const submitButton = findByTestAttr(wrapper, "submit-button");
        submitButton.simulate('click', { preventDefault() {} });

        console.log(guessWordMock.mock.calls[0][0])
        const guessWordArg = guessWordMock.mock.calls[0][0]; // Get the first argument in the first time calling the mock function.
        expect(guessWordArg).toBe(guessedWord);
    });

    test('input box clears on submit', () => {
        wrapper.setState({ currentGuess: guessedWord });
        const submitButton = findByTestAttr(wrapper, "submit-button");
        submitButton.simulate('click', { preventDefault() {} });
        
        expect(wrapper.state('currentGuess')).toBe('');
    });
});