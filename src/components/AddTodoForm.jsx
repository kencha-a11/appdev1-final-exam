import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todos/todosSlice";

function AddTodoForm({ theme }) {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

    dispatch(
      addTodo({
        title: title.trim(),
        completed: false,
        userId: currentUser.id || 1,
      })
    );
    setTitle("");
  };

  return (
    <div id="form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task."
          className={`todo-input ${theme}-input`}
        />
        <button type="submit" className={`${theme}-button`}>
          I Got This!
        </button>
      </form>
    </div>
  );
}

export default AddTodoForm;
