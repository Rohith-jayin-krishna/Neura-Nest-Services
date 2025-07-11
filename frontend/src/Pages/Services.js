import React from 'react';
import { useNavigate } from 'react-router-dom'; // <-- for navigation
import { motion } from 'framer-motion';
import './Pages.css';
import ServiceBooking from '../components/ServiceBooking';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const Services = () => {
  const navigate = useNavigate(); // <-- Hook to navigate on click

  const handleHistoryClick = () => {
    navigate('/service-history'); // <-- Target route for history
  };

  return (
    <div className="page-container services-container">
      <motion.h1
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="page-title"
      >
        Our Smart Home Packages
      </motion.h1>

      <motion.section
        className="packages-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <div className="packages-container">
          <div className="package-card">
            <h3>Basic Package</h3>
            <p>Smart lighting, wall switches</p>
          </div>
          <div className="package-card">
            <h3>Plus Package</h3>
            <p>Includes lighting, smart locks, cameras, voice assistant.</p>
          </div>
          <div className="package-card">
            <h3>Full Automation</h3>
            <p>Lighting, security, AC, curtains, energy monitoring.</p>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="book-service-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <ServiceBooking />

        {/* --- New History Button --- */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={handleHistoryClick} className="history-button">
            View Your Service History
          </button>
        </div>
      </motion.section>
    </div>
  );
};

export default Services;