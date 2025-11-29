import { useSelector, useDispatch } from 'react-redux';
import { toggleComplete, deleteTodo } from '../features/todos/todosSlice';

function TodoList({ theme }) {
  const todos = useSelector((state) => state.todos.items);
  const dispatch = useDispatch();

  if (todos.length === 0) {
    return <div>No todos yet. Add one to get started!</div>;
  }

  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id} className={`todo ${theme}-todo`}>
          <li className={todo.completed ? 'completed todo-item' : 'todo-item'}>
            {todo.title}
          </li>
          <button
            className="check-btn"
            onClick={() => dispatch(toggleComplete(todo.id))}
          >
            <i className="fas fa-check"></i>
          </button>
          <button
            className="delete-btn"
            onClick={() => dispatch(deleteTodo(todo.id))}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      ))}
    </>
  );
}

export default TodoList;
