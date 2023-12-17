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

  fetchUsers = () => {
    this.setState({ loading: true });
    axios.get('http://localhost:3000/api/users')
      .then(response => {
        this.setState({ users: response.data, loading: false });
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
