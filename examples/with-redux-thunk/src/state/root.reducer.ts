import { combineReducers } from 'redux';
import { todosReducer } from './todos/todos.reducer';

type AppReducers = {
  todos: typeof todosReducer;
};

const appReducers = {
  todos: todosReducer,
} as const;

type TReducerKey = keyof AppReducers;
export type TAppState = Record<
  TReducerKey,
  ReturnType<typeof appReducers[TReducerKey]>
>;

const rootReducer = combineReducers(appReducers);

export default rootReducer;
