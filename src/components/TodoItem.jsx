import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTodo, removeTodo } from '../features/todos/todosSlice';

function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const dispatch = useDispatch();

  const handleToggleComplete = () => {
    dispatch(editTodo({
      id: todo.id,
      todoData: {
        ...todo,
        completed: !todo.completed
      }
    }));
  };

  const handleDelete = () => {
    dispatch(removeTodo(todo.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      dispatch(editTodo({
        id: todo.id,
        todoData: {
          ...todo,
          title: editTitle.trim()
        }
      }));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <div className="todo">
      <button className="complete-btn" onClick={handleToggleComplete}>
        <i className="fas fa-check"></i>
      </button>
      
      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            {todo.title}
          </li>
          <button className="edit-btn" onClick={handleEdit}>
            <i className="fas fa-edit"></i>
          </button>
          <button className="trash-btn" onClick={handleDelete}>
            <i className="fas fa-trash"></i>
          </button>
        </>
      )}
    </div>
  );
}

export default TodoItem;