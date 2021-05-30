import { TInnerReducer } from './types/types';
import { withHttpActionType } from './utils/actionTypeFormatters';
import { Reducer } from 'redux';
import { simpleRequest } from './utils/simpleRequest';
import { combineStateReducer } from './utils/combineStateReducer';

const reducerNames = new Set<string>();
export function WHR<S, R>(
  reducer: Reducer,
  name?: string
): TInnerReducer<S, R> {
  if (typeof reducer !== 'function') {
    throw new Error('Argument passed to WHR must be a reducer function');
  }
  const _name = name || reducer.name;
  if (!_name) {
    throw new Error(
      'Reducer does not have a name. Please name your reducer function, or pass a name to the second argument of WHR'
    );
  }

  if (reducerNames.has(reducer.name)) {
    throw new Error(
      `Reducer name ${reducer.name} already exists in this project. Please give your reducer a unique name.`
    );
  } else {
    reducerNames.add(reducer.name);
  }

  const actionTypes = withHttpActionType(reducer.name);
  const innerReducer = combineStateReducer<S, R>(reducer, actionTypes);
  const request = simpleRequest(actionTypes);

  return Object.assign(innerReducer, {
    request,
    ...actionTypes,
  });
}
