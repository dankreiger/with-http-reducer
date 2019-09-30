import { httpBegin, httpSuccess, httpFailure } from './actionTypeFormatters';
import { withHttpReducer } from './withHttpReducer';

const reduxAsync = {
  httpBegin,
  httpFailure,
  httpSuccess,
  withHttpReducer
};

export default reduxAsync;
