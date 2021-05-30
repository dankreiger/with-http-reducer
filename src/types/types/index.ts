import { AnyAction, Reducer } from 'redux';
import { simpleRequest } from '../../utils/simpleRequest';
import { IWHRActionTypes, IWHRInitialState } from '../interfaces';

export type IWHRState<S, R> = IWHRInitialState<R> & S;

export type TInnerReducer<S, R> = ((
  state: S,
  action: AnyAction
) => IWHRState<S, R>) &
  IWHRActionTypes & { request: ReturnType<typeof simpleRequest> };
