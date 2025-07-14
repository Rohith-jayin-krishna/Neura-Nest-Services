import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Pages.css';
import ServiceBooking from '../components/ServiceBooking';

import basicImg from '../assets/Basic_Package.png';
import plusImg from '../assets/Plus_Package.png';
import fullImg from '../assets/Full_Package.png';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const Services = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState('');

  const handleHistoryClick = () => {
    navigate('/service-history');
  };

  const handlePackageClick = (packageName) => {
    setSelectedService(packageName);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
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
          <div
            className={`package-card ${selectedService === 'Basic Package' ? 'selected-package' : ''}`}
            onClick={() => handlePackageClick('Basic Package')}
          >
            <img src={basicImg} alt="Basic Package" className="package-img" />
            <h3>Basic Package</h3>
            <p>Smart lighting, wall switches</p>
          </div>

          <div
            className={`package-card ${selectedService === 'Plus Package' ? 'selected-package' : ''}`}
            onClick={() => handlePackageClick('Plus Package')}
          >
            <img src={plusImg} alt="Plus Package" className="package-img" />
            <h3>Plus Package</h3>
            <p>Includes lighting, smart locks, cameras, voice assistant.</p>
          </div>

          <div
            className={`package-card ${selectedService === 'Full Automation' ? 'selected-package' : ''}`}
            onClick={() => handlePackageClick('Full Automation')}
          >
            <img src={fullImg} alt="Full Automation" className="package-img" />
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
        {/* 🔄 Pass both selectedService and setSelectedService */}
        <ServiceBooking
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />

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