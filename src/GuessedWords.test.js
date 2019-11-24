import React from 'react';
import { shallow } from 'enzyme';

import GuessedWords from './GuessedWords';
import { findByTestAttr, checkProps } from '../test/testUtils';

const defaultProps = {
    guessedWords: [{
        guessedWord: 'train',
        letterMatchCount: 3
    }]
};

const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props };
    const wrapper = shallow(<GuessedWords {...setupProps} />)
    return wrapper;
}

test('does not throw warning with expected props', () => {
    checkProps(GuessedWords, defaultProps);
});

describe('if there are no words guessed', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({ guessedWords: [] });
    })
    test('render without error', () => {
        const component = findByTestAttr(wrapper, 'component-guessedWords');
        expect(component.length).toBe(1);
    });

    test('renders instruction to guess a word', () => {
        const instructionMsg = findByTestAttr(wrapper, 'instruction-message');
        expect(instructionMsg.length).toBe(1);
    });
});

describe('if there are words guessed', () => {
    let wrapper;
    const guessedWords = [
        { guessedWord: 'train', letterMatchCount: 3 },
        { guessedWord: 'agile', letterMatchCount: 1 },
        { guessedWord: 'party', letterMatchCount: 5 },
    ];
    beforeEach(() => {
        wrapper = setup({ guessedWords });
    })
    test('render without error', () => {
        const component = findByTestAttr(wrapper, 'component-guessedWords');
        expect(component.length).toBe(1);
    });

    test('renders table of words', () => {
        const table = findByTestAttr(wrapper, 'words-table');
        expect(table.length).toBe(1);
    });

    test('correct number of guessed words', () => {
        const rows = findByTestAttr(wrapper, 'words-table-row');
        expect(rows.length).toBe(guessedWords.length);
    })
});

