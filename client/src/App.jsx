import { useCallback, useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { useGetTodoList } from './hooks/useGetTodoList';
import './App.css';
import { AddTodoItem } from './components/AddTodoItem';


function App() {
  const getTodoList = useGetTodoList();
  const [todoList, setTodoList] = useState([]);

  const updateTodoList = useCallback(() => {
    getTodoList().then((result) => setTodoList(result.todos))
  }, [getTodoList])

  useEffect(() => {
    updateTodoList()
}, [updateTodoList])

  return (
    <div className="App">
      <h1>Мои задачи</h1>
      <TodoList todoList={todoList} updateTodoList={updateTodoList} />
      <br />
      <AddTodoItem updateTodoList={updateTodoList} />
    </div>
  );
}

export default App;
