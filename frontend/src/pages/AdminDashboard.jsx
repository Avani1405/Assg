import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../api/axiosConfig';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/auth/users');
        setAllUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users', err);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <div className="dashboard-container">
      
      <div className="dash-card header-card header-admin">
        <h2>Admin Dashboard</h2>
        <p>Welcome, {user.name}! You have full system access.</p>
      </div>

      <div className="dash-card stat-card admin-stat">
        <div>
          <div className="stat-label">Total System Users</div>
          <div className="stat-value">{loading ? '...' : allUsers.length}</div>
        </div>
        <div className="stat-icon"></div>
      </div>

      <div className="dash-card" style={{ padding: '1rem' }}>
        <h3 className="dash-list-header" style={{ padding: '0 0.5rem' }}>Admin Actions</h3>
        
        <div className="dash-list-item list-blue">
          <h4>Manage Users</h4>
          <p>Add, edit, or remove users</p>
        </div>
        <div className="dash-list-item list-purple">
          <h4>System Settings</h4>
          <p>Configure system preferences</p>
        </div>
        <div className="dash-list-item list-green">
          <h4>View Logs</h4>
          <p>Access system audit logs</p>
        </div>
        <div className="dash-list-item list-red">
          <h4>Security Settings</h4>
          <p>Manage security configurations</p>
        </div>
      </div>

      <div className="dash-card">
        <h3 className="dash-list-header">Admin Information</h3>
        <div className="info-row">
          <div className="info-label">Name:</div>
          <div className="info-value">{user.name}</div>
        </div>
      </div>

      <div className="dash-alert alert-admin">
        <strong>Admin Access Level:</strong> You have complete access to the system.
      </div>

      <div className="dash-actions" style={{marginTop: '2rem'}}>
        <Link to="/" className="btn-primary">View User Dashboard</Link>
        <Link to="/manager" className="btn-purple">View Manager Dashboard</Link>
      </div>

    </div>
  );
};

export default AdminDashboard;
