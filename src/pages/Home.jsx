import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to Todo App</h1>
      <p>Manage your tasks efficiently</p>
      <button onClick={() => navigate('/login')}>
        Get Started
      </button>
    </div>
  );
}

export default Home;