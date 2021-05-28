import { withHttpReducer } from '../../../../../lib/';
import { AnyAction } from 'redux';
import { ITodosState } from './todos.types';
const initialState: ITodosState = {
  todos: [],
};
const todos = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default withHttpReducer<ITodosState>(todos);
