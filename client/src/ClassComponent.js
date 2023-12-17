import React from 'react';
import axios from 'axios';
import UserList from './FunctionalComponent';

class ClassComponent extends React.Component {
  state = {
    users: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.fetchUsers();
  }

  // Function to shuffle an array using Fisher-Yates algorithm
  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Function to fetch users from the API
  fetchUsers = () => {
    this.setState({ loading: true });
    axios.get('http://localhost:3000/api/users')
      .then(response => {
        // Shuffle the user data
        const shuffledUsers = this.shuffleArray(response.data);
        this.setState({ users: shuffledUsers, loading: false });
      })
      .catch(error => this.setState({ error, loading: false }));
  };

  render() {
    const { users, loading, error } = this.state;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching users!</p>;

    return (
      <div>
        <UserList users={users} />
        <button onClick={this.fetchUsers}>Refresh Users</button>
      </div>
    );
  }
}

export default ClassComponent;
