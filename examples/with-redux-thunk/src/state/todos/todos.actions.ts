import { Dispatch } from 'redux';
import abortableFetch from 'utils/abortableFetch';

import todosReducer from './todos.reducer';
import { ITodo } from './todos.types';

export const fetchTodos = () => (dispatch: Dispatch) => {
  dispatch({ type: todosReducer.BEGIN });

  fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) => response.json())
    .then((response: ITodo[]) =>
      dispatch({ type: todosReducer.SUCCESS, todos: response })
    )
    .catch((error: Error) => dispatch({ type: todosReducer.FAILURE }));
};

// export const complexFetchTodos = () => (dispatch: Dispatch) => {
//   abortableFetch<ITodo[]>('https://jsonplaceholder.typicode.com/todos')({
//     beginCb: () => dispatch(todosHttpBegin()),
//     successCb: (response) => dispatch(todosHttpSuccess({ todos: response })),
//     failureCb: (error) => dispatch(todosHttpFailure(error)),
//   });
// };
