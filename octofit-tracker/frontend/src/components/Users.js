import React, { useEffect, useState } from 'react';

const Users = () => {
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Users API endpoint:', apiUrl);
        console.log('Fetched users data:', data);
        setUsers(data.results || data);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, [apiUrl]);

  const renderTable = () => {
    if (!users.length) return <tr><td colSpan="100%">No users found.</td></tr>;
    const keys = Object.keys(users[0] || {});
    return (
      <>
        <thead className="table-dark">
          <tr>
            {keys.map(key => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user.id || idx}>
              {keys.map(key => <td key={key}>{String(user[key])}</td>)}
            </tr>
          ))}
        </tbody>
      </>
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 display-6">Users</h2>
      <div className="card">
        <div className="card-body">
          <table className="table table-striped table-bordered table-hover">
            {renderTable()}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
