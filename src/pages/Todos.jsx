import React, { useEffect, useState } from 'react';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [datetime, setDatetime] = useState(new Date());
  const [theme, setTheme] = useState('standard'); // standard, light, darker

  // Update datetime every second
  useEffect(() => {
    const timer = setInterval(() => setDatetime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Apply theme to body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // GitHub corner animation
  useEffect(() => {
    const arm = document.querySelector('.octo-arm');
    const corner = document.querySelector('.github-corner');
    if (!arm || !corner) return;

    const wave = () => {
      arm.style.animation = 'octocat-wave 560ms ease-in-out';
      setTimeout(() => { arm.style.animation = ''; }, 560);
    };

    corner.addEventListener('mouseenter', wave);
    return () => corner.removeEventListener('mouseenter', wave);
  }, []);

  // Initialize external JS files (main.js and time.js)
useEffect(() => {
  const mainScript = document.createElement('script');
  mainScript.src = '/JS/main.js';  // <-- notice leading slash
  mainScript.async = true;
  document.body.appendChild(mainScript);

  const timeScript = document.createElement('script');
  timeScript.src = '/JS/time.js';  // <-- leading slash
  timeScript.async = true;
  document.body.appendChild(timeScript);

  return () => {
    document.body.removeChild(mainScript);
    document.body.removeChild(timeScript);
  };
}, []);


  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([{ id: Date.now(), text: input, completed: false }, ...todos]);
    setInput('');
  };

  const handleDelete = (id) => setTodos(todos.filter(todo => todo.id !== id));
  const handleCheck = (id) =>
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));

  return (
    <div>
      {/* Header */}
      <div id="header">
        <div className="flexrow-container">
          <div className="standard-theme theme-selector" onClick={() => setTheme('standard')}></div>
          <div className="light-theme theme-selector" onClick={() => setTheme('light')}></div>
          <div className="darker-theme theme-selector" onClick={() => setTheme('darker')}></div>
        </div>
        <h1 id="title">
          Just do it.
          <div id="border"></div>
        </h1>
      </div>

      {/* Form */}
      <div id="form">
        <form onSubmit={handleAddTodo}>
          <input
            className={`todo-input ${theme}-input`}
            type="text"
            placeholder="Add a task."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className={`todo-btn ${theme}-button`} type="submit">
            I Got This!
          </button>
        </form>
      </div>

      {/* GitHub Corner and DateTime */}
      <div className="version">
        <div className="demo version-section">
          <a href="https://github.com/lordwill1/todo-list" className="github-corner">
            <svg width="80" height="80" viewBox="0 0 250 250" style={{
              fill: '#151513',
              color: '#fff',
              position: 'absolute',
              top: 0,
              border: 0,
              left: 0,
              transform: 'scale(-1,1)'
            }}>
              <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
              <path className="octo-arm"
                d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                fill="currentColor"
                style={{ transformOrigin: '130px 106px' }}
              ></path>
              <path className="octo-body"
                d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                fill="currentColor"
              ></path>
            </svg>
          </a>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <p><span id="datetime">{datetime.toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}</span></p>
        </div>
      </div>

      {/* Todo List */}
      <div id="myUnOrdList">
        <ul className="todo-list">
          {todos.length === 0 && <div className={`todo ${theme}-todo`}><li>No tasks yet</li></div>}
          {todos.map(todo => (
            <div key={todo.id} className={`todo ${theme}-todo`}>
              <li className={todo.completed ? 'completed' : ''}>{todo.text}</li>
              <button className="check-btn" onClick={() => handleCheck(todo.id)}>✔</button>
              <button className="delete-btn" onClick={() => handleDelete(todo.id)}>🗑</button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todos;
