import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '' });

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);

  const addUser = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Network error when attempting to add user');
      }

      const result = await response.json();
      setUsers((prevUsers) => [...prevUsers, result]);
      setNewUser({ username: '' }); 
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <div>
      <h1>User Tracker</h1>
      <div>
        <input
          type="text"
          placeholder="Enter username"
          value={newUser.username}
          onChange={(e) => setNewUser({ username: e.target.value })}
        />
        <button onClick={addUser}>Add User</button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
