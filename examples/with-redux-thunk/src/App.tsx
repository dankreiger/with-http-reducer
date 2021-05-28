import React, { useEffect } from 'react';
import './App.css';
import { fetchTodos } from 'state/todos/todos.actions';
import { useDispatch, useSelector } from 'react-redux';
import { TAppState } from 'state/root.reducer';

function App() {
  const todos = useSelector(({ todos }: TAppState) => todos.todos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <ul>
        {todos.length > 0 &&
          todos.map((item) => <li key={item.id}>{item.title}</li>)}
      </ul>
    </div>
  );
}

export default App;
