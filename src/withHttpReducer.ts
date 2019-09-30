import { withHttpActionType } from './actionTypeFormatters';

import { IAnyAction, IWithHttpReducerInitialState } from './interfaces';
import { Reducer } from './types';

export const withHttpReducerInitialState: IWithHttpReducerInitialState = {
  httpError: null,
  loading: false
};

const returnState = (state: any, payload?: any) => {
  if (payload) {
    return { ...state, ...payload };
  }
  return state;
};

export default function withHttpReducer(
  reducer: Reducer,
  reducerName?: string
) {
  return (state: any = withHttpReducerInitialState, action: IAnyAction) => {
    const { BEGIN, SUCCESS, FAILURE } = withHttpActionType(reducerName);
    const { type, payload } = action;
    switch (type) {
      case BEGIN:
        return {
          ...returnState(state, payload),
          httpError: null,
          loading: true
        };
      case SUCCESS:
        return {
          ...returnState(state, payload),
          loading: false
        };
      case FAILURE:
        return {
          ...returnState(state, payload),
          httpError: true,
          loading: false
        };
      default:
        return reducer(state, action);
    }
  };
}
