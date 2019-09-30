import { IAction, IAnyAction } from '../interfaces';

export type Reducer<S = any, A extends IAction = IAnyAction> = (
  state: S | undefined,
  action: A
) => S;

export type ReducerName = string | undefined;
