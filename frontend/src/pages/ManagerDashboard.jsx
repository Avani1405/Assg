import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';

const ManagerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const res = await api.get('/auth/users');
        setTeamMembers(res.data);
      } catch (err) {
        console.error('Failed to fetch team members', err);
      }
      setLoading(false);
    };
    fetchTeamMembers();
  }, []);

  return (
    <div className="dashboard-container">
      
      <div className="dash-card header-card header-manager">
        <h2>Manager Dashboard</h2>
        <p>Welcome, {user.name}! Manage your team efficiently.</p>
      </div>

      <div className="dash-card stat-card manager-stat">
        <div>
          <div className="stat-label">Team Members</div>
          <div className="stat-value">{loading ? '...' : teamMembers.length}</div>
        </div>
        <div className="stat-icon"></div>
      </div>

      <div className="dash-card">
        <h3 className="dash-list-header">Your Team Members</h3>
        {loading ? (
          <p>Loading members...</p>
        ) : teamMembers.length === 0 ? (
          <p>No regular users found in the system yet.</p>
        ) : (
          <ul className="recent-activities">
            {teamMembers.map((member) => (
              <li key={member._id} style={{color: 'var(--text-main)'}}>
                <strong>{member.name}</strong> ({member.email})
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="dash-alert alert-manager">
        <strong>Manager Access Level:</strong> You can manage team members and view reports.
      </div>

      <div className="dash-actions">
        <Link to="/" className="btn-primary">View User Dashboard</Link>
        {user.role === 'admin' && (
          <Link to="/admin" className="btn-danger">Go to Admin Dashboard</Link>
        )}
      </div>

    </div>
  );
};

export default ManagerDashboard;
