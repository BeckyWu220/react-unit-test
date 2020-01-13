/**
 * We want to test two cases.
 * 1. When there's no action nor state, return default value false.
 * 2. When CORRECT_GUESS action type, return true.
 */

 import { actionTypes } from '../actions'
 import successReducer from './successReducer'

 describe('successReducer', () => {
     test('returns default initial state of `false` when no action is passed', () => {
        const newState = successReducer(undefined, {});
        expect(newState).toBe(false);
     });

     test('returns state of true upon receiving an action of type `CORRECT_GUESS`', () => {
        const newState = successReducer(undefined, { type: actionTypes.CORRECT_GUESS });
        expect(newState).toBe(true);
     });
 })