import React from 'react';
import { shallow } from 'enzyme';

import Congrats from './Congrats';
import { findByTestAttr, checkProps } from '../test/testUtils';

const defaulProps = { success: false };

const setup = (props = {}) => {
    const setupProps = { ...defaulProps, ...props };
    const wrapper = shallow(<Congrats {...setupProps} />);
    return wrapper;
}

test('render without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.length).toBe(1);
});

test('renders no text when `success` props is false', () => {
    const wrapper = setup({ success: false });
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.text()).toBe('');
});

test('renders non-empty congrats message when `success` prop is true.', () => {
    const wrapper = setup({ success: true });
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.text().length).not.toBe(0);
});

test('does not throw warning with expected props', () => {
    const expectedProps = { success: false };
    checkProps(Congrats, expectedProps);
});