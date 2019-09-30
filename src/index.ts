import { HTTP_BEGIN, HTTP_FAILURE, HTTP_SUCCESS } from './actionTypeFormatters';
import withHttpReducer from './withHttpReducer';

export * from './withHttpReducer';
export * from './actionTypeFormatters';

export const httpAction = (reducerName?: string) => ({
  BEGIN: HTTP_BEGIN(reducerName),
  FAILURE: HTTP_FAILURE(reducerName),
  SUCCESS: HTTP_SUCCESS(reducerName)
});

export default { httpAction, withHttpReducer };
