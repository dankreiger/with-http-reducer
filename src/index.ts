import { httpBegin, httpFailure, httpSuccess } from './actionTypeFormatters';
import { withHttpReducer } from './withHttpReducer';

const reduxAsync = {
  httpBegin,
  httpFailure,
  httpSuccess,
  withHttpReducer
};

export default reduxAsync;
