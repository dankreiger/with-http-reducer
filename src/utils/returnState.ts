import { IWithHttpReducerState } from '../types';

export default function returnState<S, P = unknown, E = unknown>(
  combinedState: IWithHttpReducerState<S, E>,
  payload?: P
): IWithHttpReducerState<S, E> {
  if (payload && typeof payload === 'object') {
    return { ...combinedState, ...payload };
  }
  return combinedState;
}
