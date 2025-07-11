// frontend/src/components/Navbar.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Corrected: Removed '=>'
import './Navbar.css';
import { useAuth } from '../Context/AuthContext'; // Import the useAuth hook (Note the capital 'C' in Context)

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  // Get user and logout function from AuthContext
  const { user, logout } = useAuth(); 

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext to clear in-memory state AND sessionStorage
    navigate('/login'); // Redirect to the login page after logging out
  };

  return (
    <div className="navbar">
      <Link to="/" className="navbar-logo">NeuraNest</Link>
      <div className="nav-links">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
        <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
        <Link to="/services" className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}>Services</Link>
        <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>

        {/* Conditional rendering based on 'user' from AuthContext */}
        {user ? (
          <div className="user-info">
            {/* Display user name from context, fallback to email or 'User' */}
            <span className="nav-link user-name">Welcome, {user.name || user.email || 'User'}</span>
            <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
          </div>
        ) : (
          <Link to="/login" className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}>Login</Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
