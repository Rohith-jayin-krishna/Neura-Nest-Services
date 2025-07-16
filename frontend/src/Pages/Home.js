// src/Pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Pages.css';
import '../App.css'; // Loader styles

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const imageFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2 } },
  exit: { opacity: 0, transition: { duration: 1.2 } },
};

const images = [
  require('../assets/smarthomeimage1.png'),
  require('../assets/smarthomeimage3.png'),
  require('../assets/smarthomeimage4.png'),
];

const Home = () => {
  const [index, setIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all images once
  useEffect(() => {
    const promises = images.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
      });
    });

    Promise.all(promises).then(() => setImagesLoaded(true));
  }, []);

  // Rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!imagesLoaded) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

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
          exquisite interior design.
        </p>
        <Link to="/services" className="btn-primary">Explore Our Services</Link>
      </motion.div>

      {/* Image Carousel */}
      <section className="image-section">
        <div className="image-container">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={images[index]}
              alt="Smart Home"
              className="smart-home-image fade-carousel"
              variants={imageFade}
              initial="hidden"
              animate="visible"
              exit="exit"
            />
          </AnimatePresence>
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
          <div className="feature-card"><h3>Smart Integration</h3><p>Seamlessly connect lighting, security, and more.</p></div>
          <div className="feature-card"><h3>Elegant Interiors</h3><p>Modern designs that elevate your space.</p></div>
          <div className="feature-card"><h3>Affordable Solutions</h3><p>Smart tech for every budget.</p></div>
          <div className="feature-card"><h3>24/7 Support</h3><p>Always here when you need us.</p></div>
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
          “NeuraNest transformed my home into a smart, stylish haven.”<br />
          <strong>- Sarah M.</strong>
        </blockquote>
      </motion.section>
    </div>
  );
};

export default Home;