import { withHttpActionType } from './actionTypeFormatters';

import { IReducer, IWithHttpReducerInitialState } from './interfaces';
import { AnyAction, WithHttpReducerState } from './types';

export const withHttpReducerInitialState: IWithHttpReducerInitialState = {
  httpError: null,
  loading: false,
};

const returnState = <S, P = unknown, E = unknown>(
  combinedState: WithHttpReducerState<S, E>,
  payload?: P
) => {
  if (payload && typeof payload === 'object') {
    return { ...combinedState, ...payload };
  }
  return combinedState;
};

export function withHttpReducer<S, P = unknown>(
  reducer: IReducer<S, AnyAction<P>>,
  reducerName: string
) {
  return (state: S, action: AnyAction<P>): WithHttpReducerState<S> => {
    const reducedState = reducer(state, action);
    const combinedState: WithHttpReducerState<S> = {
      ...withHttpReducerInitialState,
      // improve readability here
      ...reducedState,
    };

    const { BEGIN, SUCCESS, FAILURE } = withHttpActionType(reducerName);
    const { type, ...rest } = action;

    const newState: WithHttpReducerState<S> = returnState<
      S,
      Pick<AnyAction<P>, Exclude<keyof P, 'type'>>
    >(combinedState, rest);

    switch (type) {
      case BEGIN:
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
      default:
        return newState;
    }
  };
}
