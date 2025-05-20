import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import admins from '../data/admins.json';
import staff from '../data/staff.json';
import { setSession } from '../auth';

const Login = () => {
    const [activeTab, setActiveTab] = useState('admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = (userData, isAdmin) => {
      console.log("Handle Login Function");
      setSession(userData, isAdmin); // Save to localStorage
      navigate(isAdmin ? '/dashboard' : '/staff-dashboard'); // Redirect based on role
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setError('');
      console.log("Submitted by: ",activeTab);
      if (activeTab === 'admin') {
        const admin = admins.find(a => a.email === email && a.password === password);
        console.log(admin);
        if (admin) {
          handleLogin(admin, true);
        } else {
          setError('Invalid admin credentials');
        }
      } else {
        console.log('Staff');
        const staffMember = staff.find(s => 
          s.email === email && s.password === password && !s.isBlocked
        );
        console.log(staffMember);
        if (staffMember) {
          handleLogin(staffMember, false);
        } else {
          const isBlocked = staff.find(s => s.email === email && s.isBlocked);
          setError(isBlocked ? 'Account blocked. Contact admin.' : 'Invalid credentials');
        }
      }
    };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <button
            className={`login-tab ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveTab('admin')}
          >
            Admin Login
          </button>
          <button
            className={`login-tab ${activeTab === 'staff' ? 'active' : ''}`}
            onClick={() => setActiveTab('staff')}
          >
            Staff Login
          </button>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;