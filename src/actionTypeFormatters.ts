import { WithHttpReducerActionTypes } from './interfaces';
import { ReducerName } from './types';
function formatActionType(reducerName?: ReducerName): string {
  const result =
    (reducerName && reducerName.replace(/([A-Z])/g, '_$1').toUpperCase()) || '';
  return result.length ? `_${result}_` : '_';
}

export const HTTP_BEGIN = (reducerName?: ReducerName) =>
  `@@http/FETCH${formatActionType(reducerName)}BEGIN`;

export const HTTP_SUCCESS = (reducerName?: ReducerName) =>
  `@@http/FETCH${formatActionType(reducerName)}SUCCESS`;
export const HTTP_FAILURE = (reducerName?: ReducerName) =>
  `@@http/FETCH${formatActionType(reducerName)}FAILURE`;

export function withHttpActionType(
  reducerName?: ReducerName
): WithHttpReducerActionTypes {
  return {
    BEGIN: HTTP_BEGIN(reducerName),
    FAILURE: HTTP_FAILURE(reducerName),
    SUCCESS: HTTP_SUCCESS(reducerName)
  };
}

const actionReturn = (type: string, payload?: string) => {
  if (payload) {
    return { type, payload };
  }
  return { type };
};

export const httpBegin = (reducerName?: ReducerName, payload?: any) => {
  const type = HTTP_BEGIN(reducerName);
  return actionReturn(type, payload);
};

export const httpSuccess = (reducerName?: ReducerName, payload?: any) => {
  const type = HTTP_SUCCESS(reducerName);
  return actionReturn(type, payload);
};

export const httpFailure = (reducerName?: ReducerName, payload?: any) => {
  const type = HTTP_FAILURE(reducerName);
  return actionReturn(type, payload);
};
