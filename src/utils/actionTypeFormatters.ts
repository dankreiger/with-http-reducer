import type { IWithHttpReducerActionTypes } from '../interfaces';
import { EWithHttpReducerActionPrefixes as P } from '../enums';

const entries = Object.entries(P);

export const withHttpActionType = (
  reducerName: string
): IWithHttpReducerActionTypes =>
  entries.reduce(
    (acc, [key, value]) => ({ ...acc, [key]: `${value}${reducerName}` }),
    {} as IWithHttpReducerActionTypes
  );
