import { IWithHttpReducerActionTypes } from './interfaces';
import { ReducerName } from './types';
function formatActionType(reducerName: ReducerName): string {
  const reducerNameFormatted =
    (reducerName && reducerName.replace(/([A-Z])/g, '_$1').toUpperCase()) || '';
  // TODO - don't allow a reducer name with no length
  return reducerNameFormatted.length ? `_${reducerNameFormatted}_` : '_';
}

export const HTTP_BEGIN = (reducerName: ReducerName) =>
  `@@http/FETCH${formatActionType(reducerName)}BEGIN`;

export const HTTP_SUCCESS = (reducerName: ReducerName) =>
  `@@http/FETCH${formatActionType(reducerName)}SUCCESS`;
export const HTTP_FAILURE = (reducerName: ReducerName) =>
  `@@http/FETCH${formatActionType(reducerName)}FAILURE`;

export function withHttpActionType(
  reducerName: ReducerName
): IWithHttpReducerActionTypes {
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

export const httpBegin = (reducerName: ReducerName, payload?: any) => {
  const type = HTTP_BEGIN(reducerName);
  return actionReturn(type, payload);
};

export const httpSuccess = (reducerName: ReducerName, payload?: any) => {
  const type = HTTP_SUCCESS(reducerName);
  return actionReturn(type, payload);
};

export const httpFailure = (reducerName: ReducerName, payload?: any) => {
  const type = HTTP_FAILURE(reducerName);
  return actionReturn(type, payload);
};
