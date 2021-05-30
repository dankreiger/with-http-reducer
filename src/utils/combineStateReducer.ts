import { AnyAction, Reducer } from 'redux';
import { IWHRActionTypes } from '../types/interfaces';
import { IWHRState } from '../types/types';
import { getNewState } from './getNewState';
import { WHRInitialState } from './withHttpReducerInitialState';

export function combineStateReducer<S, R>(
  reducer: Reducer,
  { BEGIN, LOADING, SUCCESS, FAILURE, CANCELLED }: IWHRActionTypes
) {
  return function (state: S, action: AnyAction): IWHRState<S, R> {
    if (typeof action?.type !== 'string') {
      throw new Error(`Actions must have a 'type' property of type string`);
    }

    const combinedState = {
      ...WHRInitialState,
      ...reducer(state, action),
    };

    const { type, ...rest } = action;
    const newState = getNewState(combinedState, rest);

    switch (type) {
      case BEGIN:
        return {
          ...newState,
          httpError: null,
          done: false,
        };
      case LOADING:
        return {
          ...newState,
          httpError: null,
          loading: true,
        };
      case SUCCESS:
        return {
          ...newState,
          loading: false,
        };
      case FAILURE:
        return {
          ...newState,
          httpError: true,
          loading: false,
        };
      case CANCELLED:
        return {
          ...newState,
          loading: false,
          cancelled: true,
        };
      default:
        return newState;
    }
  };
}
