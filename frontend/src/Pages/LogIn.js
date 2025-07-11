// frontend/src/Pages/LogIn.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LogIn.css';
import { useAuth } from '../Context/AuthContext'; // Import useAuth hook

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const fetchUsernameByEmail = async (email) => {
    try {
      console.log('🔍 Fetching username for:', email);
      const response = await fetch(`http://127.0.0.1:8000/api/get-username/?email=${encodeURIComponent(email)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Email not found');
      }

      console.log('✅ Username received:', data.username);
      return data.username;
    } catch (err) {
      console.error('❌ Failed to fetch username:', err.message);
      throw err;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const username = await fetchUsernameByEmail(email);

      const loginPayload = {
        username,
        password,
      };

      console.log('🚀 Sending login request with:', loginPayload);

      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginPayload),
      });

      const data = await response.json();
      console.log('📦 Login response data:', data);

      if (response.ok) {
        login(
          { access: data.access, refresh: data.refresh },
          { email, name: username }
        );
        console.log('✅ Login successful! Navigating to home...');
        navigate('/');
      } else {
        setError(data.detail || 'Invalid credentials');
        console.error('❌ Login failed:', data.detail || data);
      }
    } catch (err) {
      console.error('❌ Unexpected error during login:', err.message);
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please enter your credentials to log in</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="example@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">Login</button>
        </form>

        <div className="login-footer">
          <p>Don’t have an account? <Link to="/signup" className="signup-link">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;