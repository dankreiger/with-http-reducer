import { TAnyAction } from '../types';

export interface IAction {
  readonly type: string;
}

export interface IReducer<S, A extends TAnyAction<unknown>> {
  (state: S, action: A): S;
}

export interface IWithHttpReducerInitialState<E = unknown> {
  loading: boolean;
  httpError: E;
}

export interface IWithHttpReducerActionTypes {
  BEGIN: string;
  SUCCESS: string;
  FAILURE: string;
}
