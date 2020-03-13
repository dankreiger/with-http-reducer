import { withHttpActionType } from './actionTypeFormatters';

import { IAnyAction, IWithHttpReducerInitialState } from './interfaces';
import { Reducer } from './types';

export const withHttpReducerInitialState: IWithHttpReducerInitialState = {
  httpError: null,
  loading: false
};

const returnState = (combinedState: any, payload?: any) => {
  // for objects that send in their own 'payload' object (usually 3rd party libraries like redux-saga)
  if (payload && Object.keys(payload)[0] === 'payload') {
    const realPayload = payload.payload;
    if (realPayload && Object.keys(realPayload).length) {
      return { ...combinedState, ...realPayload };
    }
  }

  if (payload) {
    return { ...combinedState, ...payload };
  }
  return combinedState;
};

export function withHttpReducer(reducer: Reducer, reducerName: string) {
  return (state: any, action: IAnyAction) => {
    const combinedState = {
      ...withHttpReducerInitialState,
      ...reducer(state, action)
    };
    const { BEGIN, SUCCESS, FAILURE } = withHttpActionType(reducerName);
    const { type, payload } = action;
    switch (type) {
      case BEGIN:
        return {
          ...returnState(combinedState, payload),
          httpError: null,
          loading: true
        };
      case SUCCESS:
        return {
          ...returnState(combinedState, payload),
          loading: false
        };
      case FAILURE:
        return {
          ...returnState(combinedState, payload),
          httpError: true,
          loading: false
        };
      default:
        return reducer(combinedState, action);
    }
  };
}
