import React, { useState, useEffect, useCallback } from 'react';

const API_URL = 'http://localhost:3000';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const fetchWorkouts = useCallback(() => {
    fetch(`${API_URL}/workouts`, {
      headers: { 'Authorization': getToken() },
    })
      .then(response => response.json())
      .then(data => {
        setWorkouts(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    if (getToken()) {
      setIsLoggedIn(true);
      fetchWorkouts();
    }
  }, [fetchWorkouts]);

  function getToken() {
    return localStorage.getItem('token');
  }

  function login(username, password) {
    fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          alert('Login successful');
          window.location.reload();
        } else {
          alert('Login failed');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  function register(username, password) {
    fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Registration successful');
        } else {
          alert('Registration failed');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    login(username, password);
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();
    register(username, password);
  }

  return (
    <div className="App">
      <header>
        <h1>My Workout App</h1>
      </header>
      <main>
        {!isLoggedIn && (
          <form onSubmit={handleLoginSubmit}>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
          </form>
        )}
        {!isLoggedIn && (
          <form onSubmit={handleRegisterSubmit}>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Register</button>
          </form>
        )}
        {isLoggedIn && <button onClick={logout}>Logout</button>}
        {isLoggedIn && workouts.map((workout, index) => (
          <div key={index}>
            Name: {workout.name}, Type: {workout.type}
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
