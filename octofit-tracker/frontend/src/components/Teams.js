import React, { useEffect, useState } from 'react';

const Teams = () => {
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Teams API endpoint:', apiUrl);
        console.log('Fetched teams data:', data);
        setTeams(data.results || data);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, [apiUrl]);

  const renderTable = () => {
    if (!teams.length) return <tr><td colSpan="100%">No teams found.</td></tr>;
    const keys = Object.keys(teams[0] || {});
    return (
      <>
        <thead className="table-dark">
          <tr>
            {keys.map(key => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {teams.map((team, idx) => (
            <tr key={team.id || idx}>
              {keys.map(key => <td key={key}>{String(team[key])}</td>)}
            </tr>
          ))}
        </tbody>
      </>
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 display-6">Teams</h2>
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

export default Teams;
