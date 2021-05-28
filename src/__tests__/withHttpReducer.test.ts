import { withHttpActionType } from '../utils/actionTypeFormatters';
import { IReducer } from '../interfaces';
import { IWithHttpReducerState } from '../types';
import deepFreeze from 'deep-freeze';
import {
  withHttpReducer,
  withHttpReducerInitialState,
} from '../withHttpReducer';
import { TAnyAction } from '../types';

interface IDummyState {
  currentUser: string | undefined;
  numberOfDogs: number;
  userIsActive: boolean;
}

const dummyInitialState = {
  currentUser: undefined,
  numberOfDogs: 1,
  userIsActive: false,
};

type DummyStateIWithHttpReducerState = IWithHttpReducerState<
  IDummyState,
  unknown
>;
interface IDummyPayload {
  user?: string | undefined;
}

const dummyReducer: IReducer<IDummyState, TAnyAction<IDummyPayload>> = (
  state = dummyInitialState,
  action
) => {
  switch (action.type) {
    case 'UPDATE_CURRENT_USER':
      return {
        ...state,
        currentUser: action.user,
      };
    default:
      return state;
  }
};

/**
 * @description withHttpReducer
 * a higher-order reducer that handles simple/complex data requests
 * can be used for a simple http requests by using:
 *  - BEGIN (set in progress)
 *  - FAILURE (http error)
 *  - COMPLETED (finished) - can be used to dispatch success payloads as well
 */

describe('withHttpReducer', () => {
  let initialState: DummyStateIWithHttpReducerState;
  let newState = {};

  /**
   * @description BEGIN
   * triggered at the beginning of a data request
   * sets loading state to true
   *
   */
  describe('BEGIN actions', () => {
    const { BEGIN } = withHttpActionType('dummyReducer');

    beforeEach(() => {
      initialState = { ...withHttpReducerInitialState, ...dummyInitialState };
      newState = {};
      expect(BEGIN).toBe('@@http/begin/dummyReducer');
    });

    it('sets loading to true', () => {
      const dummyBeginActionCreator = () => ({ type: BEGIN });

      deepFreeze(dummyBeginActionCreator);
      deepFreeze(initialState);

      newState = withHttpReducer(dummyReducer, 'dummyReducer')(
        initialState,
        dummyBeginActionCreator()
      );
      expect(newState).toEqual({
        ...initialState,
        loading: true,
      });
    });

    it('does not change a LOADING state to account for requests that begin again while in a loading state', () => {
      initialState = {
        ...initialState,
        loading: true,
      };
      const dummyBeginActionCreator = () => ({ type: BEGIN });

      deepFreeze(dummyBeginActionCreator);
      deepFreeze(initialState);

      newState = withHttpReducer(dummyReducer, 'dummyReducer')(
        initialState,
        dummyBeginActionCreator()
      );
      expect(newState).toEqual({
        ...initialState,
        loading: true,
      });
    });

    it('sets a FAILURE state back to null', () => {
      initialState = {
        ...initialState,
        httpError: new Error('woof'),
      };
      const dummyBeginActionCreator = () => ({ type: BEGIN });

      deepFreeze(dummyBeginActionCreator);
      deepFreeze(initialState);

      newState = withHttpReducer(dummyReducer, 'dummyReducer')(
        initialState,
        dummyBeginActionCreator()
      );
      expect(newState).toEqual({
        ...initialState,
        httpError: null,
        loading: true,
      });
    });

    it('accepts a payload as an object in the action creator and merges it into the returned state', () => {
      const dummyBeginActionCreator = (payload: { animal: string }) => ({
        ...payload,
        type: BEGIN,
      });

      deepFreeze(dummyBeginActionCreator);
      deepFreeze(initialState);

      newState = withHttpReducer(dummyReducer, 'dummyReducer')(
        initialState,
        dummyBeginActionCreator({ animal: 'dog' })
      );
      expect(newState).toEqual({
        ...initialState,
        animal: 'dog',
        loading: true,
      });
    });
  });
});

/**
 * @description SUCCESS
 * dispatched to inform redux that the data request was successful
 */
describe('SUCCESS actions', () => {
  const { SUCCESS } = withHttpActionType('dummyReducer');
  let initialState: DummyStateIWithHttpReducerState;
  let newState: DummyStateIWithHttpReducerState;
  beforeEach(() => {
    initialState = { ...withHttpReducerInitialState, ...dummyInitialState };
    expect(SUCCESS).toBe('@@http/success/dummyReducer');
  });

  it('sets loading to false', () => {
    const dummySuccessActionCreator = () => ({ type: SUCCESS });
    initialState = { ...initialState, loading: true };
    deepFreeze(dummySuccessActionCreator);
    deepFreeze(initialState);

    newState = withHttpReducer(dummyReducer, 'dummyReducer')(
      initialState,
      dummySuccessActionCreator()
    );
    expect(newState).toEqual({
      ...initialState,
      loading: false,
    });
  });

  it('accepts a payload as an object in the action creator and merges it into the returned state', () => {
    const dummySuccessActionCreator = (payload: { animal: string }) => ({
      ...payload,
      type: SUCCESS,
    });

    deepFreeze(dummySuccessActionCreator);
    deepFreeze(initialState);

    newState = withHttpReducer(dummyReducer, 'dummyReducer')(
      initialState,
      dummySuccessActionCreator({ animal: 'dog' })
    );
    expect(newState).toEqual({
      ...initialState,
      animal: 'dog',
    });
  });
});

/**
 * @description FAILURE
 * dispatched to inform redux that the data request was cancelled
 * in a saga, this happens when a new data request is triggered
 * before the saga is complete
 */
describe('FAILURE actions', () => {
  const { FAILURE } = withHttpActionType('dummyReducer');
  let initialState: DummyStateIWithHttpReducerState;
  let newState: DummyStateIWithHttpReducerState;
  beforeEach(() => {
    initialState = { ...withHttpReducerInitialState, ...dummyInitialState };
    expect(FAILURE).toBe('@@http/failure/dummyReducer');
  });

  it('sets httpError to true', () => {
    const dummyFailureActionCreator = () => ({ type: FAILURE });

    deepFreeze(dummyFailureActionCreator);
    deepFreeze(initialState);

    newState = withHttpReducer(dummyReducer, 'dummyReducer')(
      initialState,
      dummyFailureActionCreator()
    );
    expect(newState).toEqual({
      ...initialState,
      httpError: true,
    });
  });

  it('accepts a payload as an object in the action creator and merges it into the returned state', () => {
    const dummyFailureActionCreator = (payload: { animal: string }) => ({
      ...payload,
      type: FAILURE,
    });

    deepFreeze(dummyFailureActionCreator);
    deepFreeze(initialState);

    newState = withHttpReducer(dummyReducer, 'dummyReducer')(
      initialState,
      dummyFailureActionCreator({ animal: 'dog' })
    );
    expect(newState).toEqual({
      ...initialState,
      animal: 'dog',
      httpError: true,
    });
  });
});
