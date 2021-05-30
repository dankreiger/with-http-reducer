import React, { useEffect } from 'react';
import { TAppState } from 'state/root.reducer';
import { todosReducer } from 'state/todos/todos.reducer';
import { ITodo } from 'state/todos/todos.types';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const { response, loading } = useSelector(({ todos }: TAppState) => ({
    loading: todos.loading,
    response: todos.response,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      todosReducer.request(() =>
        fetch(
          'https://jsonplaceholder.typicode.com/todos?_limit=3'
        ).then((res) => res.json())
      )
    );
    // dispatch(fetchTodos());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <ul>
        {loading && <h1>loading...</h1>}
        {response &&
          response?.length > 0 &&
          response.map((item: ITodo) => <li key={item.id}>{item.title}</li>)}
      </ul>
    </div>
  );
}

export default App;
