import { Dispatch } from 'redux';
import { todosReducer } from './todos.reducer';

export const fetchTodos = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: todosReducer.LOADING });
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos?_limit=3'
    );
    const json = await response.json();
    dispatch({ type: todosReducer.SUCCESS, response: json });
  } catch (error) {
    dispatch({ type: todosReducer.FAILURE, httpError: error });
  }
};

// export const complexFetchTodos = () => (dispatch: Dispatch) => {
//   abortableFetch<ITodo[]>('https://jsonplaceholder.typicode.com/todos')({
//     beginCb: () => dispatch(todosHttpBegin()),
//     successCb: (response) => dispatch(todosHttpSuccess({ todos: response })),
//     failureCb: (error) => dispatch(todosHttpFailure(error)),
//   });
// };
