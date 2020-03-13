import { httpBegin, httpFailure, httpSuccess } from './actionTypeFormatters';
import { withHttpReducer, withHttpReducerInitialState } from './withHttpReducer';

const reduxAsync = {
  httpBegin,
  httpFailure,
  httpSuccess,
  withHttpReducer,
  withHttpReducerInitialState
};

export default reduxAsync;
