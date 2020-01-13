export const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test='${val}']`);
}

import checkPropTypes from 'check-prop-types';
export const checkProps = (component, conformingProps) => {
    const propError = checkPropTypes(component.propTypes, conformingProps, 'prop', component.name);
    expect(propError).toBeUndefined();
}

import { createStore } from 'redux';
import rootReducer from '../src/reducers';
export const storeFactory = (initialState) => {
    return createStore(rootReducer, initialState);
    //Here we create a actual store instead of mocking one.
    //redux-mock-store can be used to mock store. However, it couldn't test changes to state.
}