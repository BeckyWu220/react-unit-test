import { correctGuess, actionTypes } from './';

describe('correctGuess', () => {
    test('returns an action with type `CORRECT_GUESS`', () => {
        const action = correctGuess();
        expect(action).toEqual({
            type: actionTypes.CORRECT_GUESS
        }); // We are using `toEqual` instead of `toBe` here.
        // Because `toBe` is `===` that can only be used to immutable objects, like numbers or strings.
        // `toEqual` will compare the content.
    });

})