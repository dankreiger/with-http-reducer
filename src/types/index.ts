import { Action, AnyAction } from '../interfaces';

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A
) => S;

export type ReducerName = string | undefined;
