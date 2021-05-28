import { IReducer, IWithHttpReducerInitialState } from './interfaces';
import { TAnyAction, IWithHttpReducerState, TInnerReducer } from './types';
import { withHttpActionType } from './utils/actionTypeFormatters';
import returnState from './utils/returnState';

export const withHttpReducerInitialState: IWithHttpReducerInitialState = {
  httpError: null,
  loading: false,
};

export function withHttpReducer<S, P = unknown>(
  reducer: IReducer<S, TAnyAction<P>>
): TInnerReducer<S, P> {
  if (typeof reducer !== 'function') {
    throw new Error(
      'Argument passed to withHttpReducer must be a reducer function'
    );
  }

  const { BEGIN, SUCCESS, FAILURE } = withHttpActionType(reducer.name);

  function combineStateReducer(
    state: S,
    action: TAnyAction<P>
  ): IWithHttpReducerState<S> {
    if (typeof action?.type !== 'string') {
      throw new Error(`Actions must have a 'type' property of type string`);
    }

    const combinedState: IWithHttpReducerState<S> = {
      ...withHttpReducerInitialState,
      ...reducer(state, action),
    };

    const { type, ...rest } = action;

    const newState: IWithHttpReducerState<S> = returnState<
      S,
      Pick<TAnyAction<P>, Exclude<keyof P, 'type'>>
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
  }

  return Object.assign(combineStateReducer, { BEGIN, SUCCESS, FAILURE });
}
