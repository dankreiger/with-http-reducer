import { HTTP_BEGIN, HTTP_FAILURE, HTTP_SUCCESS } from './actionTypeFormatters';
import { withHttpReducer } from './withHttpReducer';

export const httpAction = (reducerName?: string) => ({
  BEGIN: HTTP_BEGIN(reducerName),
  FAILURE: HTTP_FAILURE(reducerName),
  SUCCESS: HTTP_SUCCESS(reducerName)
});

export const withHttpReducer = htr;

const reduxAsync = { httpAction, withHttpReducer };

export default reduxAsync;
