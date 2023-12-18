import React, { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const registerUser = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error occurred during registration');
    }
  };

  const loginUser = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error occurred during login');
    }
  };

  const logoutUser = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/logout', {
        method: 'GET',
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error occurred during logout');
    }
  };

  return (
    <div>
      <h1>User Authentication</h1>
      <div>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={registerUser}>Register</button>
      </div>

      <div>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={loginUser}>Login</button>
      </div>

      <div>
        <h2>Logout</h2>
        <button onClick={logoutUser}>Logout</button>
      </div>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
