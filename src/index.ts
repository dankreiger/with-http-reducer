import {
  HTTP_BEGIN as b,
  HTTP_FAILURE as f,
  HTTP_SUCCESS as s
} from './actionTypeFormatters';
import { withHttpReducer } from './withHttpReducer';

const httpAction = (reducerName?: string) => ({
  BEGIN: HTTP_BEGIN(reducerName),
  FAILURE: HTTP_FAILURE(reducerName),
  SUCCESS: HTTP_SUCCESS(reducerName)
});

const HTTP_BEGIN = (reducerName?: string) => b(reducerName);
const HTTP_FAILURE = (reducerName?: string) => f(reducerName);
const HTTP_SUCCESS = (reducerName?: string) => s(reducerName);

const reduxAsync = {
  httpAction,
  withHttpReducer,
  HTTP_BEGIN,
  HTTP_FAILURE,
  HTTP_SUCCESS
};

export default reduxAsync;
