import { IWHRState } from '../types/types';

export default function returnState<S, R>(
  combinedState: IWHRState<S, R>,
  payload?: unknown
): IWHRState<S, R> {
  if (payload && typeof payload === 'object') {
    return { ...combinedState, ...payload };
  }
  return combinedState;
}
