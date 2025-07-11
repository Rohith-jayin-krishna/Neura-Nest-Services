import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Pages.css';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const Home = () => {
  return (
    <div className="page-container home-container">
      {/* Hero Section */}
      <motion.div
        className="hero-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <h1>
          Welcome to <span className="highlight-yellow">NeuraNest</span>
        </h1>
        <p className="hero-subtitle">
          Where <span className="highlight-orange">Elegance Meets Intelligence</span>
        </p>
        <p className="hero-description">
          Transform your living space with state-of-the-art smart home integrations, combined with
          exquisite interior design. Affordable, intuitive, and tailor-made for your lifestyle.
        </p>
        
        {/* Updated Button with Link */}
        <Link to="/services" className="btn-primary">Explore Our Services</Link>
      </motion.div>

      {/* Image Section */}
      <section className="image-section">
        <div className="image-container">
          <motion.img
            src={require('../assets/smarthomeimage.png')}
            alt="Smart Home Interior"
            className="smart-home-image"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </section>

      {/* Features Section */}
      <motion.section
        className="features-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <h2>Why Choose NeuraNest?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Smart Integration</h3>
            <p>Seamlessly connect lighting, security, climate, and entertainment systems.</p>
          </div>
          <div className="feature-card">
            <h3>Elegant Interiors</h3>
            <p>Modern designs that enhance comfort and style in every room.</p>
          </div>
          <div className="feature-card">
            <h3>Affordable Solutions</h3>
            <p>High-quality smart home systems tailored to fit your budget.</p>
          </div>
          <div className="feature-card">
            <h3>24/7 Support</h3>
            <p>Reliable customer service ensuring your home runs smoothly at all times.</p>
          </div>
        </div>
      </motion.section>

      {/* Testimonial Section */}
      <motion.section
        className="testimonial-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <h2>What Our Clients Say</h2>
        <blockquote>
          “NeuraNest transformed my home into a smart, stylish haven — the perfect blend of
          technology and design!” <br />
          <strong>- Sarah M.</strong>
        </blockquote>
      </motion.section>
    </div>
  );
};

export default Home;