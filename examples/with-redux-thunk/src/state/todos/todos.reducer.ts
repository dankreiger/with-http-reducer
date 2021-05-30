import { WHR } from '../../../../../lib/';
import type { AnyAction } from 'redux';
import type { ITodo, ITodosState } from './todos.types';
const initialState: ITodosState = {};

export const todos = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const todosReducer = WHR<ITodosState, ITodo[]>(todos);
