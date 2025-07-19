import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';
import { useAuth } from '../Context/AuthContext';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    document.body.classList.remove('menu-open');
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      const newState = !prev;
      document.body.classList.toggle('menu-open', newState);
      return newState;
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove('menu-open');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
        document.body.classList.remove('menu-open');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, []);

  return (
    <motion.div
      className="navbar"
      ref={navRef}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        NeuraNest
      </Link>

      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      <motion.div
        className={`nav-links ${menuOpen ? 'open' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {['/', '/about', '/services', '/contact'].map((path) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={path}
          >
            <Link
              to={path}
              className={`nav-link ${location.pathname === path ? 'active' : ''}`}
              onClick={closeMenu}
            >
              {path === '/' ? 'Home' : path.replace('/', '').charAt(0).toUpperCase() + path.slice(2)}
            </Link>
          </motion.div>
        ))}

        {user ? (
          <div className="user-info">
            <motion.span
              className="nav-link user-name"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              style={{ color: 'limegreen', fontWeight: 'bold' }}
            >
              Welcome, {user.name || user.email || 'User'}
            </motion.span>

            <motion.button
              onClick={handleLogout}
              className="logout-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          </div>
        ) : (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/login"
              className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Login
            </Link>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Navbar;