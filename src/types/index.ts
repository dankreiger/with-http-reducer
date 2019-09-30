import { Action, IAnyAction } from '../interfaces';

export type Reducer<S = any, A extends Action = IAnyAction> = (
  state: S | undefined,
  action: A
) => S;

export type ReducerName = string | undefined;
