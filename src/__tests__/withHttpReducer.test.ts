import {
  withHttpReducer,
  withHttpReducerInitialState
} from '../withHttpReducer';

import { HTTP_BEGIN, httpBegin } from '../actionTypeFormatters';
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
    it('sets unnamed reducer state loading to true', () => {
      const action: IAnyAction = httpBegin();
      newState = withHttpReducer(users)(initialState, action);

      expect(newState).toEqual({
        ...initialState,
        loading: true,
        httpError: null
      });
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

    it('sets loading to true', () => {
      newState = withHttpReducer(users)(usersInitialState, {
        type: HTTP_BEGIN()
      });

      expect(newState).toEqual({
        ...initialState,
        loading: true,
        httpError: null
      });
    });
  });
});
