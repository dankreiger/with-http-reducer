import {
  withHttpReducer,
  withHttpReducerInitialState
} from '../withHttpReducer';

import { httpBegin } from '../actionTypeFormatters';
import users, { usersInitialState } from '../utils/user.reducer';
import { IAnyAction } from '../interfaces';

describe('withHttpReducer', () => {
  let initialState: any;
  let newState: any;

  describe('HTTP_BEGIN', () => {
    beforeEach(() => {
      initialState = { ...withHttpReducerInitialState, ...usersInitialState };
      newState = {};
    });

    it('sets named reducer state loading to true', () => {
      const action: IAnyAction = httpBegin('users');
      newState = withHttpReducer(users, 'users')(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: true,
        httpError: null
      });
    });
  });
});
