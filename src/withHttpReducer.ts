import { withHttpActionType } from './actionTypeFormatters';

import { IAnyAction, IWithHttpReducerInitialState, IWithHttpReducerRequestState } from './interfaces';

export const withHttpReducerInitialState: IWithHttpReducerInitialState = {
  httpError: null,
  loading: false
};

const returnState = (combinedState: IWithHttpReducerRequestState, payload?: object) => {
  if (payload) {
    return { ...combinedState, ...payload };
  }
  return combinedState;
};

export function withHttpReducer(reducer: <S extends IWithHttpReducerRequestState, A extends IAnyAction>(state: S, action: A) => S, reducerName: string) {
  return (state: IWithHttpReducerRequestState, action: IAnyAction) => {
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
