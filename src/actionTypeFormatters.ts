import { IWithHttpReducerActionTypes } from './interfaces';
import { EWithHttpReducerActionPrefixes as Prefix } from './enums';
import { ActionTypeFormatter } from './types';

export const HTTP_BEGIN = (reducerName: string): string =>
  `${Prefix.BEGIN}${reducerName}`;
export const HTTP_SUCCESS = (reducerName: string): string =>
  `${Prefix.SUCCESS}${reducerName}`;
export const HTTP_FAILURE = (reducerName: string): string =>
  `${Prefix.FAILURE}${reducerName}`;

export function withHttpActionType(
  reducerName: string
): IWithHttpReducerActionTypes {
  return {
    BEGIN: HTTP_BEGIN(reducerName),
    FAILURE: HTTP_FAILURE(reducerName),
    SUCCESS: HTTP_SUCCESS(reducerName),
  };
}

const actionReturn = <P>(type: string, payload: P) => {
  if (!!payload && typeof payload === 'object') {
    return { type, ...payload };
  }
  return { type };
};
export const httpBegin: ActionTypeFormatter = (
  reducerName,
  payload = undefined
) => {
  const type = HTTP_BEGIN(reducerName);
  return actionReturn(type, payload);
};

export const httpSuccess: ActionTypeFormatter = (
  reducerName,
  payload = undefined
) => {
  const type = HTTP_SUCCESS(reducerName);
  return { type, ...payload };
};

export const httpFailure: ActionTypeFormatter = (
  reducerName,
  payload = undefined
) => {
  const type = HTTP_FAILURE(reducerName);
  return actionReturn(type, payload);
};
