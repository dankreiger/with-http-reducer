import {
  IAction,
  IWithHttpReducerActionTypes,
  IWithHttpReducerInitialState,
} from '../interfaces';

export type IWithHttpReducerState<
  T,
  E = unknown
> = IWithHttpReducerInitialState<E> & T;

export type TAnyAction<R> = IAction & R;

export type TInnerReducer<S, P = unknown> = ((
  state: S,
  action: TAnyAction<P>
) => IWithHttpReducerState<S>) &
  IWithHttpReducerActionTypes;
