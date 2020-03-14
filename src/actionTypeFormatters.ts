import { IWithHttpReducerActionTypes } from './interfaces';
import { ReducerName } from './types';
import { EWithHttpReducerActionPrefixes } from './enums';


export const HTTP_BEGIN = (reducerName: ReducerName) =>
  `${EWithHttpReducerActionPrefixes.BEGIN}${reducerName}`;
export const HTTP_SUCCESS = (reducerName: ReducerName) =>
  `${EWithHttpReducerActionPrefixes.SUCCESS}${reducerName}`;
export const HTTP_FAILURE = (reducerName: ReducerName) =>
  `${EWithHttpReducerActionPrefixes.FAILURE}${reducerName}`;

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
