import { withHttpActionType } from './actionTypeFormatters';

import { IAnyAction, IWithHttpReducerInitialState } from './interfaces';
import { Reducer } from './types';

export const withHttpReducerInitialState: IWithHttpReducerInitialState = {
  httpError: null,
  loading: false
};

const returnState = (combinedState: any, payload?: any) => {
  if (payload) {
    return { ...combinedState, ...payload };
  }
  return combinedState;
};

export default function withHttpReducer(
  reducer: Reducer,
  reducerName?: string
) {
  return (state: any = withHttpReducerInitialState, action: IAnyAction) => {
    const combinedState = { ...withHttpReducerInitialState, ...state };
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
