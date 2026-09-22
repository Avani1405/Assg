import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import withAuth from '../components/withAuth';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="dashboard-container">
      
      <div className="dash-card header-card header-user">
        <h2>User Dashboard</h2>
        <p>Welcome, {user.name}!</p>
      </div>

      <div className="dash-card">
        <h3 className="dash-list-header">Your Information</h3>
        <div className="info-row">
          <div className="info-label">Name:</div>
          <div className="info-value">{user.name}</div>
        </div>
        <div className="info-row">
          <div className="info-label">Email:</div>
          <div className="info-value">{user.email}</div>
        </div>
        <div className="info-row">
          <div className="info-label">Role:</div>
          <div className="info-value">
            <span className={`role-badge badge-${user.role}`}>{user.role}</span>
          </div>
        </div>
      </div>

      <div className="dash-alert alert-user">
        <strong>User Access Level:</strong> You have basic access to view your information.
      </div>

      <div className="dash-actions">
        {(user.role === 'manager' || user.role === 'admin') && (
          <Link to="/manager" className="btn-purple">Go to Manager Dashboard</Link>
        )}
        {user.role === 'admin' && (
          <Link to="/admin" className="btn-danger">Go to Admin Dashboard</Link>
        )}
      </div>

    </div>
  );
};

export default withAuth(Dashboard);
