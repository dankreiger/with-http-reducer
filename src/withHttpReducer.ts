import { Reducer } from './types';
import { AnyAction, WithHttpReducerInitialState } from './interfaces';
import { withHttpActionType } from './actionTypeFormatters';

export const withHttpReducerInitialState: WithHttpReducerInitialState = {
  loading: false,
  httpError: null
};

const returnState = (state: any, payload?: any) => {
  if (payload) {
    return { ...state, ...payload };
  }
  return state;
};

export default function withHttpReducer(
  reducer: Reducer,
  reducerName?: string
) {
  return (state: any = withHttpReducerInitialState, action: AnyAction) => {
    const { BEGIN, SUCCESS, FAILURE } = withHttpActionType(reducerName);
    const { type, payload } = action;
    switch (type) {
      case BEGIN:
        return {
          ...returnState(state, payload),
          loading: true,
          httpError: null
        };
      case SUCCESS:
        return {
          ...returnState(state, payload),
          loading: false
        };
      case FAILURE:
        return {
          ...returnState(state, payload),
          loading: false,
          httpError: true
        };
      default:
        return state;
    }
  };
}
