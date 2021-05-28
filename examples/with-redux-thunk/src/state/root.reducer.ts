import { combineReducers } from 'redux';
import todos from './todos/todos.reducer';

const appReducers = {
  todos,
} as const;

type TReducerKey = keyof typeof appReducers;
export type TAppState = Record<
  TReducerKey,
  ReturnType<typeof appReducers[TReducerKey]>
>;

const rootReducer = combineReducers(appReducers);

export default rootReducer;
