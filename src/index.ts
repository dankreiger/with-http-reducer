import { HTTP_BEGIN, HTTP_SUCCESS, HTTP_FAILURE } from './actionTypeFormatters';
import withHttpReducer from './withHttpReducer';

export * from './withHttpReducer';
export * from './actionTypeFormatters';

export const httpAction = (reducerName?: string) => ({
  BEGIN: HTTP_BEGIN(reducerName),
  SUCCESS: HTTP_SUCCESS(reducerName),
  FAILURE: HTTP_FAILURE(reducerName)
});
