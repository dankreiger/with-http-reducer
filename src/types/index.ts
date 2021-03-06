import { IAction, IWithHttpReducerInitialState } from '../interfaces';

export type WithHttpReducerState<
  T,
  E = unknown
> = IWithHttpReducerInitialState<E> & T;

export type AnyAction<R> = IAction & R;

// TODO: make this type clearer
export type ActionTypeFormatter = (
  reducerName: string,
  payload?: Record<string, unknown> | undefined
) => AnyAction<Record<string, unknown>> | IAction;
