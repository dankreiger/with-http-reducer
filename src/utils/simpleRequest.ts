import { Dispatch } from 'redux';
import { IWHRActionTypes } from '../types/interfaces';

export const simpleRequest = (actionTypes: IWHRActionTypes) => <R>(
  asyncFunction: () => Promise<R>
) => (dispatch: Dispatch): void => {
  const { BEGIN, LOADING, SUCCESS, FAILURE } = actionTypes;
  dispatch({ type: LOADING });
  asyncFunction()
    .then((response) => {
      dispatch({ type: SUCCESS, response });
    })
    .catch((error) => {
      dispatch({ type: FAILURE, httpError: error });
    });
};
