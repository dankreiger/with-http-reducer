import { IWithHttpReducerActionTypes } from './interfaces';
import { EWithHttpReducerActionPrefixes as Prefix } from './enums';


export const HTTP_BEGIN = (reducerName: string) =>
  `${Prefix.BEGIN}${reducerName}`;
export const HTTP_SUCCESS = (reducerName: string) =>
  `${Prefix.SUCCESS}${reducerName}`;
export const HTTP_FAILURE = (reducerName: string) =>
  `${Prefix.FAILURE}${reducerName}`;

export function withHttpActionType(
  reducerName: string
): IWithHttpReducerActionTypes {
  return {
    BEGIN: HTTP_BEGIN(reducerName),
    FAILURE: HTTP_FAILURE(reducerName),
    SUCCESS: HTTP_SUCCESS(reducerName)
  };
}

const actionReturn = (type: string, payload?: object) => {
  if (payload) {
    return { type, payload };
  }
  return { type };
};

export const httpBegin = (reducerName: string, payload?: object) => {
  const type = HTTP_BEGIN(reducerName);
  return actionReturn(type, payload);
};

export const httpSuccess = (reducerName: string, payload?: object) => {
  const type = HTTP_SUCCESS(reducerName);
  return actionReturn(type, payload);
};

export const httpFailure = (reducerName: string, payload?: object) => {
  const type = HTTP_FAILURE(reducerName);
  return actionReturn(type, payload);
};
