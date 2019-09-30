import { HTTP_BEGIN, HTTP_FAILURE, HTTP_SUCCESS } from './actionTypeFormatters';
import htr from './withHttpReducer';

export const httpAction = (reducerName?: string) => ({
  BEGIN: HTTP_BEGIN(reducerName),
  FAILURE: HTTP_FAILURE(reducerName),
  SUCCESS: HTTP_SUCCESS(reducerName)
});

export const withHttpReducer = htr;
