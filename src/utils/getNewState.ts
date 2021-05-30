import { IWHRState } from '../types/types';
import returnState from './returnState';

export const getNewState = <S, R>(
  combinedState: IWHRState<S, R>,
  rest: Record<string, any>
): IWHRState<S, R> => {
  const newState = returnState<S, R>(combinedState, rest);

  return newState;
};
