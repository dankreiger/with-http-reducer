import type { IWHRActionTypes } from '../types/interfaces';
import { EWHRActionPrefixes as Prefixes } from '../types/enums';

const entries = Object.entries(Prefixes);

export const withHttpActionType = (reducerName: string): IWHRActionTypes =>
  entries.reduce(
    (acc, [key, value]) => ({ ...acc, [key]: `${value}${reducerName}` }),
    {} as IWHRActionTypes
  );
