import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('❌ Passwords do not match.');
      setSuccessMessage('');
      return;
    }

    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.log('Server Error:', data);

        const emailConflict = data.message === 'Email already registered.';

        setError(
          emailConflict
            ? '⚠️ This email is already registered. Please log in or use a different email.'
            : data.message ||
              data.email?.[0] ||
              data.username?.[0] ||
              data.password?.[0] ||
              'Signup failed'
        );
      } else {
        setSuccessMessage('✅ Signup successful! You can now log in.');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      console.error('Network error:', err);
      setError('⚠️ Network error. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Create Your Account</h2>
        <p className="login-subtitle">Fill in the details below to get started</p>

        <form onSubmit={handleSignup} className="login-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p style={{ color: '#ff4444', marginTop: '0.5rem' }}>{error}</p>}
          {successMessage && <p style={{ color: '#00c851', marginTop: '0.5rem' }}>{successMessage}</p>}

          <button type="submit" className="login-button">Sign Up</button>
        </form>

        <div className="login-footer">
          <p>Already have an account? <a href="/login" className="signup-link">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;